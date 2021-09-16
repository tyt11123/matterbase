class SupplierService {
  constructor(knex) {
    this.knex = knex;
  }
  
  async create(values) {
    if (
      !(
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("email") &&
        values.hasOwnProperty("telephone") &&
        values.hasOwnProperty("companyName") &&
        values.hasOwnProperty("company_type_id") &&
        values.hasOwnProperty("jobTitle") &&
        values.hasOwnProperty("country_id") &&
        values.hasOwnProperty("companyLocation") &&
        values.hasOwnProperty("companyWebsite") &&
        values.hasOwnProperty("supplierLogoURL") &&
        values.hasOwnProperty("isAgency") &&
        values.hasOwnProperty("isManufacturer")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      const {
        country_object, company_type_object, country, companyType,
        ...attributes
      } = values;
      attributes.isDisabled = false;
      let supplier = await this.knex("supplier").insert(attributes, ["id"]);
      if (!supplier[0]) {
        throw new Error("database failure");
      }
      return supplier[0]; // { id: 1 }
    } catch (err) {
      if (err.toString().includes("email")) {
        throw new TypeError("email already occupied");
      }
      throw new Error(err.message);
    }
  }

  async update(values) {
    if (
      !(
        values.hasOwnProperty("id") &&
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("email") &&
        values.hasOwnProperty("telephone") &&
        values.hasOwnProperty("companyName") &&
        values.hasOwnProperty("company_type_id") &&
        values.hasOwnProperty("jobTitle") &&
        values.hasOwnProperty("country_id") &&
        values.hasOwnProperty("companyLocation") &&
        values.hasOwnProperty("companyWebsite") &&
        values.hasOwnProperty("supplierLogoURL") &&
        values.hasOwnProperty("isAgency") &&
        values.hasOwnProperty("isManufacturer") &&
        values.hasOwnProperty("isDisabled")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      const {
        id, currentPassword, created_at, updated_at,
        country_object, company_type_object, country, companyType,
        ...supplierInfo
      } = values;
      let supplier = await this.knex("supplier").where({ id }).update(supplierInfo, ["id"]);
      if (!supplier[0]) {
        throw new Error("database failure");
      };
      return supplier[0]; // { id: 2 }
    } catch (err) {
      if (err.toString().includes("email")) {
        throw new TypeError("email already occupied");
      }
      throw new Error(err.message);
    };
  }

  async fetchAll() {
    try {
      let supplier = await this.knex("supplier")
        .join("country", "country.id", "supplier.country_id")
        .join("company_type", "company_type.id", "supplier.company_type_id")
        .select([
          "supplier.*",
          this.knex.raw("to_json(country.*) as country_object"),
          this.knex.raw("to_json(company_type.*) as company_type_object"),
          "country.name as country",
          "company_type.name as companyType",
        ])
        .orderBy("supplier.id", "desc");
      if (!supplier[0]) {
        throw new EvalError("No record");
      }
      return supplier; // array of object(s)
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("No record");
      }
      throw new Error(err.message);
    };
  }

  async fetchDropDownList() {
    try {
      let supplier = await this.knex("supplier")
        .select([
          "id",
          this.knex.raw("\"firstName\" || ' ' || \"lastName\" || ' (' || \"companyName\" || ')' as \"name\""),
        ])
        .orderBy("id", "desc");
      if (!supplier[0]) {
        throw new EvalError("No record");
      }
      return supplier; // array of object(s)
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("No record");
      }
      throw new Error(err.message);
    };
  }

  async fetchByEmail(email) {
    if (!email) {
      throw new Error("Email missing");
    }
    try {
      let supplier = await this.knex("supplier")
        .join("country", "country.id", "supplier.country_id")
        .join("company_type", "company_type.id", "supplier.company_type_id")
        .select([
          "supplier.*",
          this.knex.raw("to_json(country.*) as country_object"),
          this.knex.raw("to_json(company_type.*) as company_type_object"),
          "country.name as country",
          "company_type.name as companyType",
        ])
        .where({ "supplier.email": email });
      if (!supplier[0]) {
        throw new EvalError("Email not found");
      }
      return supplier[0]; // { id: 1, ... }
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("Email not found");
      }
      throw new Error(err.message);
    };
  }

  async fetchByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    try {
      let supplier = await this.knex("supplier")
        .join("country", "country.id", "supplier.country_id")
        .join("company_type", "company_type.id", "supplier.company_type_id")
        .select([
          "supplier.*",
          this.knex.raw("to_json(country.*) as country_object"),
          this.knex.raw("to_json(company_type.*) as company_type_object"),
          "country.name as country",
          "company_type.name as companyType",
        ])
        .where({ "supplier.id": id });
      if (!supplier[0]) {
        throw new EvalError("ID not found");
      }
      return supplier[0]; // { id: 1, ... }
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("ID not found");
      }
      throw new Error(err.message);
    };
  }

  async deleteByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    let deleteCount = await this.knex("supplier").where({ id }).del();
    if (!deleteCount) {
      throw new Error("ID not found");
    }
    return deleteCount;
  }
}

module.exports = SupplierService;
