<template>
  <q-page class="row justify-start items-start q-pa-md">
    <Duty title="الاسبوع" :dn="0" />
    <Duty title="الجمعة" :dn="5" />
    <Duty title="السبت" :dn="6" />
    <Employees />
    <Buttons />
  </q-page>
</template>

<script setup>
import Duty from "../components/settings/Duty.vue";
import Employees from "../components/settings/Employees.vue";
import Buttons from "../components/settings/Buttons.vue";
</script>

