<template>
    <header>
      <div class="shoe-desc">
        <img src="/media/logo.webp" alt="SWEAR-LOGO" />
      </div>
      <button @click="toggleSound">
        <img class="shoe-desc__img" src="/media/sound.svg" alt="" />
      </button>
    </header>
  </template>
  
<script>
import { Howl } from "howler";

export default {
data() {
    return {
    sound: null,
    isPlaying: false,
    };
},
methods: {
    initSound() {
    this.sound = new Howl({
        src: ["/media/sonicbranding.mp3"], // Replace with the path to your sound file
        loop: true, // Set to true if you want the sound to loop
    });
    },
    toggleSound() {
    if (!this.sound) {
        this.initSound();
    }

    if (this.isPlaying) {
        this.sound.pause();
    } else {
        this.sound.play();
    }

    this.isPlaying = !this.isPlaying;
    },
},
};
</script>
  
  