<template lang="html">
  <div id="editor">
    <div class="container">
      <div class="column right">
        <moodSelector @selectMood="selectMood"></moodSelector>
        <graphEditor :videoDuration="videoDuration"
                     :currentTime="currentTime"
                     :isPlaying="isPlaying"
                     @stop="stop"
                     @intensities="getIntensities"
                     @currentTimeChanged="currentTimeChanged"></graphEditor>
      </div>

      <div class="column left">
        <label for="mute-video">
          Mute video
          <input type="checkbox" name="mute-video" title="mute video" v-model="mute">
        </label>
        <videoPlayer :currentTime="currentTime"
                     :isPlaying="isPlaying"
                     :intensities="intensities"
                     :mute="mute"
                     @intensityChange="intensityChange"
                     @videoDuration="getVideoDuration"
                     @currentTimeChanged="currentTimeChanged"></videoPlayer>
      </div>
    </div>
    <!-- <button type="button" name="start" @click="start">play</button>
    <button type="button" name="stop" @click="stop">stop</button> -->
  </div>
</template>

<script>
import videoPlayer from './videoPlayer.vue'
import graphEditor from './graphEditor.vue'
import moodSelector from './moodSelector.vue'
import * as musicGenerator from './../musicGenerator/generator.js'
export default {
  name: 'editor',
  components: {videoPlayer, graphEditor, moodSelector},
  data: function () {
    return {
      videoDuration: null,
      currentTime: 0,
      isPlaying: false,
      intensities: [],
      mood: 'vivid',
      mute: true
    }
  },
  mounted () {
    console.log('editor');
    window.addEventListener('keypress', (e) => {
      if (e.keyCode == 32) {
        this.isPlaying ? this.stop() : this.start()
      }
    })
  },
  methods: {
    selectMood (e) {
      this.mood = e
      musicGenerator.setMood(e)
    },
    intensityChange (e) {
      musicGenerator.setIntensity(e)
    },
    getIntensities (e) {
      this.intensities = e
    },
    start () {
      musicGenerator.setMood(this.mood)
      musicGenerator.setIntensity(1)
      this.play()
    },
    play () {
      this.isPlaying = true
      musicGenerator.startSequence()
    },
    stop () {
      this.isPlaying = false
      musicGenerator.endSequence()
    },
    getVideoDuration (e) {
      this.videoDuration = Number(e.toFixed())
    },
    currentTimeChanged (e) {
      this.currentTime = e
    },
    onResize (e) {
      // TODO
      // this.paper.project.clear()
      // this.width = e.size.width
      // this.height = e.size.height
      // this.canvasMargin = this.width * 0.05
      // this.paper.view.update()
      // this.draw(e.size.width, e.size.height)
    }
  }
}
</script>

<style scoped>
#editor {
  width: 100%;
  text-align: center;
  padding: 30px;
  padding-top: 15px;
  height: auto;
}
.container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  width: 100%;
  margin-bottom: 40px;
}
button {
  margin: 10px;
  width: 100px;
  padding: 5px;
  border: 0px solid white;
  background-color: rgb(200, 200, 200);
}
.left {
  width: 50%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  min-width: 310px;
}
.right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 310px;
}
label {
  margin-bottom: 10px;
  display: inline-block;
}
input {
  margin-left: 10px;
}

@media (max-width: 768px) {
  .right, .left {
    width: 100%;
  }
  .right {
    margin-top: 50px;
  }
}
@media (max-width: 375px) {
  #editor {
    padding: 5px;
  }
}
</style>
