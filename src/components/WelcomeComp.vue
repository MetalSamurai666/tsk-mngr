<script setup>

</script>

<template>
    <div class="welcome">
        <div class="welcome__box">
            <div class="welcome__title">TSK-MNGR <span>/</span></div>

            <div class="welcome__link">
                <router-link to="/tsks">
                    All Tasks
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/welcome.scss';
</style>