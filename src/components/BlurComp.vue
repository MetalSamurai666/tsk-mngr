<script setup>
    import { useMainStore } from '@/stores/main';
    import { storeToRefs } from 'pinia';

    const mainStore = useMainStore()

    const { addState } = storeToRefs(mainStore)
</script>

<template>
    <div :class="addState ? 'blur show' : 'blur'"></div>
</template>

<style lang="scss">
.blur{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #5454541a;
    backdrop-filter: blur(10px);
    z-index: 30;
    opacity: 0;
    z-index: -1;
    transition: .1s z-index, .3s linear opacity;
    filter: saturate(0.5);
    &.show{
        z-index: 30;
        opacity: 1;
    }
}
</style>