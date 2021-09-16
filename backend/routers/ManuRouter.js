const express = require("express");
const sender = require("../mailConfig");
const { isAuth, isAdmin, } = require("../utils");

class ManuRouter {
  constructor(manuService) {
    this.manuService = manuService;
  }
  router() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.delete("/:id", this.delete_id.bind(this));
    router.get("/", isAuth, isAdmin, this.get_all.bind(this));
    router.get("/:email", isAuth, isAdmin, this.get_email.bind(this));
    // console.log("In the reg router");
    return router;
  }

  async post(req, res) {
    // console.log("reached reg backend");
    try {
      let regResult = await this.manuService.create(req.body);
      let newMailSetting = await this.manuService.getMailSetting(req.body);
      await sender.send(newMailSetting);
      return res.status(200).json({ message: "proceeded", ...regResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
  
  async delete_id(req, res) {
    // console.log("reached reg backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(406).json({ message: "id missing" }) };
    try {
      let deleteCount = await this.manuService.deleteByID(id);
      return res.status(200).json({ message: "proceeded", deleteCount });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_all(req, res) {
    // console.log("reached reg backend");
    try {
      let payload = await this.manuService.fetchAll();
      return res.status(200).json({ message: "proceeded", payload });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_email(req, res) {
    // console.log("reached reg backend");
    let { email } = req.params;
    if (Boolean(email) === false) { return res.status(406).json({ message: "email missing" }) };
    try {
      let payload = await this.manuService.matchByEmail(email);
      return res.status(200).json({ message: "proceeded", payload });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = ManuRouter;
