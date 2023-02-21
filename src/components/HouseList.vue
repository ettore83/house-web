<script setup>
import { computed } from "vue";

const props = defineProps({
  housesData: Object,
  wordSearch: String,
  orderColumns: Array,
  sortKey: String,
  sortOrders: Object,
});

//code to searching
const resultFilter = computed(() => {
  let dataNoFilter = props.housesData;
  let dataFiltered = dataNoFilter.filter((row) => {
    let vaSearch = props.wordSearch.toLowerCase();
    let vaStreet = row.location.street.toLowerCase();
    let vaZip = row.location.zip.toLowerCase();
    let vaCity = row.location.city.toLowerCase().indexOf(vaSearch);
    let vaPositionStreet = vaStreet.indexOf(vaSearch);
    let vaPositionZip = vaZip.indexOf(vaSearch);

    return vaPositionStreet > -1 || vaPositionZip > -1 || vaCity > -1;
  });

  //code to order
  const key = props.sortKey;
  if (key) {
    const order = props.sortOrders[key];
    dataFiltered = dataFiltered.slice().sort((a, b) => {
      a = a[key];
      b = b[key];

      return (a === b ? 0 : a > b ? 1 : -1) * order;
    });
  }

  return dataFiltered;
});
</script>
<template>
  <!--if used to results founded-->
  <div class="results" v-if="resultFilter.length > 0">
    {{ resultFilter.length }} results found
  </div>

  <!--else used to img not found-->
  <div class="no-results" v-else>
    <img src="../components/img/img_empty_houses@3x.png" alt="img no found" />
  </div>

  <!--div to receive API data-->
  <div
    id="content-main"
    v-for="item of resultFilter"
    v-bind:key="item.id"
    v:key="item.id"
  >
    <nav class="house">
      <nav class="picturehouse">
        <router-Link :to="{ name: 'detail', params: { id: item.id } }">
          <img v-bind:src="item.image" alt="house img" />
        </router-Link>
      </nav>
      <nav class="information">
        <p id="street">
          <router-Link :to="{ name: 'detail', params: { id: item.id } }">
            <strong>{{ item.location.street }}</strong>
          </router-Link>
        </p>
        <p id="value">&euro;{{ item.price }}</p>
        <p id="city">{{ item.location.zip }} {{ item.location.city }}</p>
        <div class="information02">
          <p class="bed">
            <img src="../components/img/ic_bed@3x.png" alt="" />{{
              item.rooms.bedrooms
            }}
          </p>
          <p class="bath">
            <img src="../components/img/ic_bath@3x.png" alt="" />{{
              item.rooms.bathrooms
            }}
          </p>
          <p class="square">
            <img src="../components/img/ic_size@3x.png" alt="" />{{ item.size }}
            m2
          </p>
        </div>
      </nav>
      <nav class="edit" v-show="item.madeByMe">
        <img src="../components/img/ic_delete@3x.png" alt="delete" />
        <router-Link :to="{ name: 'edit', params: { id: item.id } }"
          ><img src="../components/img/ic_edit@3x.png" alt="edit"
        /></router-Link>
      </nav>
    </nav>
  </div>
  
</template>

<style scoped>
/* CSS mobile */
#content-main {
  width: 360px;
  margin: auto;
  margin-top: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.126);
  border-radius: 10px;
}
nav.house {
  border-radius: 5px;
  width: 320px;
  height: 120px;
  background-color: var(--color-background-div-house);
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  margin: auto;
}
div nav.house nav.picturehouse img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 10px;
}
div nav.house nav.edit > img {
  width: 12px;
  height: 13px;
  margin-left: 10px;
  float: right;
}
div nav.house nav.edit > a > img {
  width: 12px;
  height: 13px;
  margin-left: 10px;
  float: right;
}
div nav.house nav.information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: var(--font-Open-Sans-Regular);
  font-size: 12px;
}
div nav.house nav.information div.information02 {
  display: flex;
}
div.information02 p {
  color: var(--color-background-button2);
  padding-right: 2px;
  padding-top: 4px;
}
.information02 img {
  width: 12px;
  padding-right: 5px;
}
.edit {
  padding: 5px;
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
/* CSS To Show results*/
.results {
  width: 80%;
  margin: auto;
  margin-top: 20px;
}

/*CSS img not found mobile*/
.no-results {
  margin: auto;
  text-align: center;
  margin-top: 50px;
  height: 280px;
}
.no-results img {
  width: 250px;
  margin: auto;
}

/* Here start CSS desktop */
@media (min-width: 500px) {
  #content-main {
    width: 80%;
    margin: auto;
    margin-top: 20px;
  }

  div nav.house {
    margin: auto;
    border-radius: 5px;
    width: 100%;
    height: 120px;
    background-color: var(--color-background-div-house);
    margin-top: 10px;
    display: grid;
    grid-template-columns: 120px auto auto;
  }
  nav.information {
    gap: 6px;
  }
  nav.container {
    width: 800px;
    margin-top: 0px;
    justify-content: space-between;
    column-gap: 20%;
  }

  /*img not found desktop */
  .no-results {
    width: 80%;
    height: 400px;
    margin: auto;
    text-align: center;
    display: flex;
  }
  .no-results img {
    width: 300px;
    margin: auto;
  }
}
</style>
