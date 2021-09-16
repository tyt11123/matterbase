const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("federated_designer", (table) => {
    table.increments();
    table.string("provider", 10485760).notNullable();
    table.string("provider_id", 10485760).notNullable();
    table.unique(["provider", "provider_id"]);
    table.string("firstName", 10485760);
    table.string("lastName", 10485760);
    table.string("email", 10485760);
    table.string("telephone", 10485760);
    table.string("companyType", 10485760);
    table.string("jobTitle", 10485760);
    table.string("companyLocation", 10485760);
    table.string("companyWebsite", 10485760);
    table.boolean("isInfoSupplemented");
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger('federated_designer')));
};

exports.down = function (knex) {
  return knex.schema.dropTable("federated_designer");
};
