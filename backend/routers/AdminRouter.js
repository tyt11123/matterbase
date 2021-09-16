const express = require("express");
const sender = require("../mailConfig");
const jwt = require("jsonwebtoken");
const {
  isAuth, isAdmin, isSuperAdmin,
  isRecovery, isFederated,
} = require("../utils");

class AdminRouter {
  constructor(authService) {
    this.adminService = authService;
  }

  static processedRecoveryToken = [];

  router() {
    let router = express.Router();
    router.put("/", isAuth, this.put.bind(this));
    router.post("/admin", isAuth, isAdmin, isSuperAdmin, this.post_admin.bind(this));
    router.put("/admin", isAuth, isAdmin, this.put_admin.bind(this));
    router.get("/adminList", isAuth, isAdmin, isSuperAdmin, this.get_admin_list.bind(this));
    router.put("/admin/override", isAuth, isAdmin, isSuperAdmin, this.put_admin_override.bind(this));
    router.post("/recovery", this.post_recovery.bind(this));
    router.post("/verify/recovery", this.post_verify_recovery.bind(this));
    router.put("/confirmRecovery", isRecovery, this.put_reset_password.bind(this));
    router.put("/federated", isAuth, isFederated, this.put_federated.bind(this));
    // console.log("In the admin router");
    return router;
  }

  async put(req, res) {
    // console.log("reached admin backend");
    const { user, isStaySignin } = req;
    const { role, ...proposedInfo } = req.body;
    if (user.id !== proposedInfo.id) {
      return res.status(412).json({ message: "data store tampered" });
    };
    let cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: false,
      domain: process.env.DOMAIN,
    };
    if (isStaySignin) {
      cookieSetting.maxAge = 2592000000;   // 30 days
    };
    try {
      let { token, ...payload } = await this.adminService.update(proposedInfo);
      const { email: currentEmail } = user;
      const { email: newEmail } = proposedInfo;
      if ((currentEmail.startsWith(newEmail) && currentEmail.endsWith(newEmail)) === false) {
        let newUserMailSetting = await this.adminService.getNewUserMailSetting(payload);
        await sender.send(newUserMailSetting);
        res.clearCookie('token', cookieSetting);
        res.clearCookie('isStaySignin', cookieSetting);
        return res.status(205).json({ message: "logout required" });
      } else {
        if (isStaySignin) {
          res.cookie('isStaySignin', '1', cookieSetting);
        };
        res.cookie('token', token, cookieSetting);
        return res.status(200).json(payload);
      }
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "incorrect password" });
      };
      if (err instanceof TypeError) {
        return res.status(409).json({ message: "email occupied" });
      };
      return res.status(401).json({ message: err.toString() });
    };
  }

  async put_admin(req, res) {
    // console.log("reached admin backend");
    const { user, isStaySignin } = req;
    const { role, ...proposedInfo } = req.body;
    if (user.id !== proposedInfo.id) {
      return res.status(412).json({ message: "data store tampered" });
    };
    let cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: false,
      domain: process.env.DOMAIN,
    };
    if (isStaySignin) {
      cookieSetting.maxAge = 2592000000;   // 30 days
    };
    try {
      let { token, ...payload } = await this.adminService.updateAdminByID(proposedInfo);
      if (isStaySignin) {
        res.cookie('isStaySignin', '1', cookieSetting);
      };
      res.cookie('token', token, cookieSetting);
      return res.status(200).json(payload);
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "incorrect password" });
      };
      return res.status(401).json({ message: err.toString() });
    };
  }

  async post_admin(req, res) {
    // console.log("reached admin backend");
    try {
      let regResult = await this.adminService.createAdmin(req.body);
      return res.status(200).json({ message: "proceeded", ...regResult });
    } catch (err) {
      if (err.toString().indexOf('email') > -1) {
        return res.status(406).json({ message: "email already occupied" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }
  
  async get_admin_list(req, res) {
    // console.log("reached admin backend");
    try {
      let getResult = await this.adminService.getAdminList(req.user.id);
      return res.status(200).json({ message: "proceeded", list: [...getResult] });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async put_admin_override(req, res) {
    // console.log("reached admin backend");
    try {
      let putResult = await this.adminService.manageAdminByID(req.body);
      return res.status(200).json({ message: "proceeded", ...putResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async post_recovery(req, res) {
    // console.log("reached reg backend");
    try {
      let newRecoveryMailSetting = await this.adminService.getNewRecoveryMailSetting(req.body);
      let mailResult = await sender.send(newRecoveryMailSetting);
      let { accepted } = mailResult;
      return res.status(202).json({ message: `verification sent to ${accepted[0]}` });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "not a member" });
      };
      return res.status(401).json({ message: err.toString() });
    }
  }

  async post_verify_recovery(req, res) {
    // console.log("reached reg backend");
    try {
      let { token } = req.body;
      let credentials = jwt.verify(token, process.env.JWTSECRET);
      if (!(
        credentials.hasOwnProperty("id") &&
        credentials.hasOwnProperty("email") &&
        credentials.hasOwnProperty("role") &&
        credentials.hasOwnProperty("resetPassword")
      )) {
        return res.status(401).json({ message: "attribute missing" });
      }
      if (AdminRouter.processedRecoveryToken.indexOf(token) > -1) {
        return res.status(406).json({ message: "token processed" });
      }
      let cookieSetting = {
        httpOnly: true,
        secure: true,
        sameSite: false,
        domain: process.env.DOMAIN,
      };
      res.cookie("recovery", token, cookieSetting);
      return res.status(200).json({ message: "proceeded" });
    } catch (err) {
      if (String(err.message).endsWith("expired")) {
        return res.status(406).json({ message: "jwt expired" });
      };
      return res.status(401).json({ message: err.toString() });
    }
  }

  async put_reset_password(req, res) {
    // console.log("reached admin backend");
    const { id, email, role } = req.user;
    const { password } = req.body;
    const resetObject = { id, email, role, password };
    try {
      let { token } = await this.adminService.confirmRecovery(resetObject);
      let cookieSetting = {
        httpOnly: true,
        secure: true,
        sameSite: false,
        domain: process.env.DOMAIN,
      };
      AdminRouter.processedRecoveryToken.push(req.cookies.recovery);
      res.clearCookie("recovery", cookieSetting);
      res.cookie("token", token, cookieSetting);
      return res.status(200).json({ message: "proceeded" });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async put_federated(req, res) {
    // console.log("reached admin backend");
    const { user, isStaySignin } = req;
    const { role, ...proposedInfo } = req.body;
    if (user.id !== proposedInfo.id) {
      return res.status(412).json({ message: "data store tampered" });
    };
    let cookieSetting = {
      httpOnly: true,
      secure: true,
      sameSite: false,
      domain: process.env.DOMAIN,
    };
    if (isStaySignin) {
      cookieSetting.maxAge = 2592000000;   // 30 days
    };
    try {
      let { token, ...payload } = await this.adminService.updateFederatedDesignerByID(proposedInfo);
      res.clearCookie('token', cookieSetting);
      res.clearCookie('isStaySignin', cookieSetting);
      if (isStaySignin) {
        res.cookie('isStaySignin', '1', cookieSetting);
      };
      res.cookie('token', token, cookieSetting);
      return res.status(200).json(payload);
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    };
  }
}

module.exports = AdminRouter;
