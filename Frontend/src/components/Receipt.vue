<template>
  <div class="view">
    <div class="receipt-card">
      <div class="col-1">
        <div class="img" v-if="getImg">
          <img :src="imageList[0]" alt="" />
        </div>
      </div>
      <div class="col-2">
        <h4>Booking: {{ receipt.id }}</h4>
        <h5>
          Check in:
          {{
            new Date(receipt.startDate)
              .toLocaleDateString('sv-SE')
              .replaceAll('/', '-')
          }}
        </h5>
        <h5>
          Check out:
          {{
            new Date(receipt.endDate)
              .toLocaleDateString('sv-SE')
              .replaceAll('/', '-')
          }}
        </h5>
        <p>Adults: {{ receipt.numAdult }}</p>
        <p>Children: {{ receipt.numChild }}</p>
        <p>Price: {{ receipt.totalPrice }}$</p>
      </div>
      <div class="col-3">
        <div class="btns">
          <button class="btn-link" @click="goToHouse">Details</button>
          <button class="btn-remove" @click="deleteReceipt">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['receipt'],
  data() {
    return {
      imageList: [],
    }
  },

  methods: {
    goToHouse() {
      this.$router.push('/details/' + this.receipt.rentalObjectId)
    },
    deleteReceipt() {
      this.$store.dispatch('deleteReceipt', this.receipt)
      this.$emit('deleteBooking', this.receipt)
    },
  },

  computed: {
    async getImg() {
      await this.$store.dispatch('getFileUrl', this.receipt.rentalObjectId)
      this.imageList = this.$store.state.imageList
    },
  },
}
</script>

<style scoped>
.btns {
  display: grid;
  position: absolute;
  right: 0;
  bottom: 0;
}

 button {
  width: 100px;
  cursor: pointer;
  background: rgb(201, 232, 201);
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid black;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  text-align: center;
  margin: 0px 25px 15px 0;
}

button:hover {
  background: #c4eafd;
  cursor: pointer;
}

.btn-remove {
  bottom: 5px;
}

.btn-link {
  bottom: 55px;
}


.view {
  display: grid;
  width: 100%;
}

.img {
  padding: 5px;
  justify-self: center;
  align-self: center;
}

.receipt-card {
  display: grid;
  grid-template-columns: 35% 45% 20%;
  grid-template-areas: 'box1 box2 box3';
  border-radius: 10px;
  height: fit-content;
  width: 80%;
  justify-self: center;
  align-self: center;
  margin: 30px 0;
  color: black;
  box-shadow: 5px 5px 10px 2px rgba(144, 144, 144, 0.603);
  padding: 5px;
  transition: 0.4s;
  background-color: white;
  border: 1px solid rgb(173, 169, 169);
}

.col-1 {
  display: grid;
  justify-items: center;
  grid-area: box1;
  width: 100%;
}

.col-2 {
  grid-area: box2;
  padding: 5px;
}

.col-3 {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: box3;
}

.img {
  width: 100%;
  display: grid;
}

img {
  width: 80%;
  height: 200px;
  justify-self: center;
}
@media screen and (max-width: 1150px) {
  .receipt-card {
    width: 600px;
  }
}

@media screen and (max-width: 800px) {
  .receipt-card {
    display: grid;
    grid-template-columns: 1fr 0.6fr;
    grid-template-rows: 1fr 0.2fr;
    grid-template-areas:
      'box1 box2'
      'box3 box3';
    width: 500px;
    font-size: 15px;
    height: fit-content;
    padding: 5px;
  }

  .btns {
    display: flex;
  }

  .text {
    margin-bottom: 5px;
  }
}

@media screen and (max-width: 550px) {
  .receipt-card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.4fr 0.2fr;
    grid-template-areas:
      'box1'
      'box2'
      'box3';
    width: 300px;
    padding: 5px;
  }

  .btns {
    display: flex;
  }

  .text {
    margin-bottom: 5px;
  }
}
@media screen and (max-width: 350px) {
  .receipt-card {
    width: 230px;
  }

  p {
    display: none;
  }
}
</style>
