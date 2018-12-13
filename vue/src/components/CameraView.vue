<template>
  <!-- p5 Camera View -->
  <div v-if="isOpened">
    <vue-p5 @draw="draw" @setup="setup"></vue-p5>
  </div>
</template>

<script>
import VueP5 from "vue-p5";
export default {
  name: "camera",
  components: {
    "vue-p5": VueP5
  },
  props: {
    isOpened: Boolean,
    box: Object,
    image: String
  },
  data: () => ({
    cv: null,
    img: null,
    ctx: null
  }),
  created() {
    this.img = new Image();
  },
  methods: {
    setup(sketch) {
      this.cv = sketch.createCanvas(640, 480);
      this.ctx = this.cv.canvas.getContext('2d');
      sketch.background(125, 125, 125);
    },
    draw(sketch) {
      // Background Flashing for Debug
      // sketch.background(
      //   Math.random() * 255,
      //   Math.random() * 255,
      //   Math.random() * 255
      // );

      //  sketch.background(0);

      if(this.image){
        this.img.src = this.image;
        this.ctx.drawImage(this.img, 0, 0, 640, 480);
      }

      sketch.stroke(255, 255, 255);
      sketch.noFill();
      if (this.box) {
        sketch.rect(
          this.box.minimums.x,
          this.box.minimums.y,
          this.box.maximums.x - this.box.minimums.x,
          this.box.maximums.y - this.box.minimums.y
        );
      }
    }
  }
};
</script>