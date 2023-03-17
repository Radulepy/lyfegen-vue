import { createRouter, createWebHistory } from 'vue-router' //importin router, history

import Home from '../views/Home';

const routes = [
    //* Views:
    { path: '/', name: 'Home', component: Home },
    { path: '/contracts', name: 'Contracts', component: () => import('../views/Contracts.vue') },
    { path: '/patients', name: 'Patients', component: () => import('../views/Patients.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('../views/error/404.vue') }, // page not found

    //* Contract components:
    { path: '/new-contract', name: 'NewContract', component: () => import('../components/contract/CreateContract.vue') },
    { path: '/all-contracts', name: 'AllContracts', component: () => import('../components/contract/ListContracts.vue') },

    //* Patient components:
    { path: '/new-patient', name: 'NewPatient', component: () => import('../components/patient/CreatePatient.vue') },
    { path: '/all-patients', name: 'AllPatients', component: () => import('../components/patient/ListPatients.vue') },
];

const router = createRouter({
    history: createWebHistory(), 
    routes // routes: [...]
})

export default router; // export router and use it in main.js