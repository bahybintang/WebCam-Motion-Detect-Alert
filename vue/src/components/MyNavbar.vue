<template>
  <div>
    <nav>
      <div class="nav-wrapper blue">
        <a href="#" class="brand-logo">
          <i class="material-icons">cloud</i>Client's Log
        </a>
        <a href="#" data-activates="mobile-demo" class="button-collapse">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Camera</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Camera</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "my-navbar",
  data: () => {
    return {};
  },
  mounted() {
    $(document).ready(function() {
      $(".button-collapse").sideNav();
    }); 
  }
};
</script>

<style>
.nav-wrapper {
  padding: 0px 10px 0px 15px;
}
</style>
