<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Task {{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-back-button default-href="/tabs/tasks"></ion-back-button>
        <ion-toolbar>
          <ion-title size="large"> Task {{ $route.params.id }} </ion-title>
        </ion-toolbar>
      </ion-header>
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonBackButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useTaskStore } from '@/stores/taskStore.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const taskStore = useTaskStore();
const route = useRoute();

const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)))
</script>
