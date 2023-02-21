<script>
export default {
  name: "HeaderComponent",
};
</script>

<template>
  <nav class="header-logo">
    <img src="../components/img/img_logo_dtt@3x.png" alt="img_logo_dtt" />
    <nav class="menu">
      <a class="menu-item" href="#">
        <RouterLink to="/">Houses</RouterLink>
      </a>
      <a class="header-menu-item" href="">
        <RouterLink to="/about">About</RouterLink>
      </a>
    </nav>
  </nav>
</template>

<style scoped>
.header-logo {
  height: 80px;
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.header-logo > img {
  height: 40px;
}
.header-logo > nav > a {
  font-size: 22px;
  margin-left: 80px;
}

@media (max-width: 500px) {
  .header-logo {
    display: none;
  }
}
</style>
