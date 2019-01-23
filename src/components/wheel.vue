<template lang="html">
  <div id="wheel">
    <canvas id="wheel-canvas" resize></canvas>
  </div>
</template>

<script>
export default {
  name: 'editor',
  data: function () {
    return {
      paper: new this.$paper.PaperScope(),
      circle: null
    }
  },
  mounted () {
    let canvas = this.$el.querySelector('#wheel-canvas')
    this.paper.setup(canvas)
    this.paper.activate()
    this.createCircle()
  },
  methods: {
    createCircle() {
      this.circle = []
      for (let i = 0; i < 360; i++) {
        let x = Math.cos(i * (Math.PI / 180)) * 60 + this.paper.view.center.x
        let y = Math.sin(i * (Math.PI / 180)) * 60 + this.paper.view.center.y
        let dx = Math.cos(i * (Math.PI / 180)) * 70 + this.paper.view.center.x
        let dy = Math.sin(i * (Math.PI / 180)) * 70 + this.paper.view.center.y
        let line = new Path()
        line.add(new Point(x,y))
        line.add(new Point(dx, dy))
        line.strokeWidth = 1
        line.strokeColor = {
          hue: i,
          saturation: 1,
          lightness: 0.4
        }
        this.circle.push(line)
      }
    }
  }
}
</script>

<style scoped>
#wheel {
  width: 100%;
  height: 100vh;
}
</style>
