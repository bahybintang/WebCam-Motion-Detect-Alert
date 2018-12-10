<template>
  <div>
    <div class="col s12 m7">
      <div class="card horizontal">
        <div class="card-stacked">
          <div v-bind:class="alertClassName">
            <p class="flow-text grey-text text-darken-1">{{ motion }}</p>
          </div>
          <div class="card-action">
            <a href="#" v-on:click="toggleCamera" class="blue-text">{{ cameraText }}</a>
          </div>
        </div>
      </div>
    </div>

    <camera v-bind:isOpened="cameraOpened" v-bind:box="box"></camera>

  </div>
</template>

<script>
import io from "socket.io-client";
import CameraView from "./CameraView.vue"

export default {
  name: "main-alert",
  data: () => {
    return {
      motion: "Waiting Motion",
      alertClassName: "card-content",
      box: null,
      cameraOpened: false,
      cameraText: "Open Camera"
    };
  },
  created() {
    this.socket = io.connect("http://localhost:3000");
    this.socket.emit("type", { type: "Client" });

    this.socket.on("box", response => {
      this.box = response;
    });

    this.socket.on("motion", () => {
      this.motion = "Motion Detected!";
      this.alertClassName = "card-content red lighten-5";
    });

    this.socket.on("un-motion", () => {
      this.motion = "No Motion Detected!";
      this.alertClassName = "card-content green accent-1";
    });
  },
  methods: {
    toggleCamera: function () {
      this.cameraOpened = !this.cameraOpened;
      if(this.cameraText === "Open Camera"){
        this.cameraText = "Close Camera";
      }
      else{
        this.cameraText = "Open Camera";
      }
    }
  },
  components: {
    "camera": CameraView
  }
};
</script>
