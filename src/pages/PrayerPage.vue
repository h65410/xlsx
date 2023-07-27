<template>
  <q-page class="row justify-center items-center">
    <q-spinner-pie
      v-if="!store.date"
      color="primary"
      size="4em"
    />
    <div class="col-12 text-center text-h5 text-grey">
      <div>{{ store.day }}</div>
      {{ store.date }}
    </div>
    <q-card v-for="p in store.prayers" class="q-ma-md q-pa-sm text-subtitle1">
      {{ $t(p.label) }}: {{ p.start }} - {{ p.end }}
    </q-card>
  </q-page>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { usePrayerStore } from 'src/stores/prayer/prayer';

const store = usePrayerStore()

  // const file = ref(null)

  onBeforeMount(() => store.init())
</script>
