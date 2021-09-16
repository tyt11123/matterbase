const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("subscription", (table) => {
    table.increments();
    table.string("email", 10485760).unique();
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger('subscription')));
};

exports.down = function (knex) {
  return knex.schema.dropTable("subscription");
};
