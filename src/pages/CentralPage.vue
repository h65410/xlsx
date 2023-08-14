<template>
  <q-page class="q-pt-lg q-px-sm">
    <div v-if="store.data[0]" class="row justify-evenly">
      <div class="col-12 text-center text-h6 q-pb-lg q-mb-lg">
        {{ store.data[0]['day'] }} {{ store.data[0]['date'].split('-').reverse().join('-') }}
      </div>
      <q-card v-for="k in keys" class="col-4">
        <q-card-section>
          <p class="q-ma-none text-subtitle1">{{ store.data[0][k]['title'] }}</p>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-pb-xs">
            <TotalsTable :rows="rows[k]" />
          </div>
          <DetailsTable :k="k.toString()" />
        </q-card-section>
      </q-card>
      <div class="col-12 q-pt-lg">
        <div class="row justify-center q-gutter-md">
          <div class="col-auto">[ مفقود80: {{ store.data[0].lost["1080"] }} ]</div>
          <div class="col-auto">[ مفقود84: {{ store.data[0].lost["1084"] }} ]</div>
        </div>
      </div>
      <PdfButtons />
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeMount } from "vue"
import { useCentralStore } from "../stores/central/index"
import { useRouter } from "vue-router"
import TotalsTable from 'src/components/TotalsTable.vue'
import DetailsTable from 'src/components/DetailsTable.vue'
import PdfButtons from 'src/components/PdfButtons.vue'

const store = useCentralStore()
const router = useRouter()

const keys = ['M', 'E']

const rows = computed(() => {
  const obj = {}
  keys.forEach(k => obj[k] = [
    {
      name: 'مجموع المكالمات التي تم الرد عليها',
      value: store.data[0][k]['A']
    },
    {
      name: 'مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )',
      value: store.data[0][k]['N']
    },
    {
      name: 'مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )',
      value: store.data[0][k]['AN']
    },
    {
      name: 'عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]',
      value: store.data[0][k]['P']
    },
  ])

  return obj
})

onBeforeMount(() => {
  if (!store.data[0]) router.replace("/")
})
</script>

<style>
.q-table th, .q-table td:first-child {
    font-weight: bold;
    font-size: 14px;
}
</style>
