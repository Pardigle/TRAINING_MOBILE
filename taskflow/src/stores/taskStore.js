import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {

  const tasks = ref([])
  const nextId = ref(1)

  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter(task => task.done).length)
  const pendingCount = computed(() => totalCount.value - doneCount.value)

  function addTask(name) {
    if (name === null || !name.trim()) {
      return
    }

    tasks.value.push({ 
      id: nextId.value++, 
      name: name,
      done: false 
    })
  }

  addTask('Sleep')
  addTask('Eat')
  addTask('Sleep even more')

  function toggleTask(id) {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id == id) {
        tasks.value.done = !tasks.value.done
        return
      }
    }
  }

  function removeTask(id) {
    for (let i = 0; i < tasks.value.length; i++) {
      if (tasks.value[i].id == id) {
        tasks.value.splice(i, 1)
        return
      }
    }
  }

  return { tasks, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask }
})
