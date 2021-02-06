const materials = require("../models/materialsModel.js");
const constants = require("../constants.js");

class MaterialsController {
  async getAllMaterials(req, res, next) {
    try {
      const allMaterials = (await materials.getAllMaterials()).rows;
      res.status(200).json(allMaterials);
    } catch (e) {
      next(e);
    }
  }

  async addMaterial(req, res, next) {
    const data = req.body;
    try {
      const result = await materials.addMaterial(data);
      res.status(200).json({ status: constants.success, ...result[0] });
    } catch (e) {
      next(e);
    }
  }

  async deleteMaterial(req, res, next) {
    const id = req.params.id;
    const data = req.body;
    try {
      await materials.deleteMaterial({ id, data });
      res.status(200).json({ status: constants.success });
    } catch (e) {
      next(e);
    }
  }

  async editMaterial(req, res, next) {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = (await materials.editMaterial(id, data)).rows;
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MaterialsController();
