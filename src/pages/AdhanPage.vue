<template>
  <q-page class="row justify-center items-center">
    <q-card class="q-pa-lg text-subtitle1" dir="ltr">
      <q-date v-model="d" dir="rtl" minimal />
      <p class="text-h6">{{ date.formatDate(prayerTimes.date, "YYYY-MM-DD dddd") }}</p>
      <div>Fajr: {{ date.formatDate(prayerTimes.fajr, "HH:mm") }}</div>
      <div>Sunrise: {{ date.formatDate(prayerTimes.sunrise, "HH:mm") }}</div>
      <div>Dhuhr: {{ date.formatDate(prayerTimes.dhuhr, "HH:mm") }}</div>
      <div>Asr: {{ date.formatDate(prayerTimes.asr, "HH:mm") }}</div>
      <div>Maghrib: {{ date.formatDate(prayerTimes.maghrib, "HH:mm") }}</div>
      <div>Isha: {{ date.formatDate(prayerTimes.isha, "HH:mm") }}</div>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { date } from 'quasar';

const d = ref(date.formatDate(new Date(), "YYYY-MM-DD"))
const coordinates = new Coordinates(24.68773, 46.72185);
const params = CalculationMethod.UmmAlQura();
params.fajrAngle = 18.4
params.methodAdjustments.sunrise = -1
params.rounding = 'up'
const prayerTimes = computed(() => new PrayerTimes(coordinates, new Date(d.value), params))
console.log(prayerTimes.value)
</script>

