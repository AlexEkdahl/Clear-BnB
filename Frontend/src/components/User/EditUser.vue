<template>
  <div class="mypage-container">
    <div class="overlay">
      <div class="sidebar"><SideBar /></div>
      <div class="info">
        <div class="user-box">
          <h1>Edit my info</h1>
          
          <div v-if="!user"></div>
          <div v-else class="user-info">
            <form class="user-info" @submit.prevent="dispatch">
            <input class="border-radius" type="text" v-model="value.firstName" placeholder="Firstname.." required>
	          <input class="border-radius" type="text" v-model="value.lastName" placeholder="Lastname.." required>
	          <input class="border-radius" type="text" v-model="value.email" placeholder="email.." required>
	          <input class="border-radius" type="number" v-model="value.phoneNumber" placeholder="Phonenumber..">
	          <input class="border-radius" type="text" v-model="value.city" placeholder="City..">
	          <input class="border-radius" type="text" v-model="value.address" placeholder="Address..">
            <input class="border-radius" type="submit" value="Send">
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../Sidebar/Sidebar.vue'
import store from '../../store.js'
export default {
  components: { SideBar },
  methods:{
  getInfo(indata){
    this.user1 = this.$store.state.user
    for(let [key, value] of Object.entries(this.user1)){
      if(key == indata){
        return value
      }
    }
   },
   dispatch(){
     let urlString = []
     let updatedInfo = {
       firstName: this.value.firstName,
       lastName: this.value.lastName,
       email: this.value.email,
       phoneNumber: this.value.phoneNumber,
       city: this.value.city,
       address: this.value.address,
       }
    this.user1 = this.$store.state.user
        for(const[key, updated] of Object.entries(updatedInfo)){
          for(const[key1, normal] of Object.entries(this.user1)){
            if(key=== key1 && updated != normal){
            urlString.push(key +'='+updated)
            break 
          }
        }
      }
    
      this.$store.dispatch('updateUser', urlString.join('&'))
      this.$router.push('/my-page')
    },
  },
  
  data(){
    return{
      user1:'',
		value:{
			firstName: this.getInfo('firstName'),
			lastName: this.getInfo('lastName'),
			email: this.getInfo('email'),
			phoneNumber: this.getInfo('phoneNumber'),
			city: this.getInfo('city'),
			address: this.getInfo('address'),
		}
    }
	},
	computed: {
  user() {
  return this.$store.state.user
  },
  },
  async beforeRouteEnter(to, from, next) {
    if (!store.state.user) {
      await store.dispatch('whoAmI')
      if (store.state.user) {
        next()
      } else {
        next((vm) => {
          vm.$router.push('/')
        })
      }
    } else {
      next()
    }
  },
  
}
</script>

<style scoped>
.mypage-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 65rem;
  height: 100%;
}
.overlay {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(205, 205, 205, 0.6);
  height: 100%;
}
.user-info {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  height: 60%;
  text-align: start;
  padding: 30px;
}
.info {
  background: rgb(255, 255, 255);
  border: 2px solid black;
  color: black;
  text-align: center;
  margin: 20px auto 20px auto;
  width: 700px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 2px rgba(144, 144, 144, 0.603);
  transition: 0.4s;
}

input{
  margin:10px;
  border-radius: 5px;
  border: solid 1px grey;
  padding: 5px 10px;
}

.user-box {
  height: 60%;
}
label {
  width: 150px;
  cursor: pointer;
  background: rgb(201, 232, 201);
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid black;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  text-align: center;
}
label:hover {
  background: #c4eafd;
  cursor: pointer;
}
@media screen and (max-width: 850px) {
  .info {
    width: 500px;
  }
  .user-info {
    font-size: 15px;
  }
}
@media screen and (max-width: 560px) {
  .info {
    width: 350px;
  }
  .user-info {
    font-size: 15px;
  }
}
@media screen and (max-width: 400px) {
  .sidebar1 {
    max-width: 40rem;
    font-size: 15px;
  }
  .info {
    margin: 20px auto 20px auto;
    width: 250px;
    padding: 10px;
    font-size: 15px;
  }
  .user-info {
    font-size: 12px;
  }
}
</style>