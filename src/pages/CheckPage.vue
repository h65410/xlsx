<template>
  <q-page class="row justify-center items-start q-pa-md">
    <div v-if="store.files.length > 0" class="col-12">
      <q-table
        class="centared"
        :columns="columns"
        :rows="store.checkData"
        :rows-per-page-options="[0]"
        row-key="id"
        separator="cell"
        table-header-class="bg-grey"
        dense
      />
    </div>
    <div v-else>
      <q-file v-model="store.files" label="الملفات . . ." accept=".csv" multiple filled />
    </div>
  </q-page>
</template>

<script setup>
import { watch } from 'vue'
import { useCentralStore } from "../stores/central/index"

const store = useCentralStore()

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

watch(() => store.files, () => store.parseFile())

</script>

<style>
  .centared th, .centared td {
    text-align: center !important;
  }
</style>
