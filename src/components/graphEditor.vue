<template lang="html">
  <div class="graph-editor">
    <canvas id="canvas" resize="true" hidpi="off"></canvas>
  </div>
</template>

<script>
import * as musicGenerator from './../musicGenerator/generator.js'
const STROKE_STYLE = {
  strokeColor: 'rgba(150, 220, 255, 1)',
  strokeWidth: '2'
}
const TEXT_STYLE = {
  fontFamily: 'Helvetica Neue',
  fontWeight: 'bold',
  fontSize: 12,
  justification: 'center',
  fillColor: 'white'
}
const CURSOR_STYLE = {
  strokeColor: 'MediumOrchid ',
  strokeWidth: '3',
}
const BASELINE_STYLE = {
  strokeWidth: '2',
  strokeColor: 'rgba(235, 235, 235, 0.6)',
}
const LINE_STYLE = {
  strokeWidth: '1',
  strokeColor: 'rgba(200, 200, 200, 0.2)',
}

export default {
  name: 'graphEditor',
  props: ['videoDuration', 'currentTime', 'isPlaying'],
  data: function () {
    return {
      paper: new this.$paper.PaperScope(),
      height: window.innerWidth / 3,
      intensities: []
    }
  },
  mounted () {
    this.canvas = this.$el.querySelector('canvas')
    this.paper.setup(this.canvas)
    this.paper.activate()
    // this.paper.project.view.onResize = this.onResize

    this.width = this.canvas.width
    this.height = this.canvas.height
    this.horizontalPadding = 20
    // this.horizontalPadding = this.width * 0.05 // rename
    this.zeroPosition = this.height - 15
    this.unit = this.zeroPosition * 0.85
    this.min = this.zeroPosition - this.unit
    this.max = this.zeroPosition

    this.draw(this.width, this.height)
    this.createTool()
  },
  watch: {
    videoDuration (val) {
      this.baseLine.text[1].content = this.renderedTime(val)
      this.generate()
    },
    isPlaying (val) {
      if (val) {
        this.play()
      }
    },
    intensities (val) {
      this.$emit('intensities', val)
    }
  },
  computed: {
    currentTimeComputed: {
      get () {
        return this.renderedTime(this.currentTime)
      },
      set (val) {
        this.$emit('currentTimeChanged', val)
      }
    }
  },
  methods: {
    generate () {
      let result = []
      if (this.stroke) {
        this.stroke.segments.forEach((s) => {
          let converted = this.convertPointData(s.point.x, s.point.y)
          result.push({
            time: converted.x,
            value: converted.y
          })
        })
      }
      this.intensities = result
    },
    play () {
      let x = this.cursor.position.x
      let frames = this.videoDuration * 60
      let step = this.baseLine.length / frames
      if (this.isPlaying) {
        if (x >= this.horizontalPadding && x <= this.width - this.horizontalPadding) {
          this.cursor.position.x = x + step
          let ratio = Number(((this.cursor.position.x - this.horizontalPadding) / this.baseLine.length).toFixed(2))
          let sec = Number((this.videoDuration * ratio).toFixed())
          this.baseLine.text[0].content = this.renderedTime(sec)
          window.requestAnimationFrame(this.play)
        } else {
          this.cursor.position.x = this.horizontalPadding
          this.currentTimeComputed = 0
          this.stop()
        }
      }
    },
    stop () {
      this.$emit('stop')
    },
    draw (w, h) {
      this.createBaseLine(w, h)
      this.createCursor(w, h)
      this.createStroke(w, h)
    },
    createBaseLine (w, h) {
      let verticalLine = new Path()
      verticalLine.style = BASELINE_STYLE
      verticalLine.add(new Point(this.horizontalPadding, this.min))
      verticalLine.add(new Point(this.horizontalPadding, this.max))
      verticalLine.text = new PointText(this.horizontalPadding + 3, this.min-15);
      verticalLine.text.content = 'Intensity'
      verticalLine.text.style = TEXT_STYLE

      for (let i = 0; i < 5; i++) {
        let step = this.min + ((i * this.height) / 6)
        let line = new Path()
        line.style = LINE_STYLE
        line.add(new Point(this.horizontalPadding, step))
        line.add(new Point(w - this.horizontalPadding, step))
      }

      this.baseLine = new Path()
      this.baseLine.style = BASELINE_STYLE
      this.baseLine.add(new Point(this.horizontalPadding, this.zeroPosition))
      this.baseLine.add(new Point(w - this.horizontalPadding, this.zeroPosition))
      this.baseLine.text = []
      this.baseLine.text[0]= new PointText(this.horizontalPadding -4, this.zeroPosition + 15);
      this.baseLine.text[0].content = this.renderedTime(0);
      this.baseLine.text[1] = new PointText(this.baseLine.length + 4 + this.horizontalPadding, this.zeroPosition + 15);
      this.baseLine.text[1].content = this.videoDuration ? this.renderedTime(this.videoDuration) : '00:00';

      this.baseLine.text.forEach((t) => {
        t.style = TEXT_STYLE
      })
    },
    createStroke (w, h) {
      this.stroke = new Path()
      this.stroke.style = STROKE_STYLE
      this.stroke.name = 'stroke'

      let points = [
        {x: this.horizontalPadding, y: this.max / 2},
        {x: w/3, y: this.min},
        {x: w/2, y: this.max / 1.5},
        {x: w - this.horizontalPadding, y: this.max},
      ]
      points.forEach((p, i) => {
        let point = this.stroke.add(new Point(p.x, p.y))
        point.text = new PointText(p.x, p.y -10);
        let textData = this.convertPointData(p.x, p.y)
        point.text.content = `${textData.y}`;
        point.text.style = TEXT_STYLE
      })
      this.stroke.fullySelected = true
      this.stroke.selectedColor = 'rgba(150, 220, 255, 1)'
      console.log(this.stroke, 'st');
    },
    createCursor (w, h) {
      let path = new Path()
      path.style = CURSOR_STYLE
      path.add(new Point(this.horizontalPadding, this.min))
      path.add(new Point(this.horizontalPadding, this.zeroPosition))

      // let text = new PointText(this.horizontalPadding, this.min -15);
      // text.content = this.currentTimeComputed ? this.currentTimeComputed : '00:00';
      // text.style = TEXT_STYLE
      // this.cursor = new Group({
      //   children: [path, text],
      //   name: 'cursor'
      // })
      this.cursor = path
      this.cursor.name = 'cursor'
    },
    addPoint(x, y) {
      let index = 0
      this.stroke.segments.reduce((acc, curr, i) => {
        if (x - curr.point.x < acc && x - curr.point.x >= 0) {
          index = i + 1
          return x - curr.point.x
        } else {
          return acc
        }
      }, this.width)

      let newPoint = this.stroke.insert(index, new Point({ x: x, y: y, selected: true }))
      let textData = this.convertPointData(x, y)
      newPoint.text = new PointText(x, y -10);
      newPoint.text.content = `${textData.y}`;
      newPoint.text.style = TEXT_STYLE

      this.stroke.fullySelected = true
      this.generate()
      return newPoint
    },
    renderedTime(sec) {
      let minutes = Math.floor(sec/60)
      minutes = minutes < 10 ? `0${minutes}`: minutes
      let seconds = sec % 60
      seconds = seconds < 10 ? `0${seconds}`: seconds
      return `${minutes}:${seconds}`
    },
    convertPointData(x, y) {
      let result = {}
      if (x) {
        // TODO meg nincs videoDuration
        let ratio = Number(((x - this.horizontalPadding) / this.baseLine.length).toFixed(2))
        result.x = Number((this.videoDuration * ratio).toFixed())
      }
      if (y) {
        let value = (y - this.zeroPosition) / (this.unit * -1);
        if (value === -0) {
          value = 0
        } else if (value !== 0 && value !== -1 && value !== 1) {
          value = Number(value.toFixed(2))
        }
        result.y = value
      }
      return result
    },
    createTool () {
      let comp = document.querySelector('.graph-editor')
      this.tool = new Tool()

      let segment = null
      let hitResult = null
      let cursorHit = null

      this.tool.onMouseDown = (event) => {
        segment = null

        cursorHit = this.cursor.hitTest(event.point, { fill: true, stroke: true, tolerance: 5 })
        hitResult = this.stroke.hitTest(event.point, {
          stroke: true,
          segments: true,
          tolerance: 10
        })

        if (cursorHit) {
          comp.style.cursor = 'grabbing'
        } else {
          if (hitResult) {
            if (hitResult.type === 'stroke') {
              segment = this.addPoint(event.point.x, event.point.y)
              comp.style.cursor = 'grabbing'
            } else if (hitResult.type == 'segment') {
              segment = hitResult.segment
              comp.style.cursor = 'grabbing'
            }
          }
        }
      }

      this.tool.onMouseDrag = (event) => {
        let x = event.point.x
        let y = event.point.y
        if (cursorHit) {
          // TODO
          if (x >= this.horizontalPadding && x <= this.width - this.horizontalPadding) {
            this.cursor.position.x = x
            let ratio = Number(((this.cursor.position.x - this.horizontalPadding) / this.baseLine.length).toFixed(2))
            this.currentTimeComputed = Number((this.videoDuration * ratio).toFixed())
            this.baseLine.text[0].content = this.currentTimeComputed
          }
          comp.style.cursor = 'grabbing'
        } else {
          comp.style.cursor = 'auto'
        }
        if (segment) {
          let isInArea = x >= this.horizontalPadding &&
                         x <= this.width - this.horizontalPadding &&
                         y >= this.min &&
                         y<= this.max
          let afterPrevious = segment.previous ? x > segment.previous.point.x : true
          let beforeNext = segment.next ? x < segment.next.point.x : true
          if (isInArea && afterPrevious && beforeNext) {
              segment.point.x += event.delta.x
              segment.point.y += event.delta.y
              segment.text.point.x += event.delta.x
              segment.text.point.y += event.delta.y
              let seconds = this.convertPointData(event.point.x, event.point.y).y
              segment.text.content = seconds

              this.generate()
          }
        }
      }

      this.tool.onMouseMove = (event) => {
        // TODO
        let onCursor = this.cursor.hitTest(event.point, {stroke: true, tolerance: 5})
        let onSegment = this.stroke.hitTest(event.point, {segments: true, tolerance: 5})
        if (onCursor || onSegment) {
          comp.style.cursor = 'grab'
        }

        let onStroke = this.stroke.hitTest(event.point, {stroke: true, tolerance: 5})
        if (onStroke) {
          comp.style.cursor = 'crosshair'
        }

        if (!onCursor && !onSegment && !onStroke) {
          comp.style.cursor = 'auto'
        }
      }
    }
  }
}
</script>

<style scoped>
.graph-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
#canvas {
  width: 100%;
  height: calc(100vh / 3 + 13px);
}

@media (max-width: 768px) {
  #canvas {
    min-height: 300px;
  }
}
</style>
