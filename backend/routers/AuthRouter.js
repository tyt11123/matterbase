const express = require("express");
const sender = require("../mailConfig");
const jwt = require("jsonwebtoken");
const requestIp = require('request-ip');
const passport = require('passport');

class AuthRouter {
  constructor(authService) {
    this.authService = authService;
  }
  router() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.get("/preflight", this.get_preflight.bind(this));
    router.get("/tokenUserInfo", this.get_token_user_info.bind(this));
    router.get("/clearCookies", this.get_clear_cookies.bind(this));
    router.get("/federated/google", passport.authenticate("google"));
    router.get("/oauth2/redirect/google",
      passport.authenticate("google", { assignProperty: "federatedUser", failureRedirect: `${process.env.BASE_URL}/login` }),
      this.get_oauth2.bind(this)
    );
    router.get("/federated/facebook", passport.authenticate("facebook", { scope : ['email'] }));
    router.get("/oauth2/redirect/facebook",
      passport.authenticate("facebook", { assignProperty: "federatedUser", failureRedirect: `${process.env.BASE_URL}/login` }),
      this.get_oauth2.bind(this)
    );
    // console.log("In the auth router");
    return router;
  }

  async post(req, res) {
    // console.log("reached auth backend");
    const { isStaySignin } = req.body;
    let cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: false,
      domain: process.env.DOMAIN,
    };
    if (isStaySignin) {
      cookieSetting.maxAge = 2592000000; // 30 days
      res.cookie("isStaySignin", "1", cookieSetting);
    }
    try {
      try {
        let { token } = await this.authService.adminVerify(req.body);
        res.cookie("token", token, cookieSetting);
        return res.status(200).json({ message: "proceeded" });
      } catch (err) {
        if (err instanceof EvalError) {
          return res.status(401).json({ message: "incorrect password" });
        }
        if (err instanceof SyntaxError) {
          let { isMember } = await this.authService.isCommonMember(req.body);
          if (isMember === false) {
            return res.status(406).json({ message: "admin account disabled" });
          }
        }
        let { token } = await this.authService.designerVerify(req.body);
        res.cookie("token", token, cookieSetting);
        return res.status(200).json({ message: "proceeded" });
      }
    } catch (err) {
      if (err instanceof TypeError) {
        let newUserMailSetting = await this.authService.getNewUserMailSetting(
          req.body
        );
        let mailResult = await sender.send(newUserMailSetting);
        let { accepted } = mailResult;
        return res
          .status(202)
          .json({ message: `verification resent to ${accepted[0]}` });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_preflight(req, res) {
    const ip = requestIp.getClientIp(req);
    const preflightObject = { csrfToken: req.csrfToken(), ip };
    const {
      token,
      isFederatedLoginFail
    } = req.cookies;
    if (Boolean(isFederatedLoginFail) === true) {
      preflightObject.isFederatedLoginFail = true;
    }
    if (Boolean(token) === false) {
      return res.status(200).json(preflightObject);
    }
    try {
      let { email, provider, provider_id } = jwt.verify(token, process.env.JWTSECRET);
      if (Boolean(provider && provider_id) === true) {
        try {
          let payload = await this.authService.matchFederatedDesigner({ provider, provider_id });
          return res.status(200).json({ ...payload, ...preflightObject });
        } catch (err) {
          return res.status(200).json(preflightObject);
        }
      }
      try {
        let payload = await this.authService.matchAdminByEmail(email);
        return res.status(200).json({ ...payload, ...preflightObject });
      } catch (err) {
        let payload = await this.authService.matchDesignerByEmail(email);
        if (payload.isEmailVerified) {
          return res.status(200).json({ ...payload, ...preflightObject });
        } else {
          return res.status(200).json(preflightObject);
        }
      }
    } catch (err) {
      const { data, status } = err;
      return res.status(200).json(preflightObject);
    }
  }

  async get_token_user_info(req, res) {
    const { token } = req.cookies;
    if (Boolean(token) === false) {
      return res.status(200).json({});
    }
    try {
      let { email } = jwt.verify(token, process.env.JWTSECRET);
      try {
        let payload = await this.authService.matchAdminByEmail(email);
        return res.status(200).json(payload);
      } catch (err) {
        let payload = await this.authService.matchDesignerByEmail(email);
        if (payload.isEmailVerified) {
          return res.status(200).json(payload);
        } else {
          return res.status(200).json({});
        }
      }
    } catch (err) {
      const { data, status } = err;
      console.log({ err });
      return res.status(200).json({});
    }
  }

  async get_clear_cookies(req, res) {
    const { token, isStaySignin } = req.cookies;
    if (Boolean(token) === false) {
      next();
    }
    let cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: false,
      domain: process.env.DOMAIN,
    };
    res.clearCookie("token", cookieSetting);
    if (Boolean(isStaySignin) === true) {
      res.clearCookie("isStaySignin", cookieSetting);
    }
    res.status(200).json({ message: "proceeded" });
  }

  async get_oauth2(req, res) {
    // console.log("reached auth backend");
    let cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: false,
      domain: process.env.DOMAIN,
    };
    const isGoogle = Boolean(req.path.indexOf('google') > -1);
    const provider = isGoogle ? "Google" : "Facebook";
    const provider_id = req.federatedUser.id;
    const firstName = req.federatedUser.name ? req.federatedUser.name.givenName : "";
    const lastName = req.federatedUser.name ? req.federatedUser.name.familyName : "";
    const email = req.federatedUser.emails && req.federatedUser.emails[0] ?
      req.federatedUser.emails[0].value :
      "";
    const telephone = "";
    const companyType = "";
    const jobTitle = "";
    const companyLocation = "";
    const companyWebsite = "";
    const isInfoSupplemented = false;
    const designerObject = {
      provider, provider_id, firstName, lastName, email, telephone,
      companyType, jobTitle, companyLocation, companyWebsite, isInfoSupplemented,
    };
    try {
      const { token } = await this.authService.federatedDesignerVerify(designerObject);
      cookieSetting.maxAge = 2592000000; // 30 days
      res.cookie("token", token, cookieSetting);
      res.cookie("isStaySignin", "1", cookieSetting);
    } catch (err) {
      cookieSetting.maxAge = 60000; // 1 minute
      res.cookie("isFederatedLoginFail", "1", cookieSetting);
    };
    return res.status(302).redirect(process.env.BASE_URL);
  }
}

module.exports = AuthRouter;
