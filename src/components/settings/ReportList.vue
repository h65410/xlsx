<template>
  <div class="q-ma-sm">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-center text-h6 q-pb-sm">التقارير</div>
        <q-file
          v-model="store.files"
          label="الملفات . . ."
          accept=".csv"
          multiple
          filled
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useCentralStore } from "../../stores/central/index";
import { useRouter } from "vue-router";
import { downloadPdf } from "../PDFCheckReport";

const store = useCentralStore();
const router = useRouter();

watch(
  () => store.files,
  (val) => {
    if (val) store.parseFile();
  }
);

watch(
  () => store.data,
  (val) => {
    downloadPdf();
    // if (val) router.replace("/check")
  }
);
</script>
