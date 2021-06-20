<template>
  <li
    class="flex flex-row mb-2 shadow-sm border h-full rounded overflow-hidden"
  >
    <div class="flex flex-row self-center h-auto w-full p">
      <div
        class="
          px-4
          w-10
          text-right
          justify-end
          self-center
          text-2xl
          font-medium
        "
      >
        {{ addZero(index) }}
      </div>
      <div class="flex flex-col pl-4 max-w-full">
        <a :href="artist.external_urls.spotify" class="font-medium">{{
          artist.name
        }}</a>
        <div class="font-light">Followers: {{ artist?.followers?.total }}</div>
      </div>
    </div>
    <img
      :src="artist.images?.[2].url"
      width="50"
      height="50"
      :alt="artist.name"
      class="justify-self-end overflow-hidden m-2 rounded"
    />
  </li>
</template>

<script setup>
import { defineProps } from "@vue/runtime-core";

const addZero = (num) => {
  if (num === 9) return `${num + 1}`;
  if (num.toString().length === 1) return `0${num + 1}`;
  return num + 1;
};

defineProps({
  artist: {},
  index: Number,
});
</script>
