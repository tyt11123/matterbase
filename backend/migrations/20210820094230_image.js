const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.schema.createTable("image", (table) => {
    table.increments();
    table.string("thumbnailUrl", 10485760);
    table.string("url", 10485760);
    table.integer("width");
    table.integer("height");
    table.timestamps(false, true);
  })
  .then(() => knex.raw(onUpdateTrigger("image")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("image");
};
