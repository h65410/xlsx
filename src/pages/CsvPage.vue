<template>
  <q-page class="row justify-center items-start q-pa-md">
    <div v-if="data" class="col-12 q-px-lg" style="max-width: 700px">
      <div class="q-pb-sm">
        <q-table
          class="centared"
          :columns="totalsCols"
          :rows="totals"
          :rows-per-page-options="[0]"
          row-key="label"
          separator="cell"
          hide-bottom
          hide-header
          flat
          bordered
          dense
        />
      </div>
      <q-table
        class="centared"
        :rows="data"
        :rows-per-page-options="[0]"
        row-key="id"
        separator="cell"
        table-header-class="bg-grey"
      />
    </div>
    <div v-else>
      <q-file v-model="file" label="الملف . . ." accept=".csv" filled />
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Papa from "papaparse"
import { date } from 'quasar'
import P from "../assets/1445.json"

const file = ref(null)

const data = ref(null)

const totalsCols = [
  {name: 'p12', label: 'p12', field: 'value'},
  {name: 'p34', label: 'p12', field: 'value'},
]
const totals = computed(() => [
  {
    label: 'p12',
    value: data.value?.filter(v => ['1', '2'].includes(v['p'])).length || 0
  },
  {
    label: 'p34',
    value: data.value?.filter(v => ['3', '4'].includes(v['p'])).length || 0
  },
])

watch(file, (val) => {
  Papa.parse(val, {
    header: true,
    complete(results) {
      const d0 = results.data[0]['Start Time'].split(' ')[0].substring(0, 10)
      const pa = P[d0]
      const mStart = date.extractDate("9:00", "H:mm")
      const mEnd = date.extractDate("15:59", "H:mm")
      const eStart = date.extractDate("16:00", "H:mm")
      const eEnd = date.extractDate("22:59", "H:mm")
      const p1Start = date.extractDate(pa[4], "H:mm")
      const p1End = date.addToDate(p1Start, {minutes: 30})
      const p2Start = date.extractDate(pa[5], "H:mm")
      const p2End = date.addToDate(p2Start, {minutes: 30})
      const p3Start = date.extractDate(pa[6], "H:mm")
      const p3End = date.addToDate(p3Start, {minutes: 30})
      const p4Start = date.extractDate(pa[7], "H:mm")
      const p4End = date.addToDate(p4Start, {minutes: 30})
      const data0 = {}
      results.data
        .filter(v => ['1080', '1084'].includes(v['Dest Channel Extension']))
        .filter(v => v['Action Type'] == 'RINGGROUP[6405]')
        .forEach(v => {
        const id = v['Unique ID']
        const d = v['Start Time']
        if (!data0[id]) data0[id] = {id, d}
        data0[id][v['Dest Channel Extension']] = v['Disposition']
        const dd = date.extractDate(d.split(' ')[1].substring(0, 5), "HH:mm")
        if (date.isBetweenDates(dd, mStart, mEnd, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}))
        data0[id]['a'] = "am"
        if (date.isBetweenDates(dd, eStart, eEnd, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}))
        data0[id]['a'] = "pm"
        // p
        switch (true) {
          case date.isBetweenDates(dd, p1Start, p1End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
            data0[id]['p'] = '1'
            break;
          case date.isBetweenDates(dd, p2Start, p2End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
            data0[id]['p'] = '2'
            break;
          case date.isBetweenDates(dd, p3Start, p3End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
            data0[id]['p'] = '3'
            break;
          case date.isBetweenDates(dd, p4Start, p4End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
            data0[id]['p'] = '4'
            break;
          default:
          data0[id]['p'] = ''
        }
      })

      data.value = Object.values(data0)
        .filter(v => v['a'])
        .filter(v => !(v['1080'] == 'BUSY' && v['1084'] == 'BUSY'))
    }
  })
})

</script>

<style>
  .centared th, .centared td {
    text-align: center !important;
  }
</style>
