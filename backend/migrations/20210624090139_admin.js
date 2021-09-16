const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("admin", (table) => {
    table.increments();
    table.string("firstName", 10485760);
    table.string("lastName", 10485760);
    table.string("email", 10485760).unique();
    table.string("password", 10485760);
    table.string("remarks", 10485760);
    table.boolean("isSuper");
    table.boolean("isDisabled");
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger('admin')));
};

exports.down = function (knex) {
  return knex.schema.dropTable("admin");
};
