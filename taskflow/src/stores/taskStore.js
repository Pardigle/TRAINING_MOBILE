import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

export const useTaskStore = defineStore('tasks', () => {

  const tasks = ref([])
  const nextId = ref(1)
  const STORAGE_KEY = 'taskflow_tasks'

  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter(task => task.done).length)
  const pendingCount = computed(() => totalCount.value - doneCount.value)

  const saveTasks = async () => {
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(tasks.value)
    })
    await Preferences.set({
      key: 'nextId',
      value: nextId.value.toString()
    })
  }

  const loadTasks = async () => {
    const { value } = await Preferences.get({ key: STORAGE_KEY })
    if (value) {
      tasks.value = JSON.parse(value)
    }
    const idResult = await Preferences.get({ key: 'nextId' })
    if (idResult.value) {
      nextId.value = parseInt(idResult.value, 10)
    }
  }

  function addTask(name) {
    if (name === null || !name.trim()) {
      return
    }

    tasks.value.push({ 
      id: nextId.value++, 
      name: name,
      done: false,
      photo: null,
    })

    saveTasks()

  }

  function toggleTask(id) {
    console.log("hello!")
    console.log(Preferences.get({key:STORAGE_KEY}))
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id == id) {
        tasks.value[i].done = !tasks.value[i].done
        saveTasks()
        return
      }
    }
  }

  function removeTask(id) {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id == id) {
        tasks.value.splice(i, 1)
        saveTasks()
        return
      }
    }
  }

  function addPhotoToTask(id, path) {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id == id) {
        tasks.value[i].photo = path
        saveTasks()
        return
      }
    }
  }

  return { tasks, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask, addPhotoToTask, saveTasks, loadTasks }
})
