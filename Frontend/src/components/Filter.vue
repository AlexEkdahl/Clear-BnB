<template>
  <div class="wrapper container">
    <div class="filter">
      <div class="right-box">
        <div class="input-holder">
          <select @change="filterObjects" class="city" v-model="city">
            <option value="">All cities</option>
            <option
              v-for="object in cityOption"
              :key="object.id"
              :value="object"
            >
              {{ object }}
            </option>
          </select>
          <input
            @change="filterObjects"
            class="number-input"
            type="number"
            v-model="beds"
            min="1"
            placeholder="Beds"
          />
        </div>
        <input
          @keyup="filterObjects"
          class="search"
          type="text"
          v-model="text"
          placeholder="Search..."
        />
        <Calendar class="calendar"><template v-slot:start></template></Calendar>
      </div>
      <div class="price-box">
        <label class="price" for="vol">Price {{ range }} $</label>
        <input
          @change="filterObjects"
          type="range"
          v-model="range"
          min="300"
          max="1500"
          step="10"
        />
      </div>
    </div>
  </div>

  <div v-if="fetching" class="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <RentalObject
    v-else
    v-for="object in objects"
    :key="object.id"
    :object="object"
  />
  <div class="no-match" v-if="objects.length == 0 && !fetching">No match</div>
</template>

<script>
import RentalObject from './RentalObject.vue'
import Calendar from './Calendar.vue'
export default {
  components: {
    RentalObject,
    Calendar,
  },

  data() {
    return {
      text: '',
      city: '',
      objects: [],

      range: 900,
      beds: '',
      timeOut: '',
      fetching: true,
    }
  },

  watch: {
    '$store.state.chosenDates'() {
      this.filterObjects()
    },
  },

  computed: {
    cityOption() {
      if (!this.$store.state.cityNames) {
        return ['loading']
      } else {
        return this.$store.state.cityNames
      }
    },
  },

  async created() {
    if (this.$store.state.searchObject) {
      this.city = this.$store.state.searchObject.city
      this.beds = this.$store.state.searchObject.guests
      this.$store.commit('removeSearchObject')
      this.filterObjects()
    } else {
      this.fetchFromUrl()
    }
  },
  methods: {
    async filterObjects() {
      this.fetching = true
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(async () => {
        let params = []
        let bed = this.beds ? `availableBeds>=${this.beds}` : null
        let city = this.city ? `city=${this.city}` : null
        let price = this.range ? `price<=${this.range}` : null
        let availableFrom = this.$store.state.chosenDates
          ? `availableFrom<=${this.$store.state.chosenDates[0]}`
          : null
        let availableTo = this.$store.state.chosenDates
          ? `availableTo>=${this.$store.state.chosenDates[1]}`
          : null
        let search = this.text ? `search=${this.text}` : null

        params.push(bed, city, price, availableFrom, availableTo, search)
        params = params.filter((a) => a != null)
        params = params.join('&')
        let query = params
        this.$router.replace({ query: { query: params } })

        let res = await fetch(`/rest/rental-objects/filter/query?${query}`)
        this.objects = await res.json()
        this.fetching = false
      }, 300)
    },

    async fetchFromUrl() {
      if (this.$route.query.query) {
        let res = await fetch(
          `/rest/rental-objects/filter/query?${this.$route.query.query}`
        )
        this.objects = await res.json()
        this.fetching = false
      } else {
        this.filterObjects()
      }
    },
  },
}
</script>

<style scoped>
.filter {
  margin-top: 0.2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.no-match {
  font-size: 3rem;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: rgb(245, 245, 245);
  box-shadow: 1px 1px 2px 1px rgb(175, 170, 170);
  width: 100%;
  font-size: 1.2rem;
}

.container {
  padding: 2rem;
}

input,
select,
.calendar {
  height: 32px;
  border-radius: 5px;
  border: 1px solid rgb(126, 126, 126);
  color: black;
  background-color: white;
}

.calendar {
  margin-top: 8px;
  width: 95%;
}

.number-input {
  width: 20%;
}

.price-box {
  display: flex;
  height: 32px;
  align-items: center;
  flex-direction: column;
  align-self: flex-end;
  margin-bottom: 0.5rem;
}

.price {
  margin-right: 1rem;
}

.city {
  width: 60%;
  margin-right: 3%;
}

.search {
  margin-top: 0.5rem;
  width: 95%;
}

input[type='range'] {
  -webkit-appearance: none;
  border: none;
  background-color: rgb(245, 245, 245);
  width: 150px;
}

input[type='range']::-webkit-slider-runnable-track {
  width: 50px;
  height: 0.4rem;
  background: rgb(219, 240, 219);
  border: 1px solid rgb(134, 128, 128);
  border-radius: 10px;
}

input[type='range']::-moz-range-track {
  width: 150px;
  height: 0.3rem;
  background: rgb(219, 240, 219);
  border: 1px solid rgb(134, 128, 128);
  border-radius: 10px;
}

input[type='range']:focus::-webkit-slider-runnable-track {
  background: rgba(210, 241, 210, 0.329);
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 1rem;
  width: 0.7rem;
  border-radius: 30px 1px 30px 1px;
  border: 1px solid rgb(27, 65, 27);
  background: #007973a6;
  margin-top: -0.3rem;
}

input[type='range']::-moz-range-thumb {
  border: none;
  height: 0.9rem;
  width: 0.6rem;
  border-radius: 30px 1px 30px 1px;
  border: 1px solid rgb(27, 65, 27);
  background: #007973a6;
  margin-top: -0.3rem;
}

.lds-spinner {
  font-size: 3rem;

  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

input{
  padding: 0 0 0 5px ;
}

select{
  padding: 0 5px;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media screen and (max-width: 840px) {
}

@media screen and (max-width: 600px) {
  .price-box {
    flex-direction: column;
  }

  .input-holder,
  .right-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .right-box {
    flex-direction: column;
  }
  .price-box {
    align-self: center;
    margin: 1.2rem;
  }

  .filter {
    flex-direction: column;
    justify-content: center;
    width: 20rem;
    flex-shrink: 2;
  }

  .wrapper {
    justify-content: center;
    padding: 0;
  }
}
</style>
