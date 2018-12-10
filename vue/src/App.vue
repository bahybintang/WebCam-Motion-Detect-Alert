<template>
  <div class="container">
    <my-navbar></my-navbar>
    <main-alert></main-alert>
  </div>
</template>

<script>
import MainAlert from './components/MainApp.vue';
import MyNavbar from "./components/MyNavbar.vue";

export default {
  name: 'app',
  data() {
    return {
      message: "Client's log!"
    };
  },
  components: {
    'main-alert': MainAlert,
    'my-navbar': MyNavbar
  }
};

</script>