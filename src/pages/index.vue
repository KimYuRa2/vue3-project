<!-- Home page -->

<template>
  <div>Home Page</div>
  <div>{{ count }}</div>
  <button @click="count++">Add</button>
</template>

<script>
import { useCount } from '@/composables/count'

export default {
  setup() {
    const { count } = useCount(); // useCount()에서 state를 반환함

    return {
      count
    }
  }
}
</script>

<style>

</style>