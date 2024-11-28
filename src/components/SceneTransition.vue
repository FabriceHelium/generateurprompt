<script setup lang="ts">
import { computed } from 'vue';
import type { Scene } from '../types/prompt';
import { generateTransition } from '../utils/promptGenerator';

const props = defineProps<{
  previousScene?: Scene;
  currentScene: Scene;
}>();

const transitionText = computed(() => {
  if (!props.previousScene) return '';
  return generateTransition(props.previousScene, props.currentScene);
});
</script>

<template>
  <div v-if="transitionText" class="text-sm text-gray-600 italic mb-4">
    {{ transitionText }}
  </div>
</template>