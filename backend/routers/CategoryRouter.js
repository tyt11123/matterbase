const express = require("express");
const {
  isAuth, isAdmin,
} = require("../utils");

class CategoryRouter {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }
  router() {
    let router = express.Router();
    router.get("/", this.get_all.bind(this));
    router.get("/:id", this.get_id.bind(this));
    router.post("/", isAuth, isAdmin, this.post.bind(this));
    router.put("/", isAuth, isAdmin, this.put.bind(this));
    router.delete("/:id", isAuth, isAdmin, this.delete_id.bind(this));
    // console.log("In the category router");
    return router;
  }
  
  async get_all(req, res) {
    // console.log("reached category backend");
    try {
      let getResult = await this.categoryService.fetchAll();
      return res.status(200).json({ message: "proceeded", list: [...getResult] });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "No record" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async get_id(req, res) {
    // console.log("reached category backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(406).json({ message: "ID missing" }) };
    try {
      let list = await this.categoryService.fetchByID(id);
      return res.status(200).json({ message: "proceeded", list });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "ID not found" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async post(req, res) {
    // console.log("reached category backend");
    try {
      let regResult = await this.categoryService.create(req.body);
      return res.status(200).json({ message: "proceeded", ...regResult });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }

  async put(req, res) {
    // console.log("reached category backend");
    try {
      let putResult = await this.categoryService.update(req.body);
      return res.status(200).json({ message: "proceeded", ...putResult });
    } catch (err) {
      if (err instanceof TypeError) {
        return res.status(403).json({ message: "forbidden" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }

  async delete_id(req, res) {
    // console.log("reached category backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(409).json({ message: "id missing" }) };
    try {
      let deleteCount = await this.categoryService.deleteByID(id);
      return res.status(200).json({ message: "proceeded", deleteCount });
    } catch (err) {
      if (err instanceof EvalError) {
        return res.status(406).json({ message: "dependency exists" });
      }
      if (err instanceof TypeError) {
        return res.status(403).json({ message: "forbidden" });
      }
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = CategoryRouter;
