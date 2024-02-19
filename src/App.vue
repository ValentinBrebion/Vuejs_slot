<template>
  <div>
    <ModalView :showModal="openDetailsModal" @close="toggleDetailsModal">
      <template #title>Utilisateur</template>
      <p v-if="selectedPeople">{{ selectedPeople.name }}</p>
      <template #actions>
        <button class="btn btn-ghost" @click="toggleDetailsModal">Fermer</button>
      </template>
    </ModalView>

    <ModalView :showModal="openMessageModal" @close="toggleMessageModal">
      <template #title>Mes messages</template>
      {{ selectedPeople?.message }}
    </ModalView>

    <PeopleTable :items="people" :columns="columns">
      <template #isActive="{ people }">
        <div
          class="badge badge-md"
          :class="{ 'badge-success': people.isActive, 'badge-error': !people.isActive }"
        ></div>
      </template>
      <template #actions="{ item }">
        <div class="flex items-center gap-2">
          <button class="btn btn-ghost btn-sm" @click="toggleDetailsModal(item)">Details</button>
          <button class="btn btn-ghost btn-square btn-sm" @click="toggleMessageModal(item)">
            <IconMessage></IconMessage>
          </button>
        </div>
      </template>
    </PeopleTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ModalView from '../src/components/slots/TheModal.vue';
import PeopleTable from '../src/components/PeopleTable.vue';
import IconMessage from '@/components/icons/IconMessage.vue';
import getPeople from '@/services/api.service.js';

const people = ref([]);
const openDetailsModal = ref(false);
const openMessageModal = ref(false);
const selectedPeopleId = ref(null);

async function fetchPeople() {
  try {
    const response = await getPeople();
    people.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des personnes:', error);
  }
}

function toggleDetailsModal(item) {
  openDetailsModal.value = !openDetailsModal.value;
  selectedPeopleId.value = item;
}

function toggleMessageModal(item) {
  openMessageModal.value = !openMessageModal.value;
  selectedPeopleId.value = item;
}
const selectedPeople = computed(() =>
  people.value.find((person) => person.guid === selectedPeopleId.value)
);

const columns = [
  { "name": "name", "label": "Nom" },
  { "name": "isActive", "label": "Statut" },
  { "name": "company", "label": "Entreprise" },
  { "name": "id", "label": "guid" }
];

fetchPeople();
</script>
