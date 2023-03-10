<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import HousesData from "../api/houses";
import { required, numeric, integer, maxValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const route = useRoute();
const housesListed = ref("");

const state = reactive({
  streetName: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  zip: "",
  size: "",
  houseNumber: "",
  /*numberAddition: '',*/
  city: "",
  constructionYear: "",
  hasGarage: "",
  description: "",
  uploadFoto: "",
  loading: false,
});

onMounted(async () => {
  const idOfHouse = route.params.id;
  housesListed.value = housesListed.value = await (
    await HousesData.index({})
  ).data;

  const house = housesListed.value.find((x) => {
    if (x.id == idOfHouse) {
      console.log(x);
      return x;
    }
  });

  //to get only the house number
  let onlyNumbers = house.location.street.match(/\d+$/);
  let cleanStreet = house.location.street;
  let cleanNumber = "";

  if (typeof onlyNumbers[0] != "undefined") {
    cleanNumber = onlyNumbers[0];
    cleanStreet = house.location.street.replace(cleanNumber, "").trim();
  }

  state.streetName = cleanStreet;
  state.bedrooms = house.rooms.bedrooms;
  state.bathrooms = house.rooms.bathrooms;
  state.price = house.price;
  state.zip = house.location.zip;
  state.size = house.size;
  state.houseNumber = cleanNumber;
  /*numberAddition: house.,*/
  state.city = house.location.city;
  state.constructionYear = house.constructionYear;
  state.hasGarage = house.hasGarage;
  state.description = house.description;
  state.uploadFoto = house.image;
  console.log(house.image);
});

const rules = {
  streetName: { required },
  price: { required, numeric },
  bedrooms: { required, integer },
  bathrooms: { required, integer },
  zip: { required },
  size: { required },
  houseNumber: { required, integer },
  /*numberAddition: { required },*/
  city: { required },
  constructionYear: { required, integer, maxValue: maxValue(2023) },
  hasGarage: { required },
  description: { required },
  uploadFoto: { required },
};

const v$ = useVuelidate(rules, state);

const sendForm = async () => {
  state.loading = true;
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) {
    state.loading = false;
    return;
  }

  HousesData.edit(route.params.id, {
    streetName: state.streetName,
    houseNumber: state.houseNumber,
    /*'numberAddition': state.numberAddition,*/
    zip: state.zip,
    city: state.city,
    price: state.price,
    size: state.size,
    hasGarage: state.hasGarage,
    bedrooms: state.bedrooms,
    bathrooms: state.bathrooms,
    constructionYear: state.constructionYear,
    description: state.description,
    uploadFoto: state.uploadFoto,
  })
    .then(async () => {
      await HousesData.foto(route.params.id, state.uploadFoto);
      window.location.href = "/detail/" + route.params.id;

      // route.push('/detail/' + route.params.id);
    })
    .catch((error) => {
      console.log(error);
      console.log(state.hasGarage)
    });

  state.loading = false;
};
const uploadImage = (event) => {
  state.uploadFoto = event.target.files[0];
};
</script>

<template>
  <div class="loading" v-show="state.loading">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
  <main>
    <section class="content">
      <div id="content-title">
        <nav id="back-overview">
          <router-link to="/">
            <img
              src="../components/img/ic_back_grey@3x.png"
              alt="Back-overview"
            />
          </router-link>
          <p id="back">Back to overview</p>
        </nav>
        <h2>Edit listing</h2>
      </div>
      <div id="register">
        <div class="formb" id="street">
          <p>Street name*</p>
          <input
            type="text"
            v-model.trim="state.streetName"
            placeholder="Enter the street name"
          />
        </div>
        <span
          class="s-big"
          v-for="error of v$.streetName.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>

        <div class="double">
          <div class="form" id="h-number">
            <p>House number*</p>
            <input
              type="number"
              v-model="state.houseNumber"
              placeholder="Enter house number"
            />
          </div>
          <div class="form" id="add">
            <p>Addition (optional)</p>
            <input
              type="text"
              v-model="state.numberAddition"
              placeholder="e.g.A"
            />
          </div>
        </div>
        <span
          class="s-left"
          v-for="error of v$.houseNumber.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>

        <div class="formb" id="postal">
          <p>Postal code*</p>
          <input type="text" v-model="state.zip" placeholder="e.g.1000AA" />
        </div>
        <span class="s-big" v-for="error of v$.zip.$errors" :key="error.$uid"
          >{{ error.$message }}
        </span>

        <div class="formb" id="city">
          <p>City*</p>
          <input type="text" v-model="state.city" placeholder="e.g.Utrecht" />
        </div>
        <span class="s-big" v-for="error of v$.city.$errors" :key="error.$uid"
          >{{ error.$message }}
        </span>
        <div id="upload">
          <p>Upload picture(PNG or JPG)*</p>
          <div id="square-upload">
            <a href="">
              <input
                type="file"
                name="image"
                @change="uploadImage"
                accept="image/jpeg, image/png"
              /><img :src="state?.uploadFoto" alt="" />
            </a>
            <span v-for="error of v$.uploadFoto.$errors" :key="error.$uid"
              >{{ error.$message }}
            </span>
          </div>
        </div>
        <div class="formb" id="price-house">
          <p>Price*</p>
          <input
            type="number"
            v-model="state.price"
            placeholder="e.g. 150.000"
          />
        </div>
        <span class="s-big" v-for="error of v$.price.$errors" :key="error.$uid"
          >{{ error.$message }}
        </span>        
        <div class="double">
          <div class="form" id="size-house">
            <p>Size*</p>
            <input type="number" v-model="state.size" placeholder="e.g. 60m2" />
          </div>
          <div class="selectdiv" id="garage">
            <p>Garage*</p>
            <select 
            name="garageyn" 
            id="garageYorNot" 
            v-model="state.hasGarage"            >
              <option value="true">true</option>
              <option value="false">false</option>            
            </select>
            <!--<input type="text" v-model="state.hasGarage" placeholder="Select" />-->
          </div>
        </div>
        <span class="s-left" v-for="error of v$.size.$errors" :key="error.$uid"
          >{{ error.$message }}
        </span>
        <span
          class="s-right"
          v-for="error of v$.hasGarage.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>
        <div class="double">
          <div class="form" id="bedrooms">
            <p>Bedrooms*</p>
            <input
              type="number"
              v-model="state.bedrooms"
              placeholder="Enter amount"
            />
          </div>
          <div class="form" id="bathrooms">
            <p>Bathrooms*</p>
            <input
              type="number"
              v-model="state.bathrooms"
              placeholder="Enter amount"
            />
          </div>
        </div>
        <span
          class="s-left"
          v-for="error of v$.bedrooms.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>
        <span
          class="s-right"
          v-for="error of v$.bathrooms.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>
        <div class="formb" id="construction">
          <p>Construction date*</p>
          <input
            type="number"
            v-model="state.constructionYear"
            placeholder="e.g. 1990"
          />
        </div>
        <span
          class="s-big"
          v-for="error of v$.constructionYear.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>
        <div class="formb" id="description">
          <p>Description*</p>
          <input type="text" v-model="state.description" placeholder="" />
        </div>
        <span
          class="s-big"
          v-for="error of v$.description.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </span>
        <div id="post-button">
          <input
            id="botao"
            v-on:click="sendForm()"
            type="button"
            value="SAVE"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.selectdiv select {
  width: 150px;
  border-radius: 10px;
  height: 50px; 
  margin: 10px 0px;
  padding: 0px 24px;
  border: none;  
}


/*here start CSS desktop*/
main {
  background-color: var(--color-background);
  background-image: url("../components/img/img_background@3x.png");
  background-size: cover;
}
section.content {
  width: 80%;
  margin: auto;
  opacity: 90%;
}

#back-overview a img {
  width: 19px;
}

#back-overview {
  font-size: 18px;
  display: flex;
  column-gap: 12px;
  padding-top: 50px;
}

h2 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
}

div#register {
  width: 80%;
  padding-top: 30px;
}

#register span {
  font-family: var(--font-Montserrat-Medium-Italic);
  color: var(--color-background-button1);
  font-style: italic;
}
#register span.s-right {
  margin-left: 100px;
}

#register div p {
  color: var(--color-background-value);
  font-family: var(--font-Open-Sans-Semibold);
  font-weight: bold;
  margin-top: 10px;
}
.double {
  display: flex;
  column-gap: 22px;
}
.formb input {
  padding: 18px;
  width: 360px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
}

.form input {
  padding: 18px;
  width: 150px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
}

div#square-upload {
  width: 100px;
  height: 100px;
  border: 3px dashed gray;
  display: grid;
  margin-bottom: 20px;
  margin-top: 20px;
}

#square-upload img {
  width: 100px;
  height: 100px;
}

#square-upload a {
  width: 100px;
  margin: auto;
  text-align: center;
  position: relative;
}

#square-upload a input {
  position: absolute;
}

div#description input {
  height: 90px;
}

div#post-button {
  display: flex;
  justify-content: end;
  width: 400px;
  margin-top: 20px;
  margin-right: 30px;
}

#post-button input {
  background-color: var(--color-background-button1);
  color: var(--color-background-div-house);
  padding: 16px;
  width: 200px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

#botao:hover {
  font-weight: bold;
  background-color: var(--color-background-button1);
}

/*here start CSS mobile*/
@media (max-width: 500px) {
  * {
    margin: 0px;
    padding: 0px;
  }

  section.content {
    width: 100%;
  }

  #register span {
    font-size: 12px;
  }

  #register span.s-big {
    position: relative;
    top: 5px;
  }

  #back {
    display: none;
  }

  .content {
    width: 320px;
    margin: auto;
  }

  nav#back-overview {
    margin: auto;
  }

  div#content-title {
    width: 320px;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  #content-title h2 {
    font-size: 24px;
    margin: auto;
    padding-top: 40px;
  }

  .formb p {
    text-align: start;
    margin-bottom: 10px;
  }

  .formb input {
    width: 280px;
    margin: auto;
  }

  .form p {
    text-align: start;
  }

  .form input {
    width: 115px;
  }

  #upload p {
    text-align: start;
  }

  div#register {
    width: 320px;
    margin: auto;
  }

  #register div p {
    font-size: 14px;
  }

  .double {
    width: 320px;
    justify-content: space-between;
    margin: auto;
  }

  main {
    width: 360px;
    margin: auto;
    background-position: bottom;
    background-size: 340px 420px;
    background-repeat: no-repeat;
  }

  div#post-button {
    width: 320px;
    padding-bottom: 20px;
  }

  #post-button input {
    width: 300px;
    margin: auto;
  }
}

/* CSS animation loading */
.loading {
  width: 100%;
  height: auto;
  display: flex;
  position: fixed;
  background-color: var(--color-background-button1);
  justify-content: center;
  z-index: 99;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid var(--color-background-div-house);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
