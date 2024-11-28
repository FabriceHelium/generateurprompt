<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Scene } from './types/prompt';
import SceneCard from './components/SceneCard.vue';
import SceneTransition from './components/SceneTransition.vue';
import { defaultParameters } from './data/parameters';
import { generatePrompt } from './utils/promptGenerator';

const scenes = ref<Scene[]>([
  {
    id: '1',
    parameters: defaultParameters,
    generatedPrompt: '',
    storyDescription: ''
  }
]);

const updateScene = (sceneId: string, updatedScene: Scene) => {
  const index = scenes.value.findIndex(s => s.id === sceneId);
  if (index !== -1) {
    updatedScene.generatedPrompt = generatePrompt(updatedScene, scenes.value);
    scenes.value[index] = updatedScene;
    
    // Mettre à jour le prompt de la dernière scène si nécessaire
    if (scenes.value.length > 1 && index !== scenes.value.length - 1) {
      const lastScene = scenes.value[scenes.value.length - 1];
      lastScene.generatedPrompt = generatePrompt(lastScene, scenes.value);
    }
  }
};

const addScene = () => {
  const newId = (scenes.value.length + 1).toString();
  const previousScene = scenes.value[scenes.value.length - 1];
  
  const newScene = {
    id: newId,
    parameters: [...defaultParameters],
    generatedPrompt: '',
    storyDescription: '',
    previousSceneId: previousScene.id
  };
  
  scenes.value.push(newScene);
  previousScene.nextSceneId = newId;
  
  // Générer le prompt combiné pour la nouvelle scène
  newScene.generatedPrompt = generatePrompt(newScene, scenes.value);
};

const deleteScene = (sceneId: string) => {
  const index = scenes.value.findIndex(s => s.id === sceneId);
  if (index !== -1) {
    const scene = scenes.value[index];
    const previousScene = scenes.value.find(s => s.id === scene.previousSceneId);
    const nextScene = scenes.value.find(s => s.id === scene.nextSceneId);
    
    if (previousScene && nextScene) {
      previousScene.nextSceneId = nextScene.id;
      nextScene.previousSceneId = previousScene.id;
    } else if (previousScene) {
      previousScene.nextSceneId = undefined;
    } else if (nextScene) {
      nextScene.previousSceneId = undefined;
    }
    
    scenes.value = scenes.value.filter(s => s.id !== sceneId);
    
    // Mettre à jour le prompt de la dernière scène
    if (scenes.value.length > 0) {
      const lastScene = scenes.value[scenes.value.length - 1];
      lastScene.generatedPrompt = generatePrompt(lastScene, scenes.value);
    }
  }
};

const getPreviousScene = (sceneId: string) => {
  const index = scenes.value.findIndex(s => s.id === sceneId);
  return index > 0 ? scenes.value[index - 1] : undefined;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Générateur de Prompts Horrifiques</h1>
        <p class="text-gray-600">Créez des descriptions détaillées d'entités surnaturelles et de scènes cosmiques</p>
      </div>

      <div class="space-y-6">
        <template v-for="scene in scenes" :key="scene.id">
          <SceneTransition
            :previous-scene="getPreviousScene(scene.id)"
            :current-scene="scene"
          />
          <SceneCard
            :scene="scene"
            :is-last-scene="scene.id === scenes[scenes.length - 1].id"
            @update:scene="(updatedScene) => updateScene(scene.id, updatedScene)"
            @delete="deleteScene(scene.id)"
          />
        </template>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          @click="addScene"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Ajouter une Nouvelle Scène
        </button>
      </div>
    </div>
  </div>
</template>