import { LitElement, html } from "lit-element";
import { viewMaterial } from "../actions/actions.js";
import { store } from "../store.js";

class MaterialsItem extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
      material: { type: Object },
      index: { type: Number },
    };
  }

  getVolume(x) {
    return x
      ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " m3"
      : null;
  }

  firstUpdated() {
    this.addEventListener("click", this.clickHandler);
  }

  clickHandler() {
    store.dispatch(viewMaterial(this.id, this.material, this.index));
  }

  render() {
    return html`
      <style>
        .item {
          display: grid;
          grid-template-columns: 50px auto;
          grid-template-rows: 30px 20px;
          border: 1px solid grey;
          background: ${this.active ? "#000042" : "none"};
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
          background: ${this.material.color};
          height: 100%;
          border-radius: 100px;
        }
      </style>
      <div class="item" }>
        <div class="list-box item-color"><div class="color"></div></div>
        <div class="list-info">
          <div class="list-box item-name">${this.material.name}</div>
          <div class="list-box item-volume">
            ${this.getVolume(this.material.volume)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("materials-item", MaterialsItem);
