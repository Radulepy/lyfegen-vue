<template>
    <div>
        <h1 class="display-6 text-center mt-4 mb-3">Add New Patient</h1>
        <div class="col d-flex justify-content-center">
            <form @submit.prevent ref="form">
                <div class="mb-3">
                    <label for="name" class="form-label">Name*</label>
                    <input type="text" class="form-control" id="name" name="name" v-model="this.patient.name"
                        :class="this.patient.name.length < 3 ? 'is-invalid' : ''">
                    <div class="invalid-feedback">
                        <span class="icon-close"></span> Name has to be valid
                    </div>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age*</label>
                    <input type="number" class="form-control" id="age" name="age" v-model="this.patient.age"
                        :class="this.patient.age < MIN_AGE || this.patient.age > MAX_AGE || this.patient.age === '' ? 'is-invalid' : ''">
                    <div class="invalid-feedback">
                        <span class="icon-close"></span> Age has to be valid
                    </div>
                </div>
                <div class="mb-3">
                    <label for="gender" class="form-label">Gender*</label>
                    <select class="form-select" id="gender" name="gender" v-model="this.patient.gender"
                        :class="this.patient.gender === '' ? 'is-invalid' : ''">
                        <option selected hidden value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <div class="invalid-feedback">
                        <span class="icon-close"></span> Gender is required
                    </div>
                </div>
                <div class="mb-3">
                    <label for="cancer-stage" class="form-label">Cancer Stage*</label>
                    <select class="form-select" id="cancer-stage" name="cancer-stage" v-model="this.patient.cancer_stage"
                        :class="this.patient.cancer_stage === '' ? 'is-invalid' : ''">
                        <option selected hidden value="">Select Stage</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <div class="invalid-feedback">
                        <span class="icon-close"></span> Stage is required
                    </div>
                </div>
                <div class="mb-3">
                    <label for="treatment-start-date" class="form-label">Treatment Start
                        Date</label>
                    <input type="date" class="form-control" id="treatment-start-date" name="treatment_start-date"
                        v-model="this.patient.treatment_start_date">
                </div>
                <div class="mb-3">
                    <label for="product" class="form-label">Product</label>
                    <select class="form-select" id="product" name="product" v-model="this.patient.product_name">
                        <option selected hidden value="">Select Product</option>
                        <option v-for="product in products" :value="product.name" :key="product.name">{{ product.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="os" class="form-label">Overall Survival (OS) Months</label>
                    <input type="number" class="form-control" step="1" min="0" max="999" id="os" name="os"
                        v-model="this.patient.os_months">
                </div>
                <div class="mb-3">
                    <label for="pfs" class="form-label">Progression Free Survival (PFS) Months</label>
                    <input type="number" class="form-control" step="1" min="0" max="999" id="pfs" name="pfs"
                        v-model="this.patient.pfs_months">
                </div>
                <button type="button" class="btn btn-block btn-success" @click="this.validateForm">Create New
                    Patient</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import products from "../contract/productSchema";

export default {
    data() {
        return {
            patient: {
                name: '',
                age: '',
                gender: '',
                cancer_stage: '',
                treatment_start_date: '',
                product_name: '',
                os_months: '',
                pfs_months: '',
            },

            products: products.products,

            //* Constants:
            MIN_AGE: 1,     // minimum valid age
            MAX_AGE: 110,   // maximum valid age

            // formEndpointURL: import.meta.env.MODE === 'development' ? 'lyfegen/api/v1/create.php' : 'lyfegen/api/v1/create.php' // development / production API endpoint
            formEndpointURL: process.env.VUE_APP_API_CREATE_PATIENTS,
        }
    },
    methods: {
        validateForm() { //basic validation, to be improved:
            if (this.patient.name !== '' || this.patient.name.length >= 3)
                if (this.patient.age > this.MIN_AGE && this.patient.age < this.MAX_AGE)
                    if (this.patient.gender === "male" || this.patient.gender === "female" || this.patient.gender === "other")
                        return this.sendForm();
            alert("one or more fields are incorrect!")

        },
        sendForm() {
            console.log(JSON.stringify(this.patient))

            axios.post(this.formEndpointURL, JSON.stringify(this.patient), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                .then((response) => {
                    if (response.status === 201) {
                        alert('New Patient Created Succesfully!\nForm Cleared');
                        this.$refs.form.reset();
                    }
                })
                .catch((error) => {
                    throw new Error("ERROR: " + error);
                });
        }
    }

}
</script>

<style></style>