<script setup lang="ts">
import { computed } from 'vue';
import type { SceneTransition } from '../types/prompt';
import { transitionParameters } from '../data/parameters/transitions';
import ParameterSelector from './ParameterSelector.vue';

const props = defineProps<{
  modelValue: SceneTransition;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: SceneTransition): void;
}>();

const updateTransition = (key: keyof SceneTransition, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  });
};

const parameters = computed(() => [
  {
    id: 'type',
    name: transitionParameters.types.name,
    options: transitionParameters.types.options,
    selected: props.modelValue.type
  },
  {
    id: 'speed',
    name: transitionParameters.speeds.name,
    options: transitionParameters.speeds.options,
    selected: props.modelValue.speed
  },
  {
    id: 'style',
    name: transitionParameters.styles.name,
    options: transitionParameters.styles.options,
    selected: props.modelValue.style
  },
  {
    id: 'intensity',
    name: transitionParameters.intensities.name,
    options: transitionParameters.intensities.options,
    selected: props.modelValue.intensity
  }
]);
</script>

<template>
  <div class="bg-gray-50 p-4 rounded-lg space-y-4">
    <h4 class="font-medium text-gray-900">Personnalisation de la Transition</h4>
    <div class="grid gap-4 sm:grid-cols-2">
      <div v-for="param in parameters" :key="param.id">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ param.name }}
        </label>
        <ParameterSelector
          :parameter="param"
          @update:selected="(value) => updateTransition(param.id as keyof SceneTransition, value)"
        />
      </div>
    </div>
    <div class="mt-4 text-sm text-gray-600 italic">
      Aperçu : La scène {{ modelValue.type }} {{ modelValue.speed }}, {{ modelValue.style }} {{ modelValue.intensity }}...
    </div>
  </div>
</template>