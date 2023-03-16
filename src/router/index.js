import { createRouter, createWebHistory } from 'vue-router' //importin router, history

import Home from '../views/Home';

const routes = [
    //* views:
    { path: '/', name: 'Home', component: Home },
    { path: '/contracts', name: 'Contracts', component: () => import('../views/Contracts.vue') },
    { path: '/patients', name: 'Patients', component: () => import('../views/Patients.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('../views/error/404.vue') }, // page not found

    //* Contract components:
    { path: '/new-contract', name: 'NewContract', component: () => import('../components/Contract/CreateContract.vue') },
    { path: '/all-contracts', name: 'AllContracts', component: () => import('../components/Contract/ListContracts.vue') },
    { path: '/contract-status', name: 'ContractStatus', component: () => import('../components/Contract/StatusContract.vue') },

    //* Patient components:
    { path: '/new-patient', name: 'NewPatient', component: () => import('../components/Patient/CreatePatient.vue') },
    { path: '/all-patients', name: 'AllPatients', component: () => import('../components/Patient/ListPatients.vue') },
];

const router = createRouter({
    history: createWebHistory(), // createWebHashHistory adds a '#' before links to stop server handling index.html file: domain/#/brands/categroy 
    routes // routes: [...]
})

export default router; // export router and use it in main.js