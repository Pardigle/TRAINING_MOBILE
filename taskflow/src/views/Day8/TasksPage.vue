<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>📝 Tasks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
        <ion-card-title> Progress </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }} 
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-item>
          <ion-input label="Task Name" v-model="newTaskName" placeholder="New task..." @keyup.enter="handleAdd" />
        </ion-item>
      </ion-card>

      <ion-fab vertical="bottom" horizontal="end">
        <ion-fab-button size="small" @click="handleAdd">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-list class="task-list">
        <ion-item class="task-item" v-for="task in tasks" button detail>
          <ion-checkbox v-model="task.done" @change="toggleTask(task.id)"></ion-checkbox>
          <ion-img class="thumbnail" v-if="task.photo" :src="task.photo"></ion-img>
          <ion-label :class="{ 'done': task.done }" @click="handleTaskTab(task.id)"> {{ task.name }} </ion-label>
          <ion-icon :icon="trashOutline" @click="removeTask(task.id)"></ion-icon>
        </ion-item>
        <ion-item v-if="tasks.length < 1">
          <ion-text>
            No added tasks yet! 
          </ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCheckbox, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonList,
  IonFab,
  IonLabel,
  IonFabButton,
  IonIcon,
  IonButton,
  IonFabList,
  IonText,
  IonImg, } from '@ionic/vue';
import { addOutline, trash, trashOutline } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore.js';
import { useRouter } from 'vue-router';

const newTaskName = ref('');
const taskStore = useTaskStore();
const router = useRouter()

const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore);
const { addTask, toggleTask, removeTask } = taskStore

function handleAdd() {
  addTask(newTaskName.value)
  newTaskName.value = ''
}

function handleTaskTab(id) {
  router.push(`/tabs/tasks/${id}`)
}
</script>

<style>

.done { text-decoration: line-through; color: #9ca3af; }

.thumbnail {
  max-width: 30px;
  max-height: 30px;
  overflow: hidden;
}
</style>
