class CountryService {
  constructor(knex) {
    this.knex = knex;
  }

  async fetchAll() {
    let type = await this.knex("country").select().orderBy("id");
    if (!type[0]) {
      throw new Error("No record");
    }
    return type; // array of object(s)
  }
}

module.exports = CountryService;
