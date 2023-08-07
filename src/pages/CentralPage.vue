<template>
  <q-page class="q-pt-lg">
    <div v-if="!store.data">
      <div v-if="!store.files[0]" class="row justify-center">
        <q-file v-model="store.files[0]" label="تحميل الملف" accept=".csv" style="width: 99px;" filled />
      </div>
      <div v-else class="row justify-center">
        <q-spinner-hourglass
          color="primary"
          size="3em"
        />
      </div>
    </div>
    <div v-else class="row justify-evenly">
      <div class="col-12 text-center text-h6 q-pb-lg q-mb-lg">{{ store.day }} {{ store.date.split('-').reverse().join('-') }}</div>
      <q-card class="col-4">
        <p class="q-pa-sm q-ma-none text-subtitle1">الفترة الصباحية [ من الساعة 9 صباحا وحتى الساعة 4 عصرا ]</p>
        <q-card-section class="q-pt-none">
          <div class="q-pb-xs">
            <TotalsTable :rows="MRows" />
          </div>
          <DetailsTable :rows="store.data['M']['details']" />
        </q-card-section>
      </q-card>
      <q-card class="col-4">
        <p class="q-pa-sm q-ma-none text-subtitle1">الفترة المسائية [ من الساعة 4 عصرا وحتى الساعة 11 مساء ]</p>
        <q-card-section class="q-pt-none">
          <div class="q-pb-xs">
            <TotalsTable :rows="ERows" />
          </div>
          <DetailsTable :rows="store.data['E']['details']" />
        </q-card-section>
      </q-card>
      <PdfButtons />
    </div>
    <div v-if="store.error" class="q-pa-md q-mt-md text-center text-white bg-red">
      {{ store.error }}
    </div>
  </q-page>
</template>

<script setup>
import { computed, watch } from "vue"
import { useCentralStore } from "../stores/central/index"
import TotalsTable from 'src/components/TotalsTable.vue'
import DetailsTable from 'src/components/DetailsTable.vue'
import PdfButtons from 'src/components/PdfButtons.vue'

const store = useCentralStore()

const MRows = computed(() => [
    {
      name: 'مجموع المكالمات التي تم الرد عليها',
      value: store.data['M']['A']
    },
    {
      name: 'مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )',
      value: store.data['M']['N']
    },
    {
      name: 'مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )',
      value: store.data['M']['AN']
    },
    {
      name: 'عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]',
      value: store.data['M']['P']
    },
  ]
)

const ERows = computed(() => [
    {
      name: 'مجموع المكالمات التي تم الرد عليها',
      value: store.data['E']['A']
    },
    {
      name: 'مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )',
      value: store.data['E']['N']
    },
    {
      name: 'مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )',
      value: store.data['E']['AN']
    },
    {
      name: 'عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]',
      value: store.data['E']['P']
    },
  ]
)

watch(() => store.files[0], () => store.parseFile())
</script>

<style>
.q-table th, .q-table td:first-child {
    font-weight: bold;
    font-size: 14px;
}
</style>
