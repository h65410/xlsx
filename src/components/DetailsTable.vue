<template>
  <q-table
    title="التفاصيل"
    :columns="columns"
    :rows="props.rows"
    row-key="name"
    dir="rtl"
    separator="cell"
    hide-bottom
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
    label: 'التحويلة',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
  },
  {
    name: 'answered',
    label: 'تم الرد',
    align: 'center',
    field: 'answered'
  },
  {
    name: 'no_answer',
    label: 'لم يتم الرد',
    align: 'center',
    field: 'no_answer'
  },
  {
    name: 'busy',
    label: 'مشغول',
    align: 'center',
    field: 'busy'
  },
  {
    name: 'busy2',
    label: 'مشغول2',
    align: 'center',
    field: 'busy2'
  },
]
</script>
