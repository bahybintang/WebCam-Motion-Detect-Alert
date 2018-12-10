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
    box: Object
  },
  data: () => ({

  }),
  methods: {
    setup(sketch) {
      sketch.createCanvas(640, 480);
      sketch.background(125, 125, 125);
    },
    draw(sketch) {
      sketch.stroke(255, 255, 255);

      // Background Flashing for Debug
      // sketch.background(
      //   Math.random() * 255,
      //   Math.random() * 255,
      //   Math.random() * 255
      // );

      sketch.background(125, 125, 125);

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