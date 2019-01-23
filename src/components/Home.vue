<template>
  <div class="home">
    <h1>MUSIC GENERATOR</h1>
    <editor></editor>
  </div>
</template>

<script>
import editor from '@/components/editor.vue'
export default {
  name: 'home',
  components: {editor}
}
</script>
<style>
  h1 {
    padding: 40px 0 40px 50px;
    margin-bottom: 10px;
    text-align: left;
    display: block;
    font-weight: normal;
    /* border-bottom: 1px solid white; */
  }
</style>
