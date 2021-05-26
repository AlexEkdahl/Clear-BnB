<template>
  <div class="card" @click="goToHouse" v-if="getImg">
    <!-- v-bind: (short ':') binds an attribute
          to a reactive varaible -->
    <img :src="imageList[0]" alt="" />
    <h3>{{ city.city }}</h3>
    <p>{{ city.description }}</p>
    <div class="text">Read more</div>
  </div>
</template>

<script>
export default {
  props: ['city'],
  data() {
    return {
      imageList: [],
    }
  },

  methods: {
    goToHouse() {
      this.$router.push('/details/' + this.city.id)
    },
  },
  computed: {
    async getImg() {
      await this.$store.dispatch('getFileUrl', this.city.id)
      this.imageList = this.$store.state.imageList
    },
  },
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 6fr 1fr;
  grid-template-areas:
    'box1 box2'
    'box1 box3'
    '. text';
  align-content: center;
  justify-content: center;
  background-color: rgba(243, 243, 243, 0.9);

  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  width: 50%;
  height: 220px;
  transition: 0.4s;
  margin-bottom: 1rem;
}
.card:hover {
  transform: scale(1.05);
}
img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  grid-area: box1;
  transition: 0.3s;
  object-fit: cover;
}

h3 {
  margin-left: 10px;
  grid-area: box2;
}

.text {
  grid-area: text;
  text-align: right;
  font-weight: 600;
}

p {
  overflow: hidden;
  margin-left: 10px;
  grid-area: box3;
}

@media screen and (max-width: 850px) {
  img {
    /* width: 150px; */
  }

  .card {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 730px) {
  .card {
    height: 180px;
  }
}
@media screen and (max-width: 400px) {
  .card {
    width: 100%;
  }
}
</style>
