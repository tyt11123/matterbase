class ImageService {
  constructor(knex) {
    this.knex = knex;
  }

  async create(values) {
    if (
      !(
        values.hasOwnProperty("thumbnailUrl") &&
        values.hasOwnProperty("url") &&
        values.hasOwnProperty("width") &&
        values.hasOwnProperty("height")
      )
    ) {
      throw new Error("attribute missing");
    }
    const { thumbnailUrl, url, width, height } = values;
    const attributes = { thumbnailUrl, url, width, height };
    try {
      let image = await this.knex("image").insert(attributes, ["id"]); // [{ id: 1 }]
      if (!image[0]) {
        throw new Error("database failure");
      }
      let result = await this.knex("image").where(image[0]);
      return result[0]; // { id: 1, url: "..", ... }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchByID(id) {
    if (!id) {
      throw new Error("ID missing");
    };
    let image = await this.knex("image").where({ id });
    if (!image[0]) {
      throw new Error("No record");
    }
    return image[0]; // { id: 1, url: "..", ... }
  }
}

module.exports = ImageService;
