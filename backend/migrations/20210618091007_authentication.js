const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("designer", (table) => {
    table.increments();
    table.string("firstName", 10485760);
    table.string("lastName", 10485760);
    table.string("email", 10485760).unique();
    table.string("telephone", 10485760);
    table.string("password", 10485760);
    table.string("companyType", 10485760);
    table.string("jobTitle", 10485760);
    table.string("companyLocation", 10485760);
    table.string("companyWebsite", 10485760);
    table.boolean("isEmailVerified");
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger('designer')));
};

exports.down = function (knex) {
  return knex.schema.dropTable("designer");
};
