<template>
  <div class="q-ma-sm">
    <q-card style="width: 300px;">
    <q-card-section>
      <div class="text-center text-h6 q-pb-sm">اسماء الموظفين</div>
      <div v-for="k in ['M', 'E']" class="row justify-between">
        <div class="col-6 q-pa-sm">
          <div class="text-subtitle1">{{ store.emp[k]['label'] }} 1080</div>
        <q-input
        v-model="store.emp[k]['1080']"
        hide-hint
        hide-bottom-space
        filled
        dense
         />
        </div>
        <div class="col-6 q-pa-sm">
          <div class="text-subtitle1">{{ store.emp[k]['label'] }} 1084</div>
        <q-input
        v-model="store.emp[k]['1084']"
        hide-hint
        hide-bottom-space
        filled
        dense
         />
        </div>
     </div>
     <div class="q-mt-md">
        <q-checkbox v-model="store.emp.withEmp" label="عرض اسماء الموظفين في التقارير" />
      </div>
    </q-card-section>
    <q-card-actions class="justify-center">
      <q-btn class="col-6" label="حفظ" color="primary" @click="store.saveEmp()" />
    </q-card-actions>
  </q-card>
  </div>
</template>

<script setup>
import { useCentralStore } from "../../stores/central/index"

const store = useCentralStore()
</script>
