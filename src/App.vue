<template>
    <!--  HEADER  -->
    <Header v-if="setup"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <Navigation v-if="setup"></Navigation>
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player">
        <AudioPlayer v-if="setup"></AudioPlayer>
    </div>
    <!--  PLAYER END  -->
</template>

<script>
import Header from './components/HeaderComponent.vue';
import AudioPlayer from './components/AudioPlayerComponent.vue';
import Navigation from './components/NavigationComponent.vue'
import { useAuthStore } from './stores/auth';

    export default {
        components: {
            Header,
            AudioPlayer,
            Navigation,
        },
        computed: {
            setup(){
                const authStore = useAuthStore();
                return authStore.is_authenticated;
            }
        },
    }
</script>
