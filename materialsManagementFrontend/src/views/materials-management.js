import { LitElement, html } from "lit-element";
import Fontawesome from "lit-fontawesome";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../store.js";
import {
  getAllMaterials,
  deleteMaterial,
  addMaterial,
} from "../services/materialsService";

class MaterialsManagement extends connect(store)(LitElement) {
  static get styles() {
    return [Fontawesome];
  }

  static get properties() {
    return {
      materials: { type: Array },
      activeId: { type: Number },
      activeMaterial: { type: Object },
      totalCost: { type: Number },
    };
  }

  constructor() {
    super();
    this.materials = [];
    getAllMaterials();
  }

  render() {
    let state = store.getState();

    return html`
      <style>
        .btn {
          border: none;
          color: white;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 20px;
          margin: 5px;
          font-size: 90%;
        }

        i {
          margin: 2px;
        }

        #materialsHeading {
          color: white;
        }

        .wrapper {
          margin-top: 20px;
          display: grid;
          grid-gap: 30px;
          grid-template-columns: 300px 700px;
        }
      
        .box {
          min-height: 400px;
          color: white;
        }

        .list {
          grid-column: 1 / 2;
          border: 1px solid grey;
          background: #101013;
        }

        .material {
          grid-column: 2;
          border-radius: 10px;
          background: #17171B;
        }

        .item {
          display: grid;
          grid-template-columns: 50px auto;
          grid-template-rows: 30px 20px;
          border: 1px solid grey;
        }
        
        .item-color {
          grid-column: 1;
          grid-row: 1 / 3;
          padding: 12px;
        }
        
        .item-name {
          grid-column: 2;
          font-size: 20px;
        }
        
        .item-volume {
          grid-column: 2;
          grid-row: 2;
          font-size: 15px;
        }
        
        .list-info {
          padding-left: 2px;
        }

        .color {
          background: red;
          height: 100%;
          border-radius: 100px;
        }

        .total{
          color: white;
          margin-top: 20px;
          display: flex;
          grid-column: 1 / 2;
          justify-content: space-between;
          padding: 5px;
        }
      </style>

      <h1 id="materialsHeading">Materials </h1>
      <button class="btn fas fa-plus" style="background-color: #0076DC" @click="${() =>
        addMaterial()}><i class="fas fa-trash fa-lg"> </i> Add</button>
      <button class="btn fas fa-trash" style="background-color: #FF424B" @click="${() =>
        deleteMaterial(
          this.activeId
        )}><i class="fas fa-trash fa-lg"> </i> Delete</button>

      <div class="wrapper">

        <div class="box list">
          ${
            this.materials &&
            this.materials.map((row, index) => {
              return html`<materials-item
                ?active=${row.id == this.activeId}
                id=${row.id}
                .material=${row}
                index=${index}
              ></materials-item>`;
            })
          }
        </div>
        <div class="box material">
        ${
          this.materials[0] &&
          html`<materials-form
            .material=${this.activeMaterial}
            .id=${this.activeId}
          ></materials-form>`
        }
        </div>
        <div class="total">
          <div>Total Cost: </div><div> $${
            (state.materialsReducer.activeMaterial &&
              (
                state.materialsReducer.activeMaterial.volume *
                state.materialsReducer.activeMaterial.cost
              ).toFixed(2)) ||
            0
          }</div>
        </div>
      </div>
    `;
  }

  stateChanged(state) {
    this.materials = state.materialsReducer.materials;
    this.activeId = state.materialsReducer.activeId;
    this.activeMaterial = state.materialsReducer.activeMaterial;
  }
}

customElements.define("materials-management", MaterialsManagement);