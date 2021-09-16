class CategoryService {
  constructor(knex) {
    this.knex = knex;
  }

  async create(values) {
    if ( !(values.hasOwnProperty("name")) ) {
      throw new Error("name missing");
    }
    try {
      const { parent_id, name, imageURL, } = values;
      const attributes = { parent_id, name, imageURL, };
      let category = await this.knex("category").insert(attributes, ["id"]);
      if (!category[0]) {
        throw new Error("database failure");
      }
      return category[0]; // { id: 1 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(values) {
    if (
      !(
        values.hasOwnProperty("id") &&
        values.hasOwnProperty("name")
      )
    ) {
      throw new Error("attribute missing");
    }
    const { id, name, imageURL } = values;
    if (Number(id) === 1) throw new TypeError("forbidden");
    if (Number(id) === 2) throw new TypeError("forbidden");
    try {
      let category = await this.knex("category")
        .where({ id })
        .update({ name, imageURL }, ["id"]);
      if (!category[0]) {
        throw new Error("ID not found");
      }
      return category[0]; // { id: 2 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchAll() {
    try {
      let categoryList = await this.knex("category")
        .select(
          "category.*",
          this.knex.raw("array_to_string(array_agg(a.name order by a.path), '->') as fullname"),
        )
        .join("category as a", "a.path", "@>", "category.path")
        .groupBy(["category.id", "category.path", "category.name"])
        .orderBy("fullname");
      if (!categoryList[0]) {
        throw new EvalError("No record");
      }
      return categoryList; // [{ id: 1, ... }, ...]
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
      let categoryList = await this.knex.with("ctree", this.knex.raw("select path cpath from \"category\" where \"id\" = ?", id))
        .select(
          "category.*",
          this.knex.raw("array_to_string(array_agg(a.name order by a.path), '->') as fullname"),
        )
        .from("category")
        .join("ctree", "ctree.cpath", "@>", "category.path")
        .join("category as a", "a.path", "@>", "category.path")
        .groupBy(["category.id", "category.path", "category.name"])
        .orderBy("fullname");
      if (!categoryList[0]) {
        throw new EvalError("No record");
      }
      return categoryList; // [{ id: 1, ... }, ...]
    } catch (err) {
      if (err instanceof EvalError) {
        throw new EvalError("No record");
      }
      throw new Error(err.message);
    }
  }

  async deleteByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    if (Number(id) === 1) throw new TypeError("forbidden");
    if (Number(id) === 2) throw new TypeError("forbidden");
    const dependency = await this.knex("category").where("parent_id", id);
    if (dependency[0]) throw new EvalError("dependency exists");
    let deleteCount = await this.knex("category").where({ id }).del();
    if (!deleteCount) {
      throw new Error("ID not found");
    }
    return deleteCount;
  }
}

module.exports = CategoryService;
