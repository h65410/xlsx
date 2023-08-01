<template>
  <q-page class="row justify-center items-center">
    <q-card class="q-pa-lg text-subtitle1" dir="ltr">
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
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { date } from 'quasar';


const coordinates = new Coordinates(24.6537, 46.7152);
const params = CalculationMethod.UmmAlQura();
params.rounding = 'up'
const date0 = new Date();
const prayerTimes = new PrayerTimes(coordinates, date0, params);
</script>
