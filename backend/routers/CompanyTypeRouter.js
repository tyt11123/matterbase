const express = require("express");
const { isAuth, isAdmin, } = require("../utils");

class CompanyTypeRouter {
  constructor(companyTypeService) {
    this.companyTypeService = companyTypeService;
  }
  router() {
    let router = express.Router();
    router.post("/", isAuth, isAdmin, this.post.bind(this));
    router.put("/", isAuth, isAdmin, this.put.bind(this));
    router.delete("/:id", isAuth, isAdmin, this.delete_id.bind(this));
    router.get("/", this.get_all.bind(this));
    // console.log("In the company type router");
    return router;
  }

  async post(req, res) {
    // console.log("reached company type backend");
    try {
      let regResult = await this.companyTypeService.create(req.body);
      return res.status(200).json({ message: "proceeded", ...regResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async put(req, res) {
    // console.log("reached company type backend");
    try {
      let putResult = await this.companyTypeService.update(req.body);
      return res.status(200).json({ message: "proceeded", ...putResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
  
  async delete_id(req, res) {
    // console.log("reached company type backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(406).json({ message: "id missing" }) };
    try {
      let deleteCount = await this.companyTypeService.deleteByID(id);
      return res.status(200).json({ message: "proceeded", deleteCount });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_all(req, res) {
    // console.log("reached company type backend");
    try {
      let getResult = await this.companyTypeService.fetchAll();
      return res.status(200).json({ message: "proceeded", list: [...getResult] });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = CompanyTypeRouter;
