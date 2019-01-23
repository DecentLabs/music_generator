<template lang="html">
  <div class="video-player">
    <!-- <label for="mute-video">
      Mute video
      <input type="checkbox" name="mute-video" title="mute video" v-model="mute">
    </label> -->
    <video id="video" ref="myVideo">
      <source src="../assets/test_assets/video_2.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'videoPlayer',
  props: ['currentTime', 'isPlaying', 'restart', 'intensities', 'mute'],
  data: function () {
    return {
      videoUrl: './../assets/test_assets/video.mp4',
      video: null,
      duration: null
    }
  },
  mounted () {
    this.video = document.querySelector('#video')
    this.video.addEventListener('durationchange', (e) => {
      this.duration = this.video.duration
      this.$emit('videoDuration', this.duration)
    })
  },
  computed: {
    currentTimeComputed: {
      get () {
        return this.currentTime
      },
      set (val) {
        this.$emit('currentTimeChanged', val)
      }
    }
  },
  methods: {
    play () {
      this.addTrackToVideo()
      this.video.muted = this.mute
      this.video.play()
    },
    stop () {
      this.video.pause()
    },
    addTrackToVideo () {
      let track = this.video.addTextTrack('subtitles', 'test', 'en')
      track.mode = 'hidden'
      this.intensities.forEach((int, index) => {
        track.addCue(new VTTCue(int.time, int.time + 1, int.value))
      })
      let that = this
      track.oncuechange = function (e) {
        // TODO
        if (this.activeCues[0]) {
          that.$emit('intensityChange', Number(this.activeCues[0].text))
        }
      }
    }
  },
  watch: {
    currentTime (val) {
      this.video.currentTime = val;
    },
    isPlaying (val) {
      val ? this.play() : this.stop()
    },
    mute (val) {
      this.video.muted = val
    },
    intensities (val) {
      this.addTrackToVideo()
    }
  }
}
</script>

<style scoped>
.video-player {
  width: 100%;
  padding-right: 20px;
  /*margin-top: 25px;*/
  text-align: left;
}
video {
  width: 100%;
  background-color: black;
}
</style>
