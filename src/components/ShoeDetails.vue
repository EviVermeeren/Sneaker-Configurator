<template>
  <div class="canvas-container" ref="canvasContainer"></div>

  <div class="bgc">
    <div class="flex">
      <div>
        <img src="../assets/shoe.webp" alt="SHOE" />
      </div>

      <div>
        <h1 id="type">{{ shoe.shoeType }}</h1>
        <h2>{{ shoe.userName }}</h2>
        <p>Shipping adress: {{ shoe.userAddress }}</p>
        <p>Size: {{ shoe.shoeSize }}</p>
        <p>Status: {{ shoe.status }}</p>
        <p>Price: {{ shoe.shoeColorSole }}</p>
        <div class="buttons">
          <button>Update status to “in production”</button>
          <button>Update status to “in transit”</button>
          <button>Update status to “complete”</button>
          <button>Delete order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

export default {
  data() {
    return {
      shoeId: this.$route.params.id,
      shoe: {
        jewel: null,
        shoeColorLaces: null,
        shoeColorPanelDown: null,
        shoeColorPanelUp: null,
        shoeColorSole: null,
        shoeMaterialPanelDown: null,
        shoeMaterialPanelUp: null,
        shoeSize: null,
        shoeType: null,
        status: null,
        userAddress: null,
        userEmail: null,
        userName: null,
      },
    };
  },
  async mounted() {
    await this.fetchShoes(); // Wait for the fetch to complete
    const windowWidth = window.innerWidth * 2;
    const ratio = windowWidth / window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.$refs.canvasContainer.appendChild(renderer.domElement);

    camera.position.z = 7;

    const loadingManager = new THREE.LoadingManager();

    const gltfLoader = new GLTFLoader(loadingManager);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;

    scene.background = new THREE.Color(0xffffff);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.7);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.7);
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.7);
    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 1);
    directionalLight2.position.set(0, 0, -1);
    directionalLight3.position.set(0, 1, 0);
    directionalLight4.position.set(-1, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight2);
    scene.add(directionalLight3);
    scene.add(directionalLight4);

    let shoe;

    const updateShoeColors = () => {
      const shoeColorLaces = this.shoe.shoeColorLaces;
      const shoeLaces = shoe.getObjectByName("laces");
      shoeLaces.material.color.set(shoeColorLaces);

      const shoeColorSole = this.shoe.shoeColorSole;
      const soleMaterialTop = shoe.getObjectByName("sole_1");
      const soleMaterialBottom = shoe.getObjectByName("sole_2");
      soleMaterialTop.material.color.set(shoeColorLaces);
      soleMaterialBottom.material.color.set(shoeColorLaces);
    };

    gltfLoader.load("/models/new-shoe.glb", (gltf) => {
      shoe = gltf.scene;
      shoe.scale.set(2.5, 2.5, 2.5);

      shoe.rotation.order = "YXZ";

      shoe.rotation.x = 0.5;
      shoe.rotation.y = 1.5;

      shoe.position.z = 0;
      shoe.position.y = -0.5;
      shoe.position.x = -0.5;

      scene.add(shoe);

      // Move the updateShoeColors call here, after the shoe model is loaded
      updateShoeColors();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  },
  methods: {
    async fetchShoes() {
      try {
        const response = await fetch(
          `https://dev5-api-sneakers.onrender.com/api/v1/shoes?id=${this.shoeId}`
        );
        const data = await response.json();

        if (data.status === "success") {
          this.shoe = data.data.shoe || {}; // Use empty object if undefined
          console.log(this.shoe);
        } else {
          console.error("Error fetching shoes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    },
  },
};
</script>

<style scoped>
.bgc {
  background-color: #fff;
  height: 100vh;
}
a {
  text-decoration: none;
  color: #d6ff38;
}
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
  padding-top: 100px;
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
