class ManuService {
  constructor(knex) {
    this.knex = knex;
  }

  async create(values) {
    if (
      !(
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("title") &&
        values.hasOwnProperty("companyName") &&
        values.hasOwnProperty("workEmail") &&
        values.hasOwnProperty("phone")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      let user = await this.knex("manufacturer").insert(values, ["id"]);
      if (!user[0]) {
        throw new Error("database failure");
      }
      return user[0]; // { id: 1 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getMailSetting(values) {
    if (
      !(
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("title") &&
        values.hasOwnProperty("companyName") &&
        values.hasOwnProperty("workEmail") &&
        values.hasOwnProperty("phone")
      )
    ) {
      throw new Error("attribute missing");
    }
    let setting = {
      template: "newManufacturer",
      message: { to: process.env.ADMIN_EMAIL },
      locals: { ...values },
    };
    return setting;
  }

  async fetchAll() {
    let manufacturer = await this.knex("manufacturer").select();
    if (!manufacturer[0]) {
      throw new Error("No record");
    }
    return manufacturer; // array of object(s)
  }

  async matchByEmail(email) {
    if (!email) {
      throw new Error("Email missing");
    }
    let manufacturer = await this.knex("manufacturer")
      .select()
      .where({ email });
    if (!manufacturer[0]) {
      throw new Error("Email not found");
    }
    return manufacturer; // array of object(s)
  }

  async deleteByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    let deleteCount = await this.knex("manufacturer").where({ id }).del();
    if (!deleteCount) {
      throw new Error("ID not found");
    }
    return deleteCount;
  }
}

module.exports = ManuService;
