<template>
    <div id="album-view">
      <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
          <button id="btn-grid" :class="{ active: is_grid }" @click="is_grid = true">
            <IconGrid />
          </button>
          <button id="btn-list" :class="{ active: !is_grid }" @click="is_grid = false">
            <IconList />
          </button>
        </div>
      </div>
      <ul id="list-albums" :class="{ grid: is_grid }">
        <li class="album" v-for="album in albums" @click="selectAlbum(album.id)" :class="{ active: store.getNowPlayingAlbumID === album.id }">
          <img id="img-album" :src="album.images[0].url" />
          <div class="album-info">
            <h4 class="txt-album-name">{{ album.name }}</h4>
            <p class="txt-album-artists">{{ getArtists(album.artists) }}</p>
            <div class="album-year">
              <p id="txt-album-year">{{ getYear(album.releaseyear) }}</p>
              <p id="txt-album-tracks">{{ album.tracks.length > 1 ? `${album.tracks.length} songs` : `${album.tracks.length} song` }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import songsAPI from '../data/songs.js'
  import { usePlayerStore } from '../stores/player.js';
  import IconGrid from '../components/icons/IconGrid.vue'
  import IconList from '../components/icons/IconList.vue'
  
  export default {
    components: { 
      IconGrid, 
      IconList, 
    },
    data() {
      const store = usePlayerStore();
      return {
        store,
        is_grid: true,
        clicks: 0
      }
    },
    methods: {
      selectAlbum(albumID) {
        this.clicks++;
        let timer;
        if (this.clicks === 1) {
          timer = setTimeout(() => {
            this.clicks = 0;
          }, 500);
        } else {
          clearTimeout(timer);
          this.store.setPlaylist(this.albums[albumID].tracks);
          this.store.setNowPlaying(this.albums[albumID].tracks[0]);
          this.clicks = 0;
        }
      },
      getArtists(artists) {
        return artists.map(artist => artist.name).join(', ');
      },
      getYear(date) {
        const year = new Date(date);
        return year.getFullYear();
      },
    },
    computed: {
      albums() {
        return songsAPI.reduce((accumulator, currentSong) => {
          accumulator[currentSong.album.id] = accumulator[currentSong.album.id] || {
            ...currentSong.album,
            tracks: []
          };
          accumulator[currentSong.album.id].tracks.push(currentSong);
          return accumulator;
        }, Object.create(null));
      }
    }
  }
  </script>