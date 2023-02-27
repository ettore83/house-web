<script>
export default {
  name: "FooterComponent",
};
</script>

<template>
  <footer id="overview-footer">
    <nav id="hactive">
      <RouterLink to="/"
        ><img
          src="./img/ic_mobile_navigarion_home_active@3x.png"
          alt="small house img"
        />
      </RouterLink>
    </nav>
    <nav id="info">
      <RouterLink to="/about"
        ><img src="./img/ic_mobile_navigarion_info@3x.png" alt="info img" />
      </RouterLink>
    </nav>
  </footer>
</template>

<style scoped>
#overview-footer {
  border-top: 1px solid rgb(238, 230, 230);
  width: 360px;
  margin: auto;
  height: 60px;
  background-color: var(--color-background-div-house);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 1px 5px rgba(103, 76, 76, 0.386); 
}

#hactive img {
  width: 25px;
}

#info img {
  width: 25px;
}

@media (min-width: 501px) {
  #overview-footer {
    display: none;
  }
}
</style>
