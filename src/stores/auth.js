import { defineStore } from 'pinia'
import router from "../router"

export const useAuthStore = defineStore('player', {
  state: () => ({
    user: {
      name: "Laurenss",
      surname: "Lablaiks",
      code: "IT21046",
      favourite_songs: localStorage.favourite_songs ? localStorage.favourite_songs.split(",") : []
    },
    authenticated: localStorage.authenticated ?? false,
  }),
  getters: {
    getFavoriteSongs() {
      return this.user.favourite_songs;
    },
    is_authenticated() {
      localStorage.authenticated ?? false;
      return localStorage.getItem("is_authenticated") !== null ? localStorage.is_authenticated === "true" : this.authenticated;
    },
  },
  actions: {
    setUserData(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },
    authenticate(email, password) {
      if (email === "laurenss.lablaiks@va.lv" && password === "123456") {
        localStorage.authenticated = true;
        this.authenticated = true;
        router.push("/");
      }
    },
    logout() {
      localStorage.clear();
      this.authenticated = false;
      router.push("/login");
    },
    toggleFavorite(songID) {
      const index = this.user.favourite_songs.indexOf(songID);
      if (index < 0) {
        this.user.favourite_songs.push(songID);
      } else {
        this.user.favourite_songs.splice(index, 1);
      }
      localStorage.favourite_songs = this.user.favourite_songs;
    },
  },
})
