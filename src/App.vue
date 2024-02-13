<script setup>
import { ref } from 'vue'
 import ModalView from '../src/components/slots/TheModal.vue'
 const showModalHello = ref(false)
 const showModalBy = ref(false)
</script>

<template>
  <ModalView :showModal="showModalHello" @close="showModalHello = false">
    <template v-slot:title>Hello</template>
    <p class="py-4">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, rem nihil. Ullam
    placeat natus aliquam, molestias cumque, ipsam praesentium sint culpa animi voluptatibus
    itaque libero debitis aliquid laudantium nam quam!
  </p>
  </ModalView>
  <ModalView :showModal="showModalBy" @close="showModalBy = false">
    <template v-slot:title>Aurevoir</template>
    <img src="./assets/bye.gif" alt="Cat say bye" />
  </ModalView>
  <button class="btn btn-primary" @click="showModalHello = true">Dites bonjour 👋</button>
  <button class="btn btn-primary" @click="showModalBy = true">Dites aurevoir 👋</button>
 
 
</template>
