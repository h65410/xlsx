<template>
  <div class="q-ma-sm">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-center text-h6 q-pb-sm">الاعدادات</div>
        <div class="q-mt-md">
          <q-checkbox
            v-model="store.settings.withEmp"
            label="عرض اسماء الموظفين في التقارير"
          />
        </div>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn
          class="col-6"
          label="حفظ"
          color="primary"
          @click="store.saveSettings()"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useCentralStore } from "../../stores/central/index";

const store = useCentralStore();
</script>
