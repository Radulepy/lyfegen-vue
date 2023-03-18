<template>
  <div>
    <h1 class="lead display-6 text-center">Create New Contract</h1>
    <div class="container my-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form ref="form">

            <!-- First Party Selection -->
            <div class="mb-3">
              <label for="name" class="form-label">First Party:</label>
              <input type="text" class="form-control" id="name" name="name" v-model="this.contract.party"
                :class="this.contract.party.length < 3 ? 'is-invalid' : ''">
              <div class="invalid-feedback">
                <span class="icon-close"></span> Party name has to be valid
              </div>
            </div>

            <!-- Patient selection -->
            <label class="form-label" for="patient-select">Select a patient:</label>
            <select class="form-select" id="patient-select" name="patient-select" v-model="this.contract.patientId"
              @change="findPatientById(this.contract.patientId)">
              <option v-for="patient in enrolledPatients" :value="patient.id" :key="patient.id">
                {{ "ID: " + patient.id + ", NAME: " + patient.name + ", OS: " + patient.os_months + ", PFS: " +
                  patient.pfs_months + ", PRODUCT: " + patient?.product_name }}
              </option>
            </select>

            <!-- Products section -->
            <div v-if="this.contract.patientId !== ''">
              <div v-for="(product, index) in this.contract.product" :key="index" class="my-4">
                <h3>{{ product.name }}</h3>
                <button type="button" @click="this.removeProductByName(product.name)"> REMOVE </button>
                <div v-for="(price, units) in product.units" :key="units" class="my-2">
                  <label>Units: {{ units }}</label>
                  <div class="input-group">
                    <input type="text" v-model="product.units[units]" class="form-control"
                      @change="this.calculatePricing(this.contract.patientId)" />
                    <span class="input-group-text">CHF {{ price }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Unit selection -->
            <div class="mb-3" v-if="this.contract.product.length !== 0">
              <label for="unit-select" class="form-label">Select Unit</label>
              <select class="form-select" id="unit-select" v-model="this.contract.productUnits"
                @change="this.calculatePricing(this.contract.patientId)">
                <option value="10">10 units</option>
                <option value="20">20 units</option>
                <option value="30">30 units</option>
              </select>
            </div>

            <!-- Patient data update alert -->
            <div class="mb-3 mt-3" v-else>
              <div class="alert alert-danger" role="alert">
                Update Patient data to create a contract!
              </div>
            </div>

            <!-- Base price, Payable and Refundable section -->
            <div v-if="this.contract.basePrice !== 0 && this.contract.product.length !== 0">
              <div class="form-group">
                <label for="basePrice">Base Price</label>
                <input type="text" class="form-control" id="basePrice" v-model="this.contract.basePrice" readonly
                  disabled>
              </div>
              <div class="form-group">
                <label for="payable">Payable</label>
                <input type="text" class="form-control" id="payable" v-model="this.contract.payable" readonly disabled>
              </div>
              <div class="form-group">
                <label for="refundable">Refundable</label>
                <input type="text" class="form-control" id="refundable" v-model="this.contract.refundable" readonly
                  disabled>
              </div>
            </div>

            <!-- Create Contract Button -->
            <button v-if="this.contract.product.length !== 0 && this.contract.productUnits !== 0" type="button"
              class="btn btn-success px-5 mt-3" @click="this.validateContract">Create
              Contract</button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import products from "./productSchema"
import axios from "axios"

export default {
  data() {
    return {
      enrolledPatientsURL: process.env.VUE_APP_API_ENROLLED_PATIENTS,
      createContractURL: process.env.VUE_APP_API_CREATE_CONTRACTS,

      contract: {
        party: '',
        product: [],
        productUnits: 0,
        patientId: '',
        basePrice: 0,
        payable: 0,
        refundable: 0,
      },

      enrolledPatients: {},
      products: [],
    };
  },
  methods: {
    findProductByName(productName) {
      var categoryArray = this.products;
      for (var i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].name == productName) {
          console.log(categoryArray[i])
          return (categoryArray[i]);
        }
      }
    },
    removeProductByName(name) {
      this.contract.product = this.contract.product.filter(product => product.name !== name);
    },
    calculatePricing(patientId) {

      const patient = this.enrolledPatients.find(p => p.id === patientId);
      const product = this.contract.product.find(p => p.name === patient.product_name);

      const { units } = product;
      const basePrice = parseFloat(units[this.contract.productUnits]);

      let payable = 0;
      let refundable = 0;

      if (patient.os_months >= 12) {
        payable = basePrice * 0.75;
        refundable = basePrice * 0.25;
      } else if (patient.os_months === -1 || patient.os_months < 12) {
        payable = basePrice * 0.3;
        refundable = basePrice * 0.7;
      } else {
        if (patient.pfs_months >= 9) {
          payable = basePrice * 0.85;
          refundable = basePrice * 0.15;
        } else if (patient.pfs_months === -1 || patient.pfs_months < 9) {
          payable = basePrice * 0.4;
          refundable = basePrice * 0.6;
        }
      }

      //* base on progression?:
      // if (patient.progression === 'progression') {
      //   pricingType = (patient.os_months >= 12) ? 'pricing_1' : 'pricing_2';
      // } else {
      //   pricingType = (patient.pfs_months >= 9) ? 'pricing_3' : 'pricing_4';
      // }

      this.contract.basePrice = basePrice.toFixed(2);
      this.contract.payable = payable.toFixed(2);
      this.contract.refundable = refundable.toFixed(2);
    },

    findPatientById(id) {
      var categoryArray = this.enrolledPatients;
      for (var i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].id == id) {
          if (categoryArray[i].product_name != '') {
            this.contract.product = [];
            let newProducts = this.findProductByName(categoryArray[i].product_name) ?? '';
            this.contract.product.push(newProducts);
          }
          else {
            alert('Patient does not have a product set. Please update patient data!')
            this.contract.product = [];
          }
        }
      }
    },
    validateContract() {
      if (this.contract.party.length < 2)
        alert('Please fill out the form!')
      else
        this.createContract();
    },
    createContract() {

      axios.post(this.createContractURL, JSON.stringify(this.contract), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert('New Patient Created Succesfully!\nForm Cleared');
            this.resetForm();
          }
        })
        .catch((error) => {
          console.log(error);
          throw new Error("ERROR: " + error);
        });
    },
    resetForm() {
      this.$refs.form.reset();
      this.contract.product = [];
      this.contract.patientId = '';
      this.contract.party = '';
      this.contract.product = '';
    }
  },
  beforeMount() {
    this.products = products.products;

    axios.get(this.enrolledPatientsURL)
      .then((res) => {
        this.enrolledPatients = res.data;
      })

  }
}
</script>