<script setup></script>
<template>
  <main>
    <div class="about">
      <p id="p-about">About</p>
      <h2>About DTT Real Estate</h2>
      <p class="about-content">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, ea
        dolore maiores voluptatum earum quia ut et enim voluptates culpa
        accusamus ducimus unde? Consequatur explicabo animi maiores earum
        suscipit quas? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Voluptates maiores rem nihil explicabo similique voluptatum fugiat,
        dolor at. Aut velit doloribus, nobis commodi quae error quaerat ea.
        Sapiente, fugit numquam.
      </p>
      <p class="about-content">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
      <h2>Design and Development</h2>
    </div>
    <div class="about" id="about-image">
      <img src="../components/img/img_logo_dtt@3x.png" alt="" />
      <div id="about-design">
        <p>By DTT</p>
        <p id="color">www.d-tt.nl</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* CSS desktop*/
* {
  margin: 0px;
  padding: 0px;
}

main {
  background-color: var(--color-background);
  height: 90vh;
}
.about {
  width: 80%;
  margin: auto;
}
.about p {
  color: var(--color-background-value);
}
.about-content {
  padding-bottom: 15px;
}

h2 {
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
}

#about-image {
  display: flex;
  gap: 20px;
}

#about-design {
  display: grid;
  align-content: center;
}

img {
  width: 200px;
}

#color {
  color: var(--color-backgroud-link-blue);
}

@media (min-width: 501px) {
  #p-about {
    display: none;
  }
}

/*here start CSS mobile*/
@media (max-width: 500px) {
  * {
    margin: 0px;
    padding: 0px;
  }
  .about {
    width: 300px;
  }

  #p-about {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    color: var(--color-background-letter);
  }
  .about h2 {
    font-size: 18px;
    padding-bottom: 10px;
  }
  .about-content {
    font-size: 14px;
  }

  #about-image img {
    width: 90px;
  }

  #about-design p {
    font-size: 13px;
  }
}
</style>
