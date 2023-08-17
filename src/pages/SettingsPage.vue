<template>
  <q-page class="row justify-start items-start q-pa-md">
    <Duty title="الاسبوع" :dn="0" />
    <Duty title="الجمعة" :dn="5" />
    <Duty title="السبت" :dn="6" />
    <Settings />
    <ReportList />
  </q-page>
</template>

<script setup>
import Duty from "../components/settings/Duty.vue";
import Settings from "../components/settings/Settings.vue";
import ReportList from "../components/settings/ReportList.vue";
</script>
