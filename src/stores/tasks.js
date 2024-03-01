import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const task = ref({})

  const getAllTasks = () => {
    if (localStorage.getItem('todos')){
      tasks.value = JSON.parse(localStorage.getItem('todos'))
    }
  }

  const addTask = task => {
    tasks.value = [task,...tasks.value]
    localStorage.setItem('todos', JSON.stringify(tasks.value))
  }

  const saveTask = (task, idx) => {
    tasks.value[idx] = task
    localStorage.setItem('todos', JSON.stringify(tasks.value))
  }

  async function getTask(idx) {
    task.value = tasks.value[idx]
  }

  async function deleteTask(idx) {
    tasks.value.splice(idx, 1)
    localStorage.setItem('todos', JSON.stringify(tasks.value))
  }


  return { 
    task,
    tasks,

    getAllTasks,
    addTask,
    saveTask,
    getTask,
    deleteTask
  }
})