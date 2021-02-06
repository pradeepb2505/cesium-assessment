import {
  GET_ALL_MATERIALS_SUCCESS,
  VIEW_MATERIAL,
  UPDATE_MATERIAL_SUCCESS,
} from "../actions/actions";

const initialState = {
  materials: [],
  activeId: 0,
  activeMaterial: {
    id: null,
    name: null,
    color: null,
    volume: null,
    delivery_date: null,
  },
  index: 0,
};

export default function materialsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MATERIALS_SUCCESS:
      return {
        ...state,
        materials: action.materials,
        activeId: action.materials[0] ? action.materials[0].id : null,
        activeMaterial: action.materials[0],
      };
    case VIEW_MATERIAL:
      return {
        ...state,
        activeId: action.id,
        activeMaterial: action.material,
        index: action.index,
      };
    case UPDATE_MATERIAL_SUCCESS:
      return {
        ...state,
        activeMaterial: action.material,
        activeId: action.material.id,
        materials: Object.assign([], state.materials, {
          [state.index]: action.material,
        }),
      };
    default:
      return state;
  }
}
