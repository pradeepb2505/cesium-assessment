const debug = require("debug")("app:model:user");
const pool = require("../libs/db");

const dbTable = require("../constants.js").dbTable;

class MaterialsModel {
  async getAllMaterials() {
    const res = await pool.query(
      "SELECT * from " + dbTable + " order by id desc"
    );
    debug("getAllMaterials %o", res);
    return res;
  }

  async addMaterial(data) {
    const material = [
      data.name,
      data.color || "rgb(123,123,123)",
      data.volume || 0,
      data.cost || 0.0,
      data.delivery_date,
    ];
    const res = await pool.query(
      "INSERT INTO " +
        dbTable +
        " (name, color, volume, cost, delivery_date) VALUES ($1, $2, $3, $4, $5) RETURNING id, name",
      material
    );
    debug("addMaterial %o", res);
    return res.rows;
  }

  async deleteMaterial(data) {
    const id = data.id;
    const res = await pool.query(
      "DELETE from " + dbTable + " where id = $1 RETURNING id",
      [id]
    );
    debug("delete %o", res);
    return res;
  }

  async editMaterial(id, data) {
    const material = [
      data.name,
      data.color,
      data.volume,
      data.cost,
      data.delivery_date,
      id,
    ];
    const res = await pool.query(
      "UPDATE " +
        dbTable +
        " set (name, color, volume, cost, delivery_date) = ($1, $2, $3, $4, $5) where id = $6 RETURNING *",
      material
    );
    debug("addMaterial %o", res);
    return res;
  }
}

module.exports = new MaterialsModel();
