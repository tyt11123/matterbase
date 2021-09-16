const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("company_type", (table) => {
    table.increments();
    table.string("name", 10485760);
    table.timestamps(false, true);
  })
  .then(() => knex.schema.createTable("country", (table) => {
    table.increments();
    table.string("code", 10485760);
    table.string("name", 10485760);
    table.timestamps(false, true);
  }))
  .then(() => knex.schema.createTable("supplier", (table) => {
    table.increments();
    table.string("firstName", 10485760);
    table.string("lastName", 10485760);
    table.string("email", 10485760).unique();
    table.string("telephone", 10485760);
    table.string("companyName", 10485760);
    table.integer("company_type_id").unsigned().notNullable();
    table.foreign("company_type_id").references("id").inTable("company_type");
    table.string("jobTitle", 10485760);
    table.integer("country_id").unsigned().notNullable();
    table.foreign("country_id").references("id").inTable("country");
    table.string("companyLocation", 10485760);
    table.string("companyWebsite", 10485760);
    table.boolean("isAgency");
    table.boolean("isManufacturer");
    table.boolean("isDisabled");
    table.string("supplierLogoURL", 10485760);
    table.timestamps(false, true);
  }))
  .then(() => knex.raw(onUpdateTrigger("company_type")))
  .then(() => knex.raw(onUpdateTrigger("country")))
  .then(() => knex.raw(onUpdateTrigger("supplier")));
};

exports.down = function (knex) {
  return knex.schema.table("supplier", (table) => {
    table.dropForeign("company_type_id");
    table.dropForeign("country_id");
  })
  .then(() => knex.schema.dropTable("supplier"))
  .then(() => knex.schema.dropTable("country"))
  .then(() => knex.schema.dropTable("company_type"));
};
