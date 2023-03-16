<template>
    <div>
        <div class="text-center lead display-6" style="margin-top: 250px;">Home</div>
        <div class="d-flex align-items-center justify-content-center">
            <div class="p-2 m-2 shadow rounded-2">
                <router-link to="contracts">
                    <a class="btn btn-primary"> Contracts </a>
                </router-link>
            </div>
            <div class="p-2 m-2 shadow rounded-2">
                <router-link to="patients">
                    <a class="btn btn-info"> Patients </a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style></style>