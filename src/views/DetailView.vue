<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import HousesData from "../api/houses";
import remove from "../api/houses";

const housesListed = ref([]);
const houseRecommended = ref({});
const houseRecommendedSecond = ref({});
const houseRecommendedThird = ref({});
const route = useRoute();
const house = ref({});

//iniciando com zero o id da casa para funcionar o botao de editar
house.value.id = 0;

onMounted(async () => {
  const idOfHouse = route.params.id;
  housesListed.value = housesListed.value = await (
    await HousesData.index({})
  ).data;

  house.value = housesListed.value.find((x) => {
    if (x.id == idOfHouse) {
      console.log(x);
      return x;
    }
  });

  //Enquanto nao carregar ou o valor do id da casa randomica for igual o id da casa atual, continua procurando outra casa
  while (
    houseRecommended.value.id == null ||
    houseRecommended.value.id == idOfHouse ||
    houseRecommendedSecond.value.id == null ||
    houseRecommendedSecond.value.id == idOfHouse ||
    houseRecommendedSecond.value.id == houseRecommended.value ||
    houseRecommendedThird.value.id == null ||
    houseRecommendedThird.value.id == idOfHouse ||
    houseRecommendedThird.value.id == houseRecommendedSecond.value ||
    houseRecommendedThird.value.id == houseRecommended.value
  ) {
    let indiceRandomico = Math.floor(Math.random() * housesListed.value.length);
    houseRecommended.value = housesListed.value[indiceRandomico];
    let indiceRandomicoSecond = Math.floor(
      Math.random() * housesListed.value.length
    );
    houseRecommendedSecond.value = housesListed.value[indiceRandomicoSecond];
    let indiceRandomicoThird = Math.floor(
      Math.random() * housesListed.value.length
    );
    houseRecommendedThird.value = housesListed.value[indiceRandomicoThird];
  }
  console.log(houseRecommended.value.id);
  console.log(houseRecommendedSecond.value.id);
  console.log(houseRecommendedThird.value.id);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

//delete house
const deleteBot = (id) => {
  console.log(id);

  remove
    .delete(id)

    .then((response) => {
      console.log(response);
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
};

//for show display
let showDisplay = ref(false);
function confirmDelete(mostrar) {
  showDisplay.value = mostrar;
  console.log(showDisplay);
}

function houseDetails(id) {
  window.location.href = "/detail/" + id;
}
</script>

<template>
  <main class="detail">
    <div id="main-content" :style="{ backgroundImage: `url(${house?.image})` }">
      <div id="content-detail-big">
        <nav id="back-overview">
          <router-link to="/">
            <img
              id="back-grey"
              src="../components/img/ic_back_grey@3x.png"
              alt="Back-grey"
            />
          </router-link>
          <router-link to="/">
            <img
              id="back-white"
              src="../components/img/ic_back_white@3x.png"
              alt="back-white"
            />
          </router-link>
          <p>Back to overview</p>
          <div id="edit-delete" v-show="house?.madeByMe">
            <router-link
              id="edit-white"
              :to="{ name: 'edit', params: { id: house?.id } }"
            >
              <img src="../components/img/ic_edit_white@3x.png" alt="" />
            </router-link>
            <a id="delete-white" href="#"
              ><img
                v-on:click="confirmDelete(true)"
                src="../components/img/ic_delete_white@3x.png"
                alt=""
              />
            </a>
          </div>
        </nav>

        <div id="information-detail">
          <div class="group-edit" id="group-edit-street">
            <p id="street-detail">{{ house?.location?.street }}</p>
            <div id="edit-detail" v-show="house?.madeByMe">
              <router-link :to="{ name: 'edit', params: { id: house?.id } }"
                ><img
                  id="edit-red"
                  src="../components/img/ic_edit@3x.png"
                  alt="edit-img"
                />
              </router-link>
              <img
                id="delete-grey"
                v-on:click="confirmDelete(true)"
                src="../components/img/ic_delete@3x.png"
                alt="delete-img"
              />
            </div>
          </div>
          <div class="group-p">
            <p>
              <img src="../components/img/ic_location@3x.png" alt="" />{{
                house?.location?.zip
              }}
            </p>
            <div class="group-edit">
              <p>
                <img src="../components/img/ic_price@3x.png" alt="" />
                {{ house?.price }}
              </p>
              <p>
                <img src="../components/img/ic_size@3x.png" alt="" />
                {{ house?.size }} m2
              </p>
              <p>
                <img
                  src="../components/img/ic_construction_date@3x.png"
                  alt=""
                />
                built in {{ house?.constructionYear }}
              </p>
            </div>
            <div class="group-edit">
              <p>
                <img src="../components/img/ic_bed@3x.png" alt="" />
                {{ house?.rooms?.bedrooms }}
              </p>
              <p>
                <img src="../components/img/ic_bath@3x.png" alt="" />{{
                  house?.rooms?.bathrooms
                }}
              </p>
              <p>
                <img src="../components/img/ic_garage@3x.png" alt="" />
                {{ house?.hasGarage == true ? `yes` : `no` }}
              </p>
            </div>
            <p id="p-loren">
              {{ house?.description }}
            </p>
          </div>
        </div>
      </div>
      <div id="content-detail-small">
        <!--HTML recommended house-->
        <p>Recommended for you</p>
        <nav id="detail-small">
          <div id="house-edit">
            <img :src="houseRecommended?.image" alt="house picture" />
          </div>
          <div class="info1">
            <p id="street" @click="houseDetails(houseRecommended?.id)">
              <strong>{{ houseRecommended?.location?.street }}</strong>
            </p>
            <p id="value">{{ formatPrice(houseRecommended?.price) }};</p>
            <p id="city">
              {{ houseRecommended?.location?.zip }}
              {{ houseRecommended?.location?.city }}
            </p>
            <div class="information02">
              <p class="bed">
                <img src="../components/img/ic_bed@3x.png" alt="" />{{
                  houseRecommended?.rooms?.bedrooms
                }}
              </p>
              <p class="bath">
                <img src="../components/img/ic_bath@3x.png" alt="" />
                {{ houseRecommended?.rooms?.bathrooms }}
              </p>
              <p class="square">
                <img src="../components/img/ic_size@3x.png" alt="" />
                {{ houseRecommended?.size }}m2
              </p>
            </div>
          </div>
        </nav>

        <nav id="detail-small">
          <div id="house-edit">
            <img :src="houseRecommendedSecond?.image" alt="house picture" />
          </div>
          <div class="info1">
            <p id="street" @click="houseDetails(houseRecommendedSecond?.id)">
              <strong>{{ houseRecommendedSecond?.location?.street }}</strong>
            </p>
            <p id="value">{{ formatPrice(houseRecommendedSecond?.price) }};</p>
            <p id="city">
              {{ houseRecommendedSecond?.location?.zip }}
              {{ houseRecommendedSecond?.location?.city }}
            </p>
            <div class="information02">
              <p class="bed">
                <img src="../components/img/ic_bed@3x.png" alt="" />{{
                  houseRecommendedSecond?.rooms?.bedrooms
                }}
              </p>
              <p class="bath">
                <img src="../components/img/ic_bath@3x.png" alt="" />
                {{ houseRecommendedSecond?.rooms?.bathrooms }}
              </p>
              <p class="square">
                <img src="../components/img/ic_size@3x.png" alt="" />
                {{ houseRecommendedSecond?.size }}m2
              </p>
            </div>
          </div>
        </nav>

        <nav id="detail-small">
          <div id="house-edit">
            <img :src="houseRecommendedThird?.image" alt="house picture" />
          </div>
          <div class="info1">
            <p id="street" @click="houseDetails(houseRecommendedThird?.id)">
              <strong>{{ houseRecommendedThird?.location?.street }}</strong>
            </p>
            <p id="value">{{ formatPrice(houseRecommendedThird?.price) }};</p>
            <p id="city">
              {{ houseRecommendedThird?.location?.zip }}
              {{ houseRecommendedThird?.location?.city }}
            </p>
            <div class="information02">
              <p class="bed">
                <img src="../components/img/ic_bed@3x.png" alt="" />{{
                  houseRecommendedThird?.rooms?.bedrooms
                }}
              </p>
              <p class="bath">
                <img src="../components/img/ic_bath@3x.png" alt="" />
                {{ houseRecommendedThird?.rooms?.bathrooms }}
              </p>
              <p class="square">
                <img src="../components/img/ic_size@3x.png" alt="" />
                {{ houseRecommendedThird?.size }}m2
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </main>
  <!--modal delete message-->
  <div id="modal-delete" class="main-modal show" v-if="showDisplay">
    <div id="ask-delete">
      <h2>Delete Listing</h2>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action can not be undone.</p>
      <input
        class="ask-input"
        id="bt-yes"
        type="button"
        value="YES,DELETE"
        v-on:click="deleteBot(house?.id)"
      />
      <br />
      <input
        class="ask-input"
        id="bt-back"
        type="button"
        value="GO BACK"
        v-on:click="confirmDelete(false)"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/*CSS modal delete message*/
.main-modal {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: none;
  justify-content: center;
  align-items: center;
}

.main-modal.show {
  display: flex;
}

#ask-delete {
  width: 360px;
  height: 250px;
  background-color: var(--color-background-div-house);
  text-align: center;
  margin: auto;
  border-radius: 10px;
}

#ask-delete h2 {
  padding-top: 25px;
  padding-bottom: 20px;
}

input.ask-input {
  margin-top: 20px;
}
.ask-input {
  width: 280px;
  padding: 5px;
  border-radius: 5px;
  border: none;
}

#bt-yes {
  background-color: var(--color-background-button1);
  color: var(--color-background);
  font-weight: bold;
  cursor: pointer;
}

#bt-back {
  background-color: var(--color-background-value);
  color: var(--color-background);
  font-weight: bold;
  cursor: pointer;
}

