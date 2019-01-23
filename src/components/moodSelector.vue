<template lang="html">
  <div class="mood-selector">
    <h5>Mood</h5>
    <div class="moods">
      <div class="mood"
           v-for="mood in moods"
           @click="select(mood)"
           v-bind:class="mood === selectedMood ? 'selected': ''">
        {{mood}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moodSelector',
  props: [],
  data: function () {
    return {
      moods: ['soft', 'vivid', 'dark'],
      selectedMood: 'vivid'
    }
  },
  methods: {
    select (e) {
      this.selectedMood = e;
      this.$emit('selectMood', this.selectedMood)
    }
  }
}
</script>

<style scoped>
  .mood-selector {
    text-align: left;
    margin-bottom: 30px;
    margin-left: 20px;
    width: 160px;
  }
  .moods {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .mood {
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.08);
    width: 50px;
    height: 50px;
    border-radius: 3%;
    padding: 16px 3px 3px 3px;
    font-size: 0.7em;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
  }
  .mood.selected {
    /*TODO colors*/
    border: 1px solid rgba(150, 220, 255, 10.8);
    background-color: rgba(150, 220, 255, 0.2);
  }
  h5 {
    margin-bottom: 10px;
    font-weight: normal;
  }
</style>
