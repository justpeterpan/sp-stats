<template>
  <button @click="handleLogin" v-if="!user.id">Login</button>
  <div v-if="user.id">
    <div>Displayname: {{ user.display_name }}</div>
    <div>ID: {{ user.id }}</div>
    <div>
      <ul>
        <li v-for="(artist, index) in artists" :key="index">artist.name</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from 'vue';

defineProps({
  msg: String,
});

const handleLogin = () => {
  window.document.location.href = '';
};

const extractAccessToken = () => {
  const url = window.document.location.search;
  const regexAccessToken = /=(.*)/;
  const accessToken = url.match(regexAccessToken)[1];

  const bearerToken = `Bearer ${accessToken}`;
  return bearerToken;
};

const handleUserData = async () => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: extractAccessToken(),
    },
  });
  user.value = await response.json();
};

const getTopAlbums = async () => {
  const response = await fetch(
    'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50',
    {
      headers: {
        Authorization: extractAccessToken(),
      },
    },
  );
  const { items } = await response.json();
  artists.value = await items;
  console.log(items);
};

onMounted(async () => {
  await handleUserData();
  await getTopAlbums();
});
const artists = ref([]);
const user = ref({});
const state = reactive({ count: 0 });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
