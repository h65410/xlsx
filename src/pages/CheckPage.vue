<template>
  <q-page class="row justify-center items-start q-pa-md">
    <div class="col-12">
      <q-table
        class="centared"
        :columns="columns"
        :rows="rows"
        :rows-per-page-options="[0]"
        row-key="id"
        separator="cell"
        table-header-class="bg-grey"
        dense
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useCentralStore } from "../stores/central/index"
import { useRouter } from "vue-router"

const store = useCentralStore()
const router = useRouter()

const rows = computed(() => {
  const r = []
  store.data.forEach(v => {
    r.push({
      "date": v['date'],
      "day": v['day'],
      "MA": v['M']['A'],
      "MN": v['M']['N'],
      "MAN": v['M']['AN'],
      "MP": v['M']['P'],
      "MA80": v['M']['A80'],
      "MN80": v['M']['N80'],
      "MRB80": v['M']['RB80'],
      "MGB80": v['M']['GB80'],
      "MA84": v['M']['A84'],
      "MN84": v['M']['N84'],
      "MRB84": v['M']['RB84'],
      "MGB84": v['M']['GB84'],
      "EA": v['E']['A'],
      "EN": v['E']['N'],
      "EAN": v['E']['AN'],
      "EP": v['E']['P'],
      "EA80": v['E']['A80'],
      "EN80": v['E']['N80'],
      "ERB80": v['E']['RB80'],
      "EGB80": v['E']['GB80'],
      "EA84": v['E']['A84'],
      "EN84": v['E']['N84'],
      "ERB84": v['E']['RB84'],
      "EGB84": v['E']['GB84'],
    })
  })
  return r
})

const columns = [
  {name: 'date', label: 'date', field: 'date', sortable: true},
  {name: 'day', label: 'day', field: 'day'},
  {name: 'MA', label: 'MA', field: 'MA'},
  {name: 'MN', label: 'MN', field: 'MN'},
  {name: 'MAN', label: 'MAN', field: 'MAN'},
  {name: 'MP', label: 'MP', field: 'MP'},
  {name: 'MA80', label: 'MA80', field: 'MA80'},
  {name: 'MN80', label: 'MN80', field: 'MN80'},
  {name: 'MRB80', label: 'MRB80', field: 'MRB80'},
  {name: 'MGB80', label: 'MGB80', field: 'MGB80'},
  {name: 'MA84', label: 'MA84', field: 'MA84'},
  {name: 'MN84', label: 'MN84', field: 'MN84'},
  {name: 'MRB84', label: 'MRB84', field: 'MRB84'},
  {name: 'MGB84', label: 'MGB84', field: 'MGB84'},
  {name: 'EA', label: 'EA', field: 'EA'},
  {name: 'EN', label: 'EN', field: 'EN'},
  {name: 'EAN', label: 'EAN', field: 'EAN'},
  {name: 'EP', label: 'EP', field: 'EP'},
  {name: 'EA80', label: 'EA80', field: 'EA80'},
  {name: 'EN80', label: 'EN80', field: 'EN80'},
  {name: 'ERB80', label: 'ERB80', field: 'ERB80'},
  {name: 'EGB80', label: 'EGB80', field: 'EGB80'},
  {name: 'EA84', label: 'EA84', field: 'EA84'},
  {name: 'EN84', label: 'EN84', field: 'EN84'},
  {name: 'ERB84', label: 'ERB84', field: 'ERB84'},
  {name: 'EGB84', label: 'EGB84', field: 'EGB84'},
]

onBeforeMount(() => {
  if (store.data.length < 1) router.replace("/")
})
</script>

<style>
  .centared th, .centared td {
    text-align: center !important;
  }
</style>
