import { store } from "../store.js";
import {
  getAllMaterialsSuccess,
  updateMaterialSuccess,
} from "../actions/actions";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAllMaterials = () => {
  instance.get("/materials").then((res) => {
    store.dispatch(getAllMaterialsSuccess(res.data));
  });
};

export const updateMaterial = (id, material) => {
  instance.put("/materials/edit/" + id, material).then((res) => {
    store.dispatch(updateMaterialSuccess(res.data[0]));
  });
};

export const deleteMaterial = (id, material) => {
  instance.delete("/materials/delete/" + id).then((res) => {
    getAllMaterials();
  });
};

export const addMaterial = () => {
  instance.post("/materials/add/").then((res) => {
    getAllMaterials();
  });
};
