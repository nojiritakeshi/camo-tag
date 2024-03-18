<script setup lang="ts">
import { ref } from 'vue'
import { Camo } from 'camo-tag/packages/vue/src'
const isOnly = ref(true)
const isAll = ref(false)
const btnColor = ref<'red' | 'blue'>('red')
</script>

<template>
  <div style="margin-bottom: 24px">
    <Camo as="main" :is-only="isOnly">
      <h1>Home</h1>
      <p>Hoge</p>
      <div :is-only="isOnly">
        <h2 style="color: red">Sub Title</h2>
        <TestComponent />
      </div>
    </Camo>
    <p v-if="isOnly">Gooodd</p>
    <v-btn @click="isOnly = !isOnly" :color="btnColor">Toggle</v-btn>
  </div>
  <Camo as="main" :is-all="isAll">
    <h1>Home</h1>
    <p>Hoge</p>
    <div :is-survivor="true">
      <h2 style="color: red">Sub Title</h2>
      <TestComponent @click="() => (isAll = !isAll)" />
    </div>
  </Camo>
</template>
