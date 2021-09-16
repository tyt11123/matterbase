const express = require("express");
const sender = require("../mailConfig");

class RegRouter {
  constructor(regService) {
    this.regService = regService;
  }
  router() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.post("/subscription", this.post_subscription.bind(this));
    router.put("/verify/registration/", this.put_verify_registration.bind(this));
    router.put("/verify/subscription/", this.put_verify_subscription.bind(this));
    router.get("/firstAdmin", this.get_first_admin.bind(this));
    // console.log("In the reg router");
    return router;
  }

  async post(req, res) {
    // console.log("reached reg backend");
    try {
      let { isMember, isEmailVerified } = await this.regService.isMember(req.body);
      if (isMember && !isEmailVerified) {
        let newUserMailSetting = await this.regService.getNewUserMailSetting(req.body);
        let mailResult = await sender.send(newUserMailSetting);
        let { accepted } = mailResult;
        return res.status(202).json({ message: `verification resent to ${accepted[0]}` });
      };
      if (isMember) { return res.status(406).json({ message: "already a member" }) };
      let { isSubscribe, ...registrationAttributes } = req.body;
      let regResult = await this.regService.create(registrationAttributes);
      let newUserMailSetting = await this.regService.getNewUserMailSetting(req.body);
      await sender.send(newUserMailSetting);
      if (isSubscribe) {
        let newSubscriptionMailSetting = await this.regService.getNewSubscriptionMailSetting(req.body);
        await sender.send(newSubscriptionMailSetting);
      };
      return res.status(200).json({ message: "proceeded", ...regResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async post_subscription(req, res) {
    // console.log("reached reg backend");
    try {
      let newSubscriptionMailSetting = await this.regService.getNewSubscriptionMailSetting(req.body);
      let mailResult = await sender.send(newSubscriptionMailSetting);
      let { accepted } = mailResult;
      return res.status(202).json({ message: `verification sent to ${accepted[0]}` });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
  
  async put_verify_registration(req, res) {
    // console.log("reached reg backend");
    try {
      let { token } = req.body;
      let verifyResult = await this.regService.confirmRegistration(token);
      return res.status(200).json({ message: "proceeded", ...verifyResult });
    } catch (err) {
      return res.status(406).json({ message: err.toString() });
    }
  }

  async put_verify_subscription(req, res) {
    // console.log("reached reg backend");
    try {
      let { token } = req.body;
      let verifyResult = await this.regService.confirmSubscription(token);
      return res.status(200).json({ message: "proceeded", ...verifyResult });
    } catch (err) {
      return res.status(406).json({ message: err.toString() });
    }
  }

  async get_first_admin(req, res) {
    // console.log("reached reg backend");
    try {
      let createResult = await this.regService.firstAdmin();
      return res.status(200).json({ message: "proceeded", ...createResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = RegRouter;