@keyframes modelo {
  from {
    opacity: 0;
    transform: translate3d(0, -100px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.main-modal.show #ask-delete {
  animation: modelo 0.3s;
}

/*Desktop CSS*/
main {
  background-color: var(--color-background);
  height: 900px;
}

div#main-content {
  display: flex;
  column-gap: 50px;
  align-items: flex-start;
  width: 80%;
  margin: auto;
  background-repeat: no-repeat;
  background-size: 600px;
  background-position-y: 94px;
}

#back-overview a img {
  width: 19px;
  padding-right: 10px;
}

#back-overview {
  font-size: 18px;
  display: flex;
  margin-left: 0;
  padding-top: 50px;
  font-weight: bold;
}

div#house-detail {
  margin-top: 20px;
}

#information-detail {
  width: 600px;
  height: 400px;
  background-color: var(--color-background-div-house);
  flex-wrap: wrap;
  position: relative;
  top: 400px;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.126);
}

#information-detail p {
  padding-left: 20px;
  padding-top: 10px;
  color: var(--color-background-value);
  font-family: var(--font-Open-Sans-Regular);
  font-size: 18px;
}

p#street-detail {
  color: var(--color-background-letter);
  font-size: 1.4em;
  font-weight: bold;
}

#information-detail img {
  width: 12px;
}

