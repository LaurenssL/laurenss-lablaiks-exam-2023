<template>
  <div id="login-view">
      <form class="login-form">
          <div class="wrapper-logo">
              <img src="@/assets/logo.svg" />
              <div>KRAKEN.FM</div>
          </div>
          <input id="input-email" placeholder="E-mail" v-model="userForm.email" />
          <input id="input-password" placeholder="Password" type="password" v-model="userForm.password" />
          <button id="btn-submit" type="submit" :disabled="disabled" @click="authStore.authenticate(userForm.email, userForm.password)">LOGIN</button>
      </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
export default {
  data() {
      const authStore = useAuthStore();
      return {
        authStore,
          userForm: {
              email: '',
              password: ''
          }
      }
  },
  computed: {
      disabled() {
          return this.userForm.email.trim().length == 0 || this.userForm.password.trim().length < 6;
      }
  }
}
</script>