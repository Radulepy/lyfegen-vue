<template>
    <div>
        <!-- Title -->
        <div class="text-center lead display-6" style="margin-top: 250px;">Contracts</div>

        <!-- Menu Items -->
        <div class="d-flex align-items-center justify-content-center">
            <div class="p-2 m-2 shadow rounded-2">
                <router-link to="new-contract">
                    <a class="btn btn-primary"> Create New Contract </a>
                </router-link>
            </div>
            <div class="p-2 m-2 shadow rounded-2">
                <router-link to="all-contracts">
                    <a class="btn btn-primary"> List All Contracts Status </a>
                </router-link>
            </div>
        </div>

        <!-- GO Back Button -->
        <div>
            <div class="d-flex align-items-center justify-content-center">
                <router-link to="/">
                    <a class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                        </svg> </a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style></style>