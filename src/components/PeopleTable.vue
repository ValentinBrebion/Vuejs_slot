<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <div class="icon">
        <button @click="setModeCollapse">
          <IconCollapse></IconCollapse>
        </button>
        <button  @click="setModeCompact">
          <IconExpand></IconExpand>
        </button>
      </div>
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column.name">
            <slot :name="`header-${column.name}`">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <!-- body -->
      <tbody>
        <tr v-for="item in props.items" :key="item.id">
          <td v-for="column in props.columns" :key="column.name">
            <slot :name="column.name" :people="item">
              <div v-if="column.label === 'Nom'">
                <div v-if='mode === "compact"'>
                  <p>{{ item.name }}</p>
                </div>
                <div v-else-if="mode === 'collapse'">
                  <figure class="icon">
                    <img :src="item.picture">
                    <figcaption class="detail">
                      <p>{{ item.email }}</p>
                      <p>{{ item.phone }}</p>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div v-else>
                {{ item[column.name] }}
              </div>
            </slot>
          </td>
          <td>
            <slot name="actions" :item="item.guid"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import IconCollapse from './icons/IconCollapse.vue';
import IconExpand from './icons/IconExpand.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
});

const mode = ref('collapse');

function setModeCollapse() {
  mode.value = 'collapse';
}

function setModeCompact() {
  mode.value = 'compact';
}
</script>

<style scoped>
.icon {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.detail {
  margin-left: 1rem;
}
</style>
