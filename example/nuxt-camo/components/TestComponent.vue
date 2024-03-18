<script setup lang="ts">
const isOnly = ref(true)
const btnColor = ref<'red' | 'blue'>('red')
const emits = defineEmits(['click'])

const BClick = () => {
  if (btnColor.value === 'red') {
    btnColor.value = 'blue'
  } else {
    btnColor.value = 'red'
  }
  emits('click')
}
</script>

<template>
  <div>
    <v-btn @click="BClick" :color="btnColor">Toggle</v-btn>
  </div>
</template>
