const express = require("express");
const {
  isAuth, isAdmin,
} = require("../utils");

class SupplierRouter {
  constructor(supplierService) {
    this.supplierService = supplierService;
  }
  router() {
    let router = express.Router();
    router.get("/", this.get_all.bind(this));
    router.get("/dropdown", this.get_dropdown.bind(this));
    router.get("/:id", this.get_id.bind(this));
    router.get("/email/:email", this.get_email.bind(this));
    router.post("/", isAuth, isAdmin, this.post.bind(this));
    router.put("/", isAuth, isAdmin, this.put.bind(this));
    router.delete("/:id", isAuth, isAdmin, this.delete_id.bind(this));
    // console.log("In the supplier router");
    return router;
  }
  
  async get_all(req, res) {
    // console.log("reached supplier backend");
    try {
      let getResult = await this.supplierService.fetchAll();
      return res.status(200).json({ message: "proceeded", list: [...getResult] });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "No record" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_dropdown(req, res) {
    // console.log("reached supplier backend");
    try {
      let getResult = await this.supplierService.fetchDropDownList();
      return res.status(200).json({ message: "proceeded", list: [...getResult] });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "No record" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_id(req, res) {
    // console.log("reached supplier backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(406).json({ message: "ID missing" }) };
    try {
      let supplier = await this.supplierService.fetchByID(id);
      return res.status(200).json({ message: "proceeded", supplier });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "ID not found" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_email(req, res) {
    // console.log("reached supplier backend");
    let { email } = req.params;
    if (Boolean(email) === false) { return res.status(406).json({ message: "email missing" }) };
    try {
      let supplier = await this.supplierService.fetchByEmail(email);
      return res.status(200).json({ message: "proceeded", supplier });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "Email not found" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async post(req, res) {
    // console.log("reached supplier backend");
    try {
      let regResult = await this.supplierService.create(req.body);
      return res.status(200).json({ message: "proceeded", ...regResult });
    } catch (err) {
      if (err instanceof TypeError) {
        return res.status(406).json({ message: "email occupied" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async put(req, res) {
    // console.log("reached supplier backend");
    try {
      let putResult = await this.supplierService.update(req.body);
      return res.status(200).json({ message: "proceeded", ...putResult });
    } catch (err) {
      if (err instanceof TypeError) {
        return res.status(406).json({ message: "email occupied" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async delete_id(req, res) {
    // console.log("reached supplier backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(406).json({ message: "id missing" }) };
    try {
      let deleteCount = await this.supplierService.deleteByID(id);
      return res.status(200).json({ message: "proceeded", deleteCount });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = SupplierRouter;
