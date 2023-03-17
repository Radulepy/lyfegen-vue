<template>
  <div class="container mt-3">
    <h1 class="text-center display-6"> Contract Status List </h1>
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Party Name</th>
          <th>Patient ID</th>
          <th>Product JSON</th>
          <th>Units</th>
          <th>Payable</th>
          <th>Refundable</th>
          <th>Base Price</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contract in contracts" :key="contract.id">
          <td>{{ contract.id }}</td>
          <td>{{ contract.party_name }}</td>
          <td>{{ contract.patient_id }}</td>
          <td>{{ contract.product_json }}</td>
          <td>{{ contract.units }}</td>
          <td>{{ contract.payable }}</td>
          <td>{{ contract.refundable }}</td>
          <td>{{ contract.base_price }}</td>
          <td>{{ contract.created_at }}</td>
          <td>{{ contract.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContractsTable',
  data() {
    return {
      contracts: [],
      getContractsURL: process.env.VUE_APP_API_CREATE_CONTRACTS,
    }
  },
  methods: {

  },
  async created() {
    try {
      const response = await axios.get(this.getContractsURL)
      const data = JSON.parse(JSON.stringify(response.data))
      this.contracts = data
    } catch (error) {
      throw new Error("ERROR: " + error);
    }
  }
}
</script>
