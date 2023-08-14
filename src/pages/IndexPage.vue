<template>
  <q-page class="q-pt-lg q-px-sm">
    <div v-if="!store.files[0]" class="row justify-center">
      <q-file v-model="store.files[0]" label="تحميل الملف" accept=".csv" style="width: 99px;" filled />
    </div>
    <div v-else class="row justify-center">
      <q-spinner-hourglass
        color="primary"
        size="3em"
      />
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, watch } from "vue"
import { useRouter } from "vue-router"
import { useCentralStore } from "../stores/central/index"

const store = useCentralStore()
const router = useRouter()

watch(() => store.files[0], (val) => {
  if (val) store.parseFile()
})
watch(() => store.processing, (val) => {
  if (!val && store.data[0]) router.replace("/central")
})

onBeforeMount(() => store.$reset())
</script>

<style>
.q-table th, .q-table td:first-child {
    font-weight: bold;
    font-size: 14px;
}
</style>
