<template>
    <div class="modal" :class="{ 'modal-open': props.showModal }">
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="emit('close')"
        >
          ✕
        </button>-
      </form>
      <h3 class="font-bold text-lg"><slot name="title"></slot></h3>

      <p class="py-4">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    showModal : {
        type: Boolean
    }
})
const emit = defineEmits(['close'])
</script>