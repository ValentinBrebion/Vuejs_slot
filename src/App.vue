<script setup>
import { ref , computed} from 'vue'
 import ModalView from '../src/components/slots/TheModal.vue'
 import PeopleTable from '../src/components/PeopleTable.vue'
 import getPeople from '@/services/api.service.js'
 const showModalHello = ref(false)
 const showModalBy = ref(false)
 const people = ref([])
 const openDetailsModal = ref(false)
const openMessageModal = ref(false)
const selectedPeopleId = ref()
const selectedPeople = computed(() =>
  people.value.find((people) => people.guid === selectedPeopleId.value)
)

function toggleDetailsModal(id) {
  openDetailsModal.value = !openDetailsModal.value
  selectedPeopleId.value = id
}

function toggleMessageModal(id) {
  openMessageModal.value = !openMessageModal.value
  selectedPeopleId.value = id
}


 async function fetchPeople() {
        try {
            const response = await getPeople();
            people.value = response.data;
            console.log(people)
        } catch (error) {
            console.error('Erreur lors de la récupération des peoples:', error)
        }
    }
    const columns = [
  {
    "name": "name",
    "label": "Nom"
  },
  {
    "name": "isActive",
    "label": "Statut"
  },
  {
    "name": "company",
    "label": "Entreprise"
  }
];

  fetchPeople()
</script>
<template>
  <PeopleTable :items="people" :columns="columns">
    <template #isActive="{ people }">
        <div
      class="badge badge-md"
      :class="{ 'badge-success': people.isActive, 'badge-error': !people.isActive }"
    ></div>
    </template>
    <template #actions="{ id }">
      <div class="flex items-center gap-2">
    <button class="btn btn-ghost btn-sm" @click="toggleDetailsModal(id)">Details</button>
    <button class="btn btn-ghost btn-square btn-sm" @click="toggleMessageModal(id)">
      <IconMessage></IconMessage>
    </button>
  </div>
  </template>
  </PeopleTable>

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
