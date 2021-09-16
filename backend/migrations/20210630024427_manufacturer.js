const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("manufacturer", (table) => {
    table.increments();
    table.string("firstName", 10485760);
    table.string("lastName", 10485760);
    table.string("title", 10485760);
    table.string("companyName", 10485760);
    table.string("workEmail", 10485760);
    table.string("phone", 10485760);
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger('manufacturer')));
};

exports.down = function (knex) {
  return knex.schema.dropTable("manufacturer");
};
