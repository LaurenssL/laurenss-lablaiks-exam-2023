<template>
    <div id="about-view">
      <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
          <button id="btn-edit" :class="{ active: edit }" @click="edit = !edit">{{ edit ? "Cancel" : "Edit Form" }}</button>
          <button id="btn-save" v-if="edit" class="submit" @click="saveForm()">Save Form</button>
        </div>
      </div>
      <form>
        <div class="wrapper-input">
          <label>NAME</label>
          <input id="input-name" v-if="edit" v-model="user.name" />
          <p id="txt-name" v-if="!edit">{{ user.name }}</p>        
        </div>
        <div class="wrapper-input">
          <label>SURNAME</label>
          <input id="input-surname" v-if="edit" v-model="user.surname" />
          <p id="txt-name" v-if="!edit">{{ user.surname }}</p>
        </div>
        <div class="wrapper-input">
          <label>STUDENT CODE</label>
          <input id="input-code" v-if="edit" v-model="user.code" />
          <p id="txt-name" v-if="!edit">{{ user.code }}</p>
        </div>
        <div class="wrapper-songs">
          <label>FAVORITE SONGS</label>
          <ul v-if="favorite_songs.length > 0">
            <li v-for="song in favorite_songs">
              <img id="img-album" :src="song.album.images[1].url" />
              <div class="song-info">
                <p id="txt-song" class="song-name">{{ song.name }}</p>
                <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
              </div>
            </li>
          </ul>
          <div id="txt-empty" v-else class="empty">NO SONGS FOUND</div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth.js';
  import songsAPI from '../data/songs.js'
  
  export default {
    data() {
      const authStore = useAuthStore();
      return {
        authStore,
        edit: false,
        user: {
          name   : authStore.user.name,
          surname: authStore.user.surname,
          code   : authStore.user.code
        }
      }
    },
    methods: {
      getArtists(artists) {
        return artists.map(artist => artist.name).join(", ");
      },
      saveForm() {
        this.authStore.setUserData(
          this.user.name, 
          this.user.surname, 
          this.user.code
        );
        this.edit = false;
      }
    },
    computed: {
      favorite_songs() {
        return this.authStore.getFavoriteSongs.map(songID => {
          return songsAPI.find(song => song.id === songID);
        });
      }
    }
  }
  </script>