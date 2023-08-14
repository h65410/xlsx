<template>
  <div class="q-ma-sm">
    <q-card style="width: 300px;">
    <q-card-section>
      <div class="text-center text-h6 q-pb-sm">اوقات دوام {{ title }}</div>
      <div v-for="k in ['M', 'E']" class="row justify-between">
        <div class="col-6 q-pa-sm">
          <div class="text-subtitle1">{{ duty[k]['startLabel'] }}</div>
        <q-input
          v-model="duty[k]['start']"
          mask="time"
          :rules="['time']"
          hide-hint
          hide-bottom-space
          filled
          dense
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="duty[k]['start']" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        </div>
        <div class="col-6 q-pa-sm">
          <div class="text-subtitle1">{{ duty[k]['endLabel'] }}</div>
        <q-input
        v-model="duty[k]['end']"
        mask="time"
        :rules="['time']"
        hide-hint
        hide-bottom-space
        filled
        dense
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="duty[k]['end']" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        </div>
     </div>
    </q-card-section>
    <q-card-actions class="justify-center q-pt-lg">
      <q-btn class="col-6" label="حفظ" color="primary" @click="store.saveDuty(dn)" />
    </q-card-actions>
  </q-card>
  </div>
</template>

<script setup>
import { useCentralStore } from "../../stores/central/index"

const store = useCentralStore()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  dn: {
    type: Number,
    required: true,
  },
})

const duty = store[`duty${props.dn}`]

</script>
