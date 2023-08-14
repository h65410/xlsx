<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-primary" dir="ltr" elevated>
      <q-toolbar>
        <div>
          <q-btn
            v-if="$route.path != '/'"
            class="fix1"
            label="رجوع"
            icon="arrow_back"
            @click="$router.replace('/')"
            flat
            dense
          />
          <q-btn
            v-else
            icon="settings"
            color="primary"
            size="sm"
            @click="$router.replace('/settings')"
            round
          />
        </div>

        <q-toolbar-title>
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <div>xlsx</div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="row justify-center bg-white q-pa-sm">
      <q-banner v-if="store.error" class="bg-red-2 text-negative" rounded>{{ store.error }}</q-banner>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app';

const store = useAppStore()

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>

<style>
  .fix1 span {
    padding-bottom: 2px;
  }
</style>
