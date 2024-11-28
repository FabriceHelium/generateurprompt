<script setup lang="ts">
import { ref } from 'vue';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  text: string;
}>();

const copied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Erreur lors de la copie:', err);
  }
};
</script>

<template>
  <button
    @click="copyToClipboard"
    class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
    :title="copied ? 'Copié !' : 'Copier le prompt'"
  >
    <span v-if="!copied">
      <ClipboardDocumentIcon class="h-4 w-4 mr-1" />
      Copier
    </span>
    <span v-else class="text-green-600">
      <CheckIcon class="h-4 w-4 mr-1" />
      Copié !
    </span>
  </button>
</template>