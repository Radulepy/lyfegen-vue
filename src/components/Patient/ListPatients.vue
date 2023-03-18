<template>
    <div class="container mt-3">
    <h1 class="text-center display-6"> Patients List </h1>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Treatment Start Date</th>
                    <th>Product Name</th>
                    <th>OS Months</th>
                    <th>PFS Months</th>
                    <th>C. Stage</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in patients" :key="patient.id">
                    <td>{{ patient.id }}</td>
                    <td v-if="!patient.editing">{{ patient.name }}</td>
                    <td v-else>
                        <input v-model="patient.name" type="text" class="form-control">
                    </td>
                    <td v-if="!patient.editing">{{ patient.gender }}</td>
                    <td v-else>
                        <input v-model="patient.gender" type="text" class="form-control">
                    </td>
                    <td v-if="!patient.editing">{{ patient.age }}</td>
                    <td v-else>
                        <input v-model="patient.age" type="number" class="form-control">
                    </td>
                    <td v-if="!patient.editing">{{ patient.treatment_start_date }}</td>
                    <td v-else>
                        <input v-model="patient.treatment_start_date" type="date" class="form-control">
                    </td>
                    <td v-if="!patient.editing">{{ patient.product_name }}</td>
                    <td v-else>
                        <select v-model="patient.product_name" class="form-select" id="product" name="product">
                            <option selected hidden value="">Select Product</option>
                            <option value="ABC vial 10mg/ml">ABC vial 10mg/ml</option>
                            <option value="ABC vial 20mg/ml">ABC vial 20mg/ml</option>
                        </select>
                    </td>
                    <td v-if="!patient.editing">{{ patient.os_months }}</td>
                    <td v-else>
                        <input v-model="patient.os_months" type="number" class="form-control">
                    </td>
                    <td v-if="!patient.editing">{{ patient.pfs_months }}</td>
                    <td v-else>
                        <input v-model="patient.pfs_months" type="number" class="form-control">
                    </td>
                    <td v-if="!patient.editing">{{ patient.cancer_stage }}</td>
                    <td v-else>
                        <input v-model="patient.cancer_stage" type="number" class="form-control">
                    </td>
                    <td>{{ patient.created_at }}</td>
                    <td>{{ patient.updated_at }}</td>
                    <td>
                        <button v-if="!patient.editing" @click="patient.editing = true"
                            class="btn btn-primary">Edit</button>
                        <button v-else @click="updatePatient(patient)" class="btn btn-success">Update</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'PatientsTable',
    data() {
        return {
            getPatientsURL: process.env.VUE_APP_API_CREATE_PATIENTS,
            patients: []
        }
    },
    async created() {
        const response = await axios.get(this.getPatientsURL)
        this.patients = response.data
    },
    methods: {
        async updatePatient(patient) {
            console.log(patient)
            // TO BE IMPLEMENTED
        }
    }
}
</script>