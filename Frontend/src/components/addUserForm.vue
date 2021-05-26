<template>
  <form @submit.prevent="addUser">
    <input
    class="border-radius border-grey"
      v-model="firstName"
      required
      type="text"
      placeholder="Enter firstname"
    />
    <input
   class="border-radius border-grey"
      v-model="lastName"
      required
      type="text"
      placeholder="Enter lastname"
    />
    <input
    class="border-radius border-grey"
     v-model="email"
      required type="text" 
      placeholder="Enter email" />
    <input
    cclass="border-radius border-grey"
      v-model="phoneNumber"
      required
      type="text"
      placeholder="Enter phonenumber"
    />
    <input
   class="border-radius border-grey"
      v-model="password"
      required
      type="password"
      placeholder="Enter password"
    />
    <input
    class="border-radius border-grey"
      v-model="rePassword"
      required
      type="password"
      placeholder="Re-enter password"
    />
    <p v-if="userTaken === true">User already exists</p>
    <p v-if="!validatePassword && rePassword">Passwords don´t match</p>
    <div class="register-btn">
      <button type="reset">Clear</button>
      <div>
        <button :disabled="!validatePassword || !rePassword">Create user</button>
      </div>
    </div>
  </form>
</template>

<script>
import store from '../store.js'
export default {
  computed: {
    validatePassword() {
      return this.rePassword === this.password
    },
    userTaken() {
      return (this.userExists = this.$store.state.failedLogIn)
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      rePassword: '',
      userExists: false,
    }
  },
  methods: {
    addUser() {
      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
      }

      this.$store.dispatch('registerUser', user)
      if (this.userExists === true) {
        return
      } else {
        store.commit('setFailedLogin', false)
      }
    },
  },
}
</script>

<style scoped>
input {
  margin: 8px;
  text-decoration: none;
  width: 300px;
  height: 40px;
  justify-self: center;
  align-self: center;
}
button {
  width: 140px;
  margin: 10px 10px;
  background-color: #007973a6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
}
button:hover {
  cursor: pointer;
  background-color: #007973a6;
  transform: scale(1.05);
}
button:disabled:hover{
  cursor: not-allowed;
  opacity: 0.5;
}
input:focus {
  outline: none;
}
.register-btn {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

p {
  color: red;
  font-weight: 800;
  text-decoration: underline;
}

input{
  padding: 5px 10px;
}


</style>
