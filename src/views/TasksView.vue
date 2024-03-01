<script setup>
    import AddModal from '@/components/AddModal.vue';
    import { useTasksStore } from '@/stores/tasks';
    import { storeToRefs } from 'pinia';
    import { onMounted, ref } from 'vue';
    import { useMainStore } from '@/stores/main';

    const mainStore = useMainStore()
    const store = useTasksStore()

    const { addState } = storeToRefs(mainStore)
    const { tasks } = storeToRefs(store)
    const openItem = ref(-1)

    function openOpt(i) {
        if (openItem.value != i) {
            openItem.value = i
        } else {
            openItem.value = -1
        }
    }

    onMounted(() =>{
        store.getAllTasks()
    })

    const editId = ref(-1)
    const mode = ref('')

    function openAdd() {
        addState.value = !addState.value
        mode.value = 'add'
    }
    
    function openEdit(i) {
        addState.value = true
        editId.value = i
        mode.value = 'edit'
        openItem.value = -1
    }

    function deleteTask(i) {
        store.deleteTask(i)
        openItem.value = -1
    }

</script>

<template>
    <div class="tasks">
        <div class="tasks__box">
            <div class="tasks__head">
                <div class="tasks__title">Here's all your tasks</div>

                <div :class="addState ? 'tasks__add alt' : 'tasks__add'">
                    <button @click="openAdd">
                        +
                    </button>
                </div>
            </div>

            <ul class="tasks__list">
                <li :class="openItem === idx ? 'item open' : 'item'" v-for="item, idx of tasks" :key="idx">
                    <div class="item__box">
                        <div class="item__head">
                            <div class="item__title">{{ item?.title }}</div>

                            <div :class="openItem === idx ? 'item__opt alt' : 'item__opt'">
                                <button @click="openOpt(idx)">
                                    <img src="@/assets/icons/opt.svg">
                                    
                                    <img src="@/assets/icons/close.svg">
                                </button>
                            </div>
                        </div>

                        <div class="item__text">{{ item?.text }}</div>

                        <div class="item__list">
                            <div class="item__cat">
                                #important
                            </div>
                            <div class="item__cat">
                                #work
                            </div>
                        </div>
                    </div>

                    <div class="item__more">
                        <div class="item__btn">
                            <button @click="openEdit(idx)">
                                <img src="@/assets/icons/edit.svg">
                            </button>
                        </div>
                        <div class="item__btn">
                            <button @click="deleteTask(idx)">
                                <img src="@/assets/icons/delete.svg">
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <add-modal 
            :editId="editId"
            :mode="mode"
        />
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/tasks.scss';
</style>