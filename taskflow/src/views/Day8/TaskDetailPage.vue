<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks"></ion-back-button>
        </ion-buttons>
        <ion-title>Task {{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="task">
        <div>
          <ion-text>ID: {{ task.id }}</ion-text>
        </div>
        <div>
          <ion-text>Name: {{ task.name }}</ion-text>
        </div>
        <div>
          <ion-text>Done:</ion-text>
          <ion-text v-if="task.done"> Done</ion-text>
          <ion-text v-else> Not Done</ion-text>
        </div>
        <div>
          <ion-button @click="handleAddPhoto(task.id)">
            <ion-icon :icon="cameraOutline"></ion-icon>
          </ion-button>
        </div>
        <div v-if="task.photo">
          <ion-img :src="task.photo"></ion-img>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonText, 
  IonBackButton, 
  IonIcon,
  IonImg,
  IonButtons
} from '@ionic/vue';
import { cameraOutline } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useTaskStore } from '@/stores/taskStore.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Camera, CameraSource, CameraDirection, CameraResultType } from '@capacitor/camera';

const taskStore = useTaskStore();
const route = useRoute();
const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)))

async function handleAddPhoto(id) {
  console.log("hello")
  const result = await Camera.takePhoto({
    quality: 90,
    editable: 'in-app',
    cameraDirection: CameraDirection.Rear,
    targetWidth: 1280,
    targetHeight: 720,
  });
  taskStore.addPhotoToTask(id, result.webPath)
}
</script>
