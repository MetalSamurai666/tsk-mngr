<script setup>
    import { useTasksStore } from '@/stores/tasks';
    import { storeToRefs } from 'pinia';
    import { ref, watch } from 'vue';
    import { useMainStore } from '@/stores/main';

    const mainStore = useMainStore()
    const tasksStore = useTasksStore()

    const { addState } = storeToRefs(mainStore)
    const { task } = storeToRefs(tasksStore)

    const taskBox = ref({
        title: '',
        text: ''
    })

    async function addTask() {
        if(taskBox.value.title.length > 0 && taskBox.value.text.length > 0) {
            tasksStore.addTask(taskBox.value)
            taskBox.value = {}
            addState.value = false
        }
    }

    async function saveTask() {
        if(taskBox.value.title.length > 0 && taskBox.value.text.length > 0) {
            tasksStore.saveTask(taskBox.value, props.editId)
            taskBox.value = {}
            addState.value = false
        }
    }

    function getEdit() {
        tasksStore.getTask(props.editId)
        taskBox.value = task.value
    }

    const props = defineProps({
        editId: Number,
        mode: {
            type: String,
            default: 'add'
        }
    })

    watch(
        () => addState.value,
        () => {
            if (addState.value && props.mode == 'edit') {
                getEdit()
            } else {
                taskBox.value = {}
            }
        }
    )

</script>

<template>
    <div :class="addState ? 'add alt' : 'add'">
        <div class="add__box">
            <div class="add__title">{{ mode == 'edit' ? 'Edit' : 'Add' }} Task</div>
            <div class="add__list">
                <div class="add__input">
                    <input type="text" placeholder="Task Title" v-model="taskBox.title">
                </div>
                <div class="add__input">
                    <input type="text" placeholder="Task Text" v-model="taskBox.text">
                </div>
            </div>

            <div class="add__btns">
                <div class="add__btn">
                    <button @click="saveTask()" v-if="mode === 'edit'">
                        Edit
                    </button>

                    <button @click="addTask()" v-else>
                        Add
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/modal.scss';
</style>