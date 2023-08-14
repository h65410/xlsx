<template>
  <q-table
    class="centared"
    title="التفاصيل"
    :rows="details"
    dir="rtl"
    separator="cell"
    hide-bottom
    dense
    flat
    bordered
  />
</template>

<script setup lang="ts">
import { useCentralStore } from '../stores/central';
import { computed } from 'vue';

const store = useCentralStore()


const props = defineProps({
  k: {
    type: String,
    required: true,
  }
})

const details = computed(() => {
  const rows = [
    {
      "التحويلة": '1080',
      "الموظف": store.emp[props.k]['1080'],
      "تم الرد": store.data[0][props.k]['A80'],
      "لم يتم الرد": store.data[0][props.k]['N80'],
      "مشغول": store.data[0][props.k]['RB80'],
      "مشغول2": store.data[0][props.k]['GB80'],

    },
    {
      "التحويلة": '1084',
      "الموظف": store.emp[props.k]['1084'],
      "تم الرد": store.data[0][props.k]['A84'],
      "لم يتم الرد": store.data[0][props.k]['N84'],
      "مشغول": store.data[0][props.k]['RB84'],
      "مشغول2": store.data[0][props.k]['GB84'],

    },
  ]

  if (store.emp.withEmp) {
    return rows
  } else {
    return rows.map(v => {
      delete v["الموظف"]
      return v
    })
  }
})
</script>

<style>
  .centared th, .centared td {
    text-align: center !important;
  }
  .centared .q-table__sort-icon {
    display: none;
  }
</style>
