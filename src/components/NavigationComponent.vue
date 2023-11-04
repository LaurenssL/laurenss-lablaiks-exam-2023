<template>
  <nav id="nav-main" class="wrapper-navigation">
    <ol>
      <li v-for="link in links" :key="link.path">
        <router-link :to="link.path">{{ link.text }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { path: '/', text: 'SONGS' },
        { path: '/albums', text: 'ALBUMS' },
        { path: '/about', text: 'ABOUT' },
      ],
    };
  },
};
</script>
