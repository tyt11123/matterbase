class BrandService {
  constructor(knex) {
    this.knex = knex;
  }

  async create(values) {
    if (
      !(
        values.hasOwnProperty("name") &&
        values.hasOwnProperty("country_id") &&
        values.hasOwnProperty("website") &&
        values.hasOwnProperty("logoURL") &&
        values.hasOwnProperty("supplier_id") &&
        values.hasOwnProperty("leftIntro") &&
        values.hasOwnProperty("rightIntro") &&
        values.hasOwnProperty("image_ids") &&
        values.hasOwnProperty("isSupplier") &&
        values.hasOwnProperty("isHKOffice")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      const {
        country_object, supplier_object, country, supplier,
        image_objects,
        ...attributes
      } = values;
      let brand = await this.knex("brand").insert(attributes, ["id"]);
      if (!brand[0]) {
        throw new Error("database failure");
      }
      return brand[0]; // { id: 1 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(values) {
    if (
      !(
        values.hasOwnProperty("id") &&
        values.hasOwnProperty("name") &&
        values.hasOwnProperty("country_id") &&
        values.hasOwnProperty("website") &&
        values.hasOwnProperty("logoURL") &&
        values.hasOwnProperty("supplier_id") &&
        values.hasOwnProperty("leftIntro") &&
        values.hasOwnProperty("rightIntro") &&
        values.hasOwnProperty("image_ids") &&
        values.hasOwnProperty("isSupplier") &&
        values.hasOwnProperty("isHKOffice")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      const {
        id, currentPassword, created_at, updated_at,
        country_object, supplier_object, country, supplier,
        image_objects,
        ...brandInfo
      } = values;
      let brand = await this.knex("brand")
        .where({ id })
        .update(brandInfo, ["id"]);
      if (!brand[0]) {
        throw new Error("database failure");
      }
      return brand[0]; // { id: 2 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchAll() {
    try {
      let imageArray = await this.knex("image");
      let imageObj = {};
      for (let i = 0; i < imageArray.length; i++) {
        imageObj[imageArray[i].id] = { ...imageArray[i] };
      }
      const manipulatedSupplier = this.knex("supplier")
        .select([
          "id",
          this.knex.raw("\"firstName\" || ' ' || \"lastName\" || ' (' || \"companyName\" || ')' as \"name\""),
        ])
        .as("supplier"); // manipulated for drop down menu
      let brand = await this.knex("brand")
        .join("country", "country.id", "brand.country_id")
        .join(manipulatedSupplier, "supplier.id", "brand.supplier_id")
        .select([
          "brand.*",
          this.knex.raw("to_json(country.*) as country_object"),
          this.knex.raw("to_json(supplier.*) as supplier_object"),
          "country.name as country",
          "supplier.name as supplier",
        ])
        .orderBy("brand.id", "desc");
      if (!brand[0]) {
        throw new EvalError("No record");
      }
      for (let i = 0; i < brand.length; i++) {
        brand[i].image_objects = brand[i].image_ids.map((x) => imageObj[x]);
      }
      return brand; // array of object(s)
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("No record");
      }
      throw new Error(err.message);
    }
  }

  async fetchByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    try {
      let brand = await this.knex("brand")
        .join("country", "country.id", "brand.country_id")
        .join("supplier", "supplier.id", "brand.supplier_id")
        .select([
          "brand.*",
          this.knex.raw("to_json(country.*) as country_object"),
          this.knex.raw("to_json(supplier.*) as supplier_object"),
          "country.name as country",
          this.knex.raw(  
            "supplier.\"firstName\" || ' ' || supplier.\"lastName\" || ' (' || supplier.\"companyName\" || ')' as supplier"
          ),
        ])
        .where({ "brand.id": id });
      if (!brand[0]) {
        throw new EvalError("ID not found");
      }
      let imageArray = await this.knex("image").whereIn(
        "id",
        brand[0].image_ids
      );
      let imageObj = {};
      for (let i = 0; i < imageArray.length; i++) {
        imageObj[imageArray[i].id] = { ...imageArray[i] };
      }
      brand[0].image_objects = brand[0].image_ids.map((x) => imageObj[x]);
      return brand[0]; // { id: 1, ... }
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("ID not found");
      }
      throw new Error(err.message);
    }
  }

  async deleteByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    let deleteCount = await this.knex("brand").where({ id }).del();
    if (!deleteCount) {
      throw new Error("ID not found");
    }
    return deleteCount;
  }
}

module.exports = BrandService;
