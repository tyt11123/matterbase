const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("brand", (table) => {
    table.increments();
    table.string("name", 10485760);
    table.integer("country_id").unsigned().notNullable();
    table.foreign("country_id").references("id").inTable("country");
    table.string("website", 10485760);
    table.string("logoURL", 10485760);
    table.integer("supplier_id").unsigned().notNullable();
    table.foreign("supplier_id").references("id").inTable("supplier");
    table.string("leftIntro", 10485760);
    table.string("rightIntro", 10485760);
    table.specificType("image_ids", "integer ARRAY").notNullable();
    table.boolean("isSupplier");
    table.boolean("isHKOffice");
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger("brand")));
};

exports.down = function (knex) {
  return knex.schema.table("brand", (table) => {
    table.dropForeign("country_id");
    table.dropForeign("supplier_id");
  })
  .then(() => knex.schema.dropTable("brand"))
};