.group-edit {
  display: flex;
}

p#p-loren {
  padding-right: 20px;
}

#group-edit-street {
  justify-content: space-between;
  height: 50px;
}

#edit-detail img {
  width: 14px;
  padding: 5px;
}

div#edit-detail {
  padding: 20px;
}

.group-p {
  padding-top: 0px;
}

nav #house-edit img {
  width: 90px;
  height: 100px;
  margin-left: 15px;
  margin-top: 20px;
  border-radius: 5px;
}

#content-detail-small {
  padding-top: 85px;
}

#detail-small {
  width: 350px;
  height: 120px;
  margin-top: 20px;
  background-color: var(--color-background-div-house);
  display: flex;
  column-gap: 2px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.126);
}

#edit-detail {
  padding-left: 300px;
}

.information #street {
  font-weight: bold;
}

.information #value {
  color: var(--color-background-value);
  font-weight: bold;
}

.information #city {
  color: var(--color-background-button2);
}

div nav.house {
  display: flex;
}

nav#detail-small {
  display: flex;
}

div#house-edit > img {
  margin: auto;
  padding: 10px;
  border-radius: 20px;
}

.info1 {
  padding: 10px;
}

.information02 {
  display: flex;
  column-gap: 10px;
}

.information02 img {
  width: 15px;
  padding-top: 8px;
  margin-right: 4px;
}

