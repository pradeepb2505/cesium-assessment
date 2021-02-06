export const GET_ALL_MATERIALS_SUCCESS = "GET_ALL_MATERIALS_SUCCESS";
export const VIEW_MATERIAL = "VIEW_MATERIAL";
export const CHANGE_ACTIVE_ID = "CHANGE_ACTIVE_ID";
export const UPDATE_MATERIAL_SUCCESS = "UPDATE_MATERIAL_SUCCESS";
export const UPDATE_INDEX = "UPDATE_INDEX";

export const getAllMaterialsSuccess = (materials) => ({
  type: GET_ALL_MATERIALS_SUCCESS,
  materials,
});

export const viewMaterial = (id, material, index) => ({
  type: VIEW_MATERIAL,
  id,
  material,
  index,
});

export const changeActiveId = (id, activeMaterial) => ({
  type: CHANGE_ACTIVE_ID,
  id,
  activeMaterial,
});

export const updateMaterialSuccess = (material) => ({
  type: UPDATE_MATERIAL_SUCCESS,
  material,
});
