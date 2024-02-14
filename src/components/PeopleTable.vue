<template>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th v-for="column in props.columns" :key="column.name">
                <slot :name="`header-${column.name}`">
                    {{ column.label }}
                </slot>
                </th>
                    <!-- Actions column-->
                    <th>
                        <slot name="actions" :id="item.guid"></slot>
                    </th>
            </tr>
        </thead>
        <!-- body -->
        <tbody>
            <tr v-for="item in props.items" :key="item.id">
                <td v-for="column in props.columns" :key="column.name">
                        <slot :name="column.name" :people="item">
                            {{ item[column.name] }}
                        </slot>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
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
  </script>
  
  <style scoped>
  .displaytab {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  </style>
  