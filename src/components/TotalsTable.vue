<template>
  <q-table
    :columns="columns"
    :rows="props.rows"
    dir="rtl"
    table-class="text-center"
    separator="cell"
    hide-bottom
    hide-header
    dense
    flat
    bordered
  />
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';

const props = defineProps({
  rows: null
})

const columns: QTableProps['columns'] = [
{
    name: 'name',
    label: 'name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`
  },
  {
    name: 'value',
    label: 'value',
    align: 'center',
    field: 'value',
    style: "padding: 0 16px"
  },
]
</script>
