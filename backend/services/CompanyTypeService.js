class CompanyTypeService {
  constructor(knex) {
    this.knex = knex;
  }

  async create(values) {
    if (!(values.hasOwnProperty("name"))) {
      throw new Error("attribute missing");
    }
    try {
      let user = await this.knex("company_type").insert(values, ["id"]);
      if (!user[0]) {
        throw new Error("database failure");
      }
      return user[0]; // { id: 1 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchAll() {
    let type = await this.knex("company_type").select().orderBy('name');
    if (!type[0]) {
      throw new Error("No record");
    }
    return type; // array of object(s)
  }

  async update(values) {
    if (!(
      values.hasOwnProperty("id") &&
      values.hasOwnProperty("name")
    )) {
      throw new Error("attribute missing");
    }
    let { id, name } = values;
    try {
      let companyType = await this.knex("company_type").where({ id }).update({ name }, ['id']);
      return companyType[0]; // { id: 2 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    let deleteCount = await this.knex("company_type").where({ id }).del();
    if (!deleteCount) {
      throw new Error("ID not found");
    }
    return deleteCount;
  }
}

module.exports = CompanyTypeService;
