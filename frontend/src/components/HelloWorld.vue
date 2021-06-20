<template>
  <div>
    <div
      v-if="!state?.user?.value?.id"
      class="h-screen flex flex-col items-center justify-center"
    >
      <button
        @click="handleLogin"
        class="border rounded px-4 py-2 w-full text-white"
      >
        Login
      </button>
    </div>
    <div v-if="state?.user?.value?.id">
      <h1 class="my-4 text-white font-bold text-3xl">SP Stats</h1>

      <ul>
        <artist-card
          v-for="(artist, index) in state.artists.value"
          :key="artist.id"
          :artist="artist"
          :index="index"
          class="bg-white"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import ArtistCard from "./ArtistCard.vue";
import { defineProps, onMounted, reactive } from "vue";

defineProps({
  msg: String,
});

const handleLogin = () => {
  window.document.location.href = "http://localhost:8888/login";
};

const extractAccessToken = () => {
  const url = window.document.location.search;
  let accessToken;
  const regexAccessToken = /=(.*)/;
  if (url.match(regexAccessToken)) {
    accessToken = url.match(regexAccessToken)[1];
  }
  const bearerToken = `Bearer ${accessToken}`;
  return bearerToken;
};

const handleUserData = async () => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: extractAccessToken(),
    },
  });
  state.user.value = await response.json();
};

const getTopAlbums = async () => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
    {
      headers: {
        Authorization: extractAccessToken(),
      },
    }
  );
  const { items } = await response.json();
  state.artists.value = await items;
};

onMounted(async () => {
  await handleUserData();
  await getTopAlbums();
});

const state = reactive({
  artists: [],
  user: {},
});
</script>
