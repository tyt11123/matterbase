const express = require("express");

class CountryRouter {
  constructor(countryService) {
    this.countryService = countryService;
  }
  router() {
    let router = express.Router();
    router.get("/", this.get_all.bind(this));
    // console.log("In the company type router");
    return router;
  }

  async get_all(req, res) {
    // console.log("reached company type backend");
    try {
      let getResult = await this.countryService.fetchAll();
      return res.status(200).json({ message: "proceeded", list: [...getResult] });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = CountryRouter;
