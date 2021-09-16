const express = require("express");
const { isAuth, isAdmin } = require("../utils");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

class ImageRouter {
  constructor(imageService) {
    this.imageService = imageService;
  }
  router() {
    let router = express.Router();
    router.get("/auth", this.get_auth.bind(this));
    router.get("/:id", this.get_id.bind(this));
    router.post("/", isAuth, isAdmin, this.post.bind(this));
    // console.log("In the image router");
    return router;
  }

  async get_auth(req, res) {
    // console.log("reached image backend");
    var result = imagekit.getAuthenticationParameters();
    return res.status(200).send(result);
  }

  async get_id(req, res) {
    // console.log("reached image backend");
    let { id } = req.params;
    if (Boolean(id) === false) { return res.status(406).json({ message: "id missing" }) };
    try {
      let image = await this.imageService.fetchByID(id);
      return res
        .status(200)
        .json({ message: "proceeded", image });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
    
  async post(req, res) {
    // console.log("reached image backend");
    try {
      let image = await this.imageService.create(req.body);
      return res.status(200).json({ message: "proceeded", image });
    } catch (err) {
      return res.status(401).json({ message: err.toString() });
    }
  }
}

module.exports = ImageRouter;
