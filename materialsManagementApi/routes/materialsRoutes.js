const Router = require("express").Router();
const materials = require("../controllers/materialsController.js");

Router.get("/", materials.getAllMaterials)
  .post("/add", materials.addMaterial)
  .put("/edit/:id", materials.editMaterial)
  .delete("/delete/:id", materials.deleteMaterial);

module.exports = Router;
