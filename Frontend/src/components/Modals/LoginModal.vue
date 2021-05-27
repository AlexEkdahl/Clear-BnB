<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h1 v-if="!isVisibility">Login</h1>
          <h1 v-if="isVisibility">Register</h1>
        </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <LoginForm v-if="!isVisibility" @login="sendLog" />
          <AddUserForm v-if="isVisibility" @close="close" />
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
        <button
          v-if="!isVisibility"
          type="button"
          class="btn-modal"
          @click="registerForm"
        >
          Register
        </button>
        <button
          v-if="isVisibility"
          type="button"
          class="btn-modal"
          @click="registerForm"
        >
          Login
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import store from '../../store.js'
import AddUserForm from '../User/AddUserForm.vue'
import LoginForm from '../User/LoginForm.vue'
export default {
  data() {
    return {
      isVisibility: false,
    }
  },
  components: {
    AddUserForm,
    LoginForm,
  },
  computed: {
    loginCheck() {
      return
    },
  },
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close')
      this.isVisibility = false
      store.commit('setFailedLogin', false)
    },

    sendLog() {
      this.$emit('login')
    },

    registerForm() {
      this.isVisibility = !this.isVisibility
      store.commit('setFailedLogin', false)
    },
  },
}
</script>

<style scoped>
.modal {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  width: 400px;
  /* height: 500px; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 75% 10%;
  border-radius: 5px;
  padding: 10px;
  z-index: 11;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #007973a6;

  justify-content: space-between;
}
.modal-footer {
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid #eeeeee;
  margin-bottom: 20px;
}
.modal-body {
  position: relative;
  padding: 20px 10px 0 10px;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #007973a6;

  background: transparent;
}
.btn-modal {
  color: white;
  background: #007973a6;
  border: none;
  border-radius: 3px;
  width: 100px;
  margin: 3px;
  align-self: center;
  justify-self: center;
  padding: 5px;
}
.btn-modal:hover {
  cursor: pointer;
  transform: scale(1.05);
  background-color: #007973a6;
}
h1{
  margin: 20px;
}
@media screen and (max-width: 370px){
  .modal{
    transform: scale(0.8);
  }
}
</style>
