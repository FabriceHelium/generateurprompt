<script setup lang="ts">
import { computed } from 'vue';
import type { Scene, SceneTransition } from '../types/prompt';
import ParameterSelector from './ParameterSelector.vue';
import CopyButton from './CopyButton.vue';
import TransitionEditor from './TransitionEditor.vue';

const props = defineProps<{
  scene: Scene;
  isLastScene: boolean;
  previousScene?: Scene;
}>();

const emit = defineEmits<{
  (e: 'update:scene', value: Scene): void;
  (e: 'delete'): void;
}>();

const defaultTransition: SceneTransition = {
  type: 'évolue',
  speed: 'progressivement',
  style: 'dans un tourbillon de',
  intensity: 'ténèbres'
};

const updateParameter = (parameterId: string, value: string) => {
  const updatedScene = {
    ...props.scene,
    parameters: props.scene.parameters.map(param =>
      param.id === parameterId
        ? { ...param, selected: value }
        : param
    )
  };
  emit('update:scene', updatedScene);
};

const updateTransition = (transition: SceneTransition) => {
  emit('update:scene', {
    ...props.scene,
    transition
  });
};

const updateStoryDescription = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  const updatedScene = {
    ...props.scene,
    storyDescription: textarea.value
  };
  emit('update:scene', updatedScene);
};

const generatedPrompt = computed(() => props.scene.generatedPrompt);
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900">
        Scène {{ scene.id }}
        <span v-if="isLastScene" class="text-sm font-normal text-indigo-600 ml-2">
          (Prompt complet disponible ici)
        </span>
      </h3>
      <button
        @click="emit('delete')"
        class="text-red-600 hover:text-red-800 transition-colors"
      >
        Supprimer
      </button>
    </div>
    
    <div class="grid gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Description de l'Histoire
        </label>
        <textarea
          :value="scene.storyDescription"
          @input="updateStoryDescription"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Décrivez le contexte et l'ambiance de votre histoire..."
        ></textarea>
      </div>

      <div v-if="previousScene" class="space-y-2">
        <TransitionEditor
          :model-value="scene.transition || defaultTransition"
          @update:model-value="updateTransition"
        />
      </div>

      <div v-for="param in scene.parameters" :key="param.id" class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ param.name }}
        </label>
        <ParameterSelector
          :parameter="param"
          @update:selected="(value) => updateParameter(param.id, value)"
        />
      </div>
    </div>

    <div class="mt-6">
      <div class="flex justify-between items-center mb-2">
        <h4 class="text-sm font-medium text-gray-700">
          {{ isLastScene ? 'Prompt Complet:' : 'Prompt Généré:' }}
        </h4>
        <CopyButton :text="generatedPrompt" />
      </div>
      <div class="bg-gray-50 p-4 rounded-md">
        <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ generatedPrompt }}</p>
      </div>
    </div>
  </div>
</template>