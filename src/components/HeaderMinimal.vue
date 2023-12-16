<template>
  <header class="headerMinimal">
    <RouterLink to="/">
      <div class="headerMinimal__logo">
        <img class="headerMinimal__logo__image" src="/media/logo-white.webp" alt="SWEAR-LOGO" />
      </div>
    </RouterLink>
    <button @click="toggleSound" class="headerMinimal__sound-button">
      <img
        class="headerMinimal__sound-icon"
        :src="isPlaying ? '/media/sound-off.svg' : '/media/sound.svg'"
        alt=""
      />
    </button>
  </header>
</template>

<script>
import { Howl } from "howler";

export default {
  name: "HeaderMinimal",
  data() {
    return {
      sound: null,
      isPlaying: false,
    };
  },
  methods: {
    initSound() {
      this.sound = new Howl({
        src: ["/media/sonicbranding.mp3"],
        loop: true,
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