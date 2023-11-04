<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg" alt="logo"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{ fullName }}</h3>
            </div>
            <button id="btn-logout" @click="auth.logout()">LOGOUT</button>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
export default {
    data() {
        const auth = useAuthStore();
        return {
            auth
        }
    },
    computed: {
        fullName() {
            return `${this.auth.user.name} ${this.auth.user.surname}`;
        }
    }
    }
</script>