<script setup>
import { onMounted, ref } from "vue";
import HouseList from "../components/HouseList.vue";
import HousesData from "../api/houses/";

const houses = ref([]);
const search = ref("");
const orderColumns = ref(["price", "size"]);
const sortKey = ref("price");
const sortOrders = ref(
  orderColumns.value.reduce((o, key) => ((o[key] = 1), o), {})
);

function sortBy(key) {
  sortKey.value = key;
  sortOrders.value[key] *= -1;
}

//function to load page after searching
const loadHouses = async () => {
  search.value = "";
  houses.value = await (await HousesData.index({})).data;
  console.log(houses.value);
};

onMounted(async () => {
  loadHouses();
});
</script>

<template>
  <main>
    <div id="head-main">
      <nav class="container">
        <div id="house-title">
          <h1>Houses</h1>
        </div>
        <div id="plus">
          <router-link to="/create" href="#">
            <img src="../components/img/ic_plus_grey@3x.png" alt="plus-gray" />
            <button id="button-create">CREATE NEW</button>
          </router-link>
        </div>
      </nav>
      <nav class="head-button">
        <div id="search">
          <form>
            <input
              id="imp-search"
              type="text"
              v-model="search"
              placeholder="Search for a house"
            />
            <input
              id="imp-reset"
              type="reset"
              v-if="search.length > 0"
              @click="loadHouses()"
            />
          </form>
        </div>
        <div id="button-ps">
          <button
            id="price"
            value="price"
            @click="sortBy('price')"
            :class="{ active: sortKey == 'price' }"
          >
            Price
            <span v-if="sortKey == 'price' && sortOrders.price < 0"
              >&darr;</span
            >
            <span v-if="sortKey == 'price' && sortOrders.price >= 0"
              >&uarr;</span
            >
          </button>
          <button
            id="size"
            value="size"
            @click="sortBy('size')"
            :class="{ active: sortKey == 'size' }"
          >
            Size
            <span v-if="sortKey == 'size' && sortOrders.size < 0">&darr;</span>
            <span v-if="sortKey == 'size' && sortOrders.size >= 0">&uarr;</span>
          </button>
        </div>
      </nav>
    </div>

    <HouseList
      :houses-data="houses"
      :word-search="search"
      :order-columns="orderColumns"
      :sort-key="sortKey"
      :sort-orders="sortOrders"
    />
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* here start CSS mobile */
main {
  background-color: var(--color-background);
  width: 360px;
  margin: auto;
}

div#head-main {
  width: 360px;
  margin: auto;
  display: grid;
  gap: 20px;
}
nav.container {
  display: flex;
}

div#house-title {
  font-family: var(--font-Montserrat-Bold);
  font-weight: bold;
  font-size: 14px;
  margin-inline: auto;
}

div#plus a img {
  width: 18px;
  padding: 6px;
}
nav.head-button {
  display: grid;
  gap: 20px;
}

div#search {
  display: flex;
}

/*form of search*/
form {
  display: flex;
  width: 335px;
  height: 35px;
  margin: auto;
}

div#search input#imp-search {
  background-image: url("../components/img/ic_search@3x.png");
  background-repeat: no-repeat;
  background-size: 12px;
  background-position: left 10px center;
  width: 300px;
  padding: 7px;
  padding-left: 30px;
  border-radius: 10px;
  border: none;
  background-color: var(--color-background-input);
  font-family: var(--font-Open-Sans-Regular);
  font-size: 12px;
  margin-inline: auto;
}

/*buttom reset*/
#imp-reset {
  background-color: var(--color-background-input);
  background-image: url("../components/img/ic_clear@3x.png");
  background-repeat: no-repeat;
  background-size: 15px;
  background-position: left center;
  padding-left: 20px;
  border: none;
  width: 12px;
  border-radius: 50%;
  text-align: none;
  position: relative;
  right: 25px;
  height: 30px;
}

div#button-ps {
  margin: auto;
  display: flex;
}

div #price,
#size {
  padding: 10px;
  font-family: var(--font-Montserrat-Bold);
  font-size: 12px;
  font-weight: bold;
  color: var(--color-background-div-house);
}

button#price {
  width: 170px;
  border-radius: 10px 0px 0px 10px;
  border: none;
  background-color: var(--color-background-button2);
  cursor: pointer;
}

button#size {
  width: 170px;
  border-radius: 0px 10px 10px 0px;
  background-color: var(--color-background-button2);
  border: none;
  cursor: pointer;
}
#button-ps .active {
  background-color: var(--color-background-button1);
}

@media (max-width: 500px) {
  #button-create {
    display: none;
  }
}

/* here start CSS desktop */
@media (min-width: 501px) {
  * {
    margin: 0px;
    padding: 0px;
  }

  a {
    text-decoration: none;
    color: var(--color-background-div-house);
  }

  #plus a img {
    display: none;
  }

  main {
    background-color: var(--color-background);
    width: 100vw;
  }

  div#head-main {
    width: 80%;
    background-color: var(--color-background);
    margin: auto;
    padding-top: 50px;
    display: grid;
    gap: 25px;
  }

  div#house-title {
    font-family: var(--font-Montserrat-Bold);
    font-size: 18px;
    margin-left: 0;
    font-weight: bold;
  }

  div#plus {
    background-image: url(../components/img/ic_plus_white@3x.png);
    background-repeat: no-repeat;
    background-size: 18px;
    background-position: left 10px center;
    width: 200px;
    height: 28px;
    background-color: var(--color-background-button1);
    border-radius: 5px;
    padding: 2px;
    display: flex;
    align-items: center;
    margin: auto;
    margin-right: 0%;
  }

  #button-create {
    margin-left: 40px;
    background-color: var(--color-background-button1);
    border: none;
    color: var(--color-background-div-house);
  }

  nav.head-button {
    display: flex;
    justify-content: space-between;
  }

  /*button reset*/

  div#search input#imp-search {
    width: 300px;
    height: 18px;
  }

  form {
    width: 360px;
  }

  div#button-ps {
    margin-right: 0%;
  }

  button#price {
    width: 150px;
    height: 32px;
  }

  button#size {
    width: 150px;
    height: 32px;
  }
}
</style>
