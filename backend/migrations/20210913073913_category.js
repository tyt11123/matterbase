const CREATE_EXTENSION_LTREE = `CREATE EXTENSION IF NOT EXISTS ltree`;
const DROP_EXTENSION_LTREE = `DROP EXTENSION ltree`;

const GET_NODE_PATH_FUNCTION = `
  CREATE OR REPLACE FUNCTION get_node_path(id int)
  RETURNS ltree AS $code$
  SELECT CASE WHEN c."parent_id" IS null 
        THEN c.id::text::ltree
        ELSE get_node_path(c.parent_id) || c.id::text
      END
    FROM category c
  WHERE c.id = $1;
$code$ language 'sql';
`;

const DROP_NODE_PATH_FUNCTION = `DROP FUNCTION get_node_path`;

const TRIG_UPIN_CATEGORY_FUNCTION = `
  CREATE OR REPLACE FUNCTION trig_upin_category()
  RETURNS trigger AS $code$
  BEGIN
    IF TG_OP = 'UPDATE' THEN
      IF (COALESCE(OLD.parent_id, 0) != COALESCE(NEW.parent_id, 0) OR NEW.id != OLD.id) THEN
        UPDATE category
          SET path = get_node_path(id)
        WHERE OLD.path @> category.path;
      END IF;
    ELSIF TG_OP = 'INSERT' THEN
      UPDATE category
        SET path = get_node_path(NEW.id)
      WHERE category.id = NEW.id;
    END IF;
    RETURN NEW;
  END;
$code$ language 'plpgsql' volatile;
`;

const DROP_TRIG_UPIN_CATEGORY_FUNCTION = `DROP FUNCTION trig_upin_category`;

const onCategoryTrigger = `
  CREATE TRIGGER "trig_upin_category"
  AFTER INSERT OR UPDATE OF "id", "parent_id" 
  ON "category" FOR EACH ROW
  EXECUTE PROCEDURE trig_upin_category();
`;

const onUpdateTrigger = table => `
  CREATE TRIGGER "${table}_updated_at"
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

exports.up = function (knex) {
  return knex.raw(CREATE_EXTENSION_LTREE)
  .then(() => knex.schema.createTable("category", (table) => {
    table.increments();
    table.integer("parent_id");
    table.text("name");
    table.string("imageURL", 10485760);
    table.specificType("path", "ltree");
    table.unique("path");
    table.index("path", "category_path_gist_index", "gist");
    table.timestamps(false, true);
  }))
  .then(() => knex.raw(GET_NODE_PATH_FUNCTION))
  .then(() => knex.raw(TRIG_UPIN_CATEGORY_FUNCTION))
  .then(() => knex.raw(onCategoryTrigger))
  .then(() => knex.raw(onUpdateTrigger("category")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("category")
    .then(() => knex.raw(DROP_NODE_PATH_FUNCTION))
    .then(() => knex.raw(DROP_TRIG_UPIN_CATEGORY_FUNCTION))
    .then(() => knex.raw(DROP_EXTENSION_LTREE));
};
