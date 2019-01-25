<template>
  <div class="home">
    <h1>MUSIC GENERATOR</h1>
    <editor></editor>
    <a href="https://decent.org" target="_blank">
      <img src="https://decent.org/assets/created_by_decent_badge/created_by_badge_white.png" alt="created_by_decent_labs">
    </a>
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
  .home {
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  h1 {
    padding: 40px 50px 40px 50px;
    margin-bottom: 10px;
    text-align: left;
    display: block;
    font-weight: normal;
    box-sizing: border-box;
    /* border-bottom: 1px solid white; */
  }
  a {
    width: 140px;
    height: 50px;
    margin: 10px 10px 10px 50px;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>
