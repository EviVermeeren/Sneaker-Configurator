<template>
  <div class="flex">
    <div>
      <img src="../assets/shoe.webp" alt="SHOE" />
    </div>
    <div>
      <h1>AIR REV. NITRO S</h1>
      <h2>Custom shoes</h2>
      <p>€200,00</p>
      <div class="buttons">
        <button>CUSTOMIZE</button>
        <button>BUY</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
h1 {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: #000000;
  font-size: 36px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin: 0;
}

h2 {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0.72px;
  line-height: normal;
  white-space: nowrap;
  margin: 0;
}

p {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 43px;
  gap: 100px;
}

img {
  width: 25vw;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  width: 299px;
  height: 36px;
  top: 0;
  left: 0;
  background-color: #000000;
  font-family: "basic-sans", sans-serif;
  font-weight: 700;
  color: #d6ff38;
  font-size: 14px;
  letter-spacing: 1.61px;
  line-height: normal;
}
</style>
