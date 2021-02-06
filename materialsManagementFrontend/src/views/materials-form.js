import { LitElement, html } from "lit-element";
import { store } from "../store.js";
import { updateMaterial } from "../services/materialsService";
import "@polymer/paper-swatch-picker/paper-swatch-picker.js";

class MaterialsForm extends LitElement {
  static get properties() {
    return {
      material: { type: Object },
      activeId: { type: Number },
    };
  }

  onChange(e) {
    switch (e.target.id) {
      case "name":
        this.material.name = e.target.value;
        break;
      case "id":
        this.material.id = e.target.value;
        break;
      case "volume":
        this.material.volume = parseInt(e.target.value);
        break;
      case "cost":
        this.material.cost = parseFloat(e.target.value);
        break;
      case "color":
        this.material.color = e.target.color;
        break;
      case "date":
        this.material.delivery_date = e.target.value;
        break;
    }
    updateMaterial(parseInt(this.material.id), this.material);
  }

  render() {
    let state = store.getState();
    return html`
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      />
      <script type="module">
        import "@polymer/paper-swatch-picker/paper-swatch-picker.js";
      </script>
      <style>
        .material-form {
          padding: 20px;
        }

        .form-control {
          background-color: #363640;
          border: none;
          color: white;
        }

        .form-control:focus {
          background-color: #363640;
          border: none;
          color: white;
        }

        paper-swatch-picker {
          width: 37px;
          height: 37px;
          background: ${this.material.color};
          border-radius: 50%;
        }

        .col-md-6 {
          margin-top: 30px;
        }

        input::-webkit-inner-spin-button {
          opacity: 0.5;
        }
      </style>
      <div class="row g-3 material-form">
        <div class="col-md-6">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            .value=${this.material.name}
            @keyup=${(e) => this.onChange(e)}
          />
        </div>
        <div class="col-md-6">
          <label>Color</label><br />
          <div class="circle">
            <paper-swatch-picker
              id="color"
              @color-changed=${(e) => this.onChange(e)}
              color=${state.materialsReducer.activeMaterial.color}
              icon=""
            ></paper-swatch-picker>
          </div>
        </div>
        <div class="col-md-6">
          <label>Volume (m<sup>3</sup>)</label>
          <input
            type="number"
            class="form-control"
            id="volume"
            .value=${this.material.volume}
            @keyup=${(e) => this.onChange(e)}
            @change=${(e) => this.onChange(e)}
          />
        </div>
        <div class="col-md-6">
          <label>Cost (USD per m<sup>3</sup>)</label>
          <input
            type="number"
            class="form-control"
            id="cost"
            step="0.01"
            .value=${this.material.cost}
            @keyup=${(e) => this.onChange(e)}
            @change=${(e) => this.onChange(e)}
          />
        </div>
        <div class="col-md-6">
          <label>Delivery Date</label>
          <input
            type="date"
            class="form-control"
            id="date"
            .value=${new Date(this.material.delivery_date)
              .toISOString()
              .substring(0, 10)}
            @change=${(e) => this.onChange(e)}
          />
        </div>
      </div>
    `;
  }
}

customElements.define("materials-form", MaterialsForm);