div.information02 p {
  color: var(--color-background-button2);
}

#street {
  font-weight: bold;
}

#value {
  color: var(--color-background-value);
  font-weight: bold;
  padding-top: 4px;
}

#city {
  color: var(--color-background-button2);
  padding-top: 4px;
}

@media (min-width: 501px) {
  #back-white,
  #edit-white,
  #delete-white {
    display: none;
  }
}

/*here start CSS 768px*/
@media (max-width: 768px) {
  .detail {
    width: 100%;
    margin: auto;
  }

  div#main-content {
    width: 600px;
    background-size: 360px;
  }

  div#content-detail-big {
    width: 360px;
    margin: auto;
    padding-left: 0px;
  }

  #detail-small {
    width: 250px;
    height: 80px;
    height: 90px;
  }

  #information-detail {
    width: 360px;
    height: 370px;
    margin-top: 0px;
    position: relative;
    top: 260px;
  }

  #information-detail p {
    font-size: 15px;
  }

  p#street-detail {
    padding: 20px;
    font-size: 18px;
  }

  nav #house-edit img {
    width: 76px;
    height: 72px;
  }
  .info1 p {
    font-size: 12px;
  }
}

/*here start CSS mobile*/
@media (max-width: 500px) {
  .detail {
    width: 360px;
    margin: auto;
  }

  div#main-content {
    width: 360px;
    display: grid;
    margin: auto;
    background-repeat: no-repeat;
    background-size: 400px;
    background-position-y: 0px;
  }

  div#content-detail-big {
    width: 360px;
    margin: auto;
    padding-left: 0px;
  }

  #content-detail-small {
    width: 360px;
    padding-top: 45px;
    margin: auto;
  }

  #information-detail {
    width: 360px;
    height: 280px;
    margin: auto;
    border-radius: 30px 30px 0px 0px;
    position: relative;
    top: 0px;
  }

  #information-detail p {
    color: var(--color-background-value);
    font-family: var(--font-Open-Sans-Regular);
    font-size: 12px;
  }

  p#street-detail {
    color: var(--color-background-letter);
    font-size: 1.2em;
    font-weight: bold;
    padding: 20px;
  }

  #house-detail img {
    display: none;
  }

  #back-overview p {
    display: none;
  }

  #back-grey {
    display: none;
  }

  #edit-red {
    display: none;
  }

  #delete-grey {
    display: none;
  }

  #back-overview {
    width: 360px;
    height: 180px;
    margin: auto;
    display: flex;
    padding-top: 35px;
    justify-content: flex-start;
    gap: 40px;
  }

  #edit-delete {
    padding-left: 110px;
  }

  #edit-delete a {
    padding: 18px;
  }

  #edit-delete img {
    height: 25px;
  }

  #edit-delete a:hover {
    border: 1px solid white;
    border-radius: 50%;
    opacity: 80%;
  }

  #content-detail-small p {
    font-weight: bold;
    font-size: 12px;
  }

  #content-detail-small {
    width: 320px;
  }

  #detail-small {
    width: 320px;
    border-radius: 10px;
  }
  .info1 {
    padding-left: 10px;
  }
  .information02 {
    display: flex;
    align-items: center;
    column-gap: 0px;
  }
  .information02 p {
    padding-right: 20px;
  }
}
</style>
