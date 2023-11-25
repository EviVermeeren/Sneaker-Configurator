<template>
  <div class="bgc">
    <div class="flex">
      <div>
        <div class="canvas-container" ref="canvasContainer"></div>
      </div>
      <div>
        <h1 id="type">{{ shoe.shoeType }}</h1>
        <h2>{{ shoe.userName }}</h2>
        <p>Shipping address: {{ shoe.userAddress }}</p>
        <p>Size: {{ shoe.shoeSize }}</p>
        <p>Status: {{ shoe.status }}</p>
        <div class="buttons">
          <button @click="updateStatus('in production')">
            Update status to “in production”
          </button>
          <button @click="updateStatus('in transit')">
            Update status to “in transit”
          </button>
          <button @click="updateStatus('complete')">
            Update status to “complete”
          </button>
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

import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

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
        initials: null,
      },
    };
  },
  async mounted() {
    await this.fetchShoes(); // Wait for the fetch to complete
    const windowWidth = window.innerWidth;
    const squareSize = windowWidth * 0.4;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio is set to 1 for a square
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(squareSize, squareSize);
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
      const soleColorTop = shoe.getObjectByName("sole_1");
      const soleColorBottom = shoe.getObjectByName("sole_2");
      soleColorTop.material.color.set(shoeColorSole);
      soleColorBottom.material.color.set(shoeColorSole);

      const textureLoader = new THREE.TextureLoader();
      const textureUrl = this.shoe.shoeMaterialPanelUp;
      const texture = textureLoader.load(textureUrl);

      const MaterialTop = shoe.getObjectByName("outside_1");
      const MaterialBottom = shoe.getObjectByName("outside_2");

      MaterialTop.material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const shoeColorPanelDown = this.shoe.shoeColorPanelDown;
      const panelDownColor1 = shoe.getObjectByName("outside_1");
      const panelDownColor2 = shoe.getObjectByName("outside_2");
      panelDownColor1.material.color.set(shoeColorPanelDown);
      panelDownColor2.material.color.set(shoeColorPanelDown);

      const textureLoader2 = new THREE.TextureLoader();
      const textureUrl2 = this.shoe.shoeMaterialPanelDown;
      const texture2 = textureLoader.load(textureUrl);

      const MaterialTop2 = shoe.getObjectByName("inside");

      MaterialTop2.material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const shoeColorPanelUp = this.shoe.shoeColorPanelUp;
      const panelUpColor = shoe.getObjectByName("inside");
      panelUpColor.material.color.set(shoeColorPanelUp);
    };

    let jewelGiraffe;

    gltfLoader.load("/models/pendantGiraffe.glb", (gltf) => {
      jewelGiraffe = gltf.scene;
      jewelGiraffe.scale.set(0.04, 0.04, 0.04);

      jewelGiraffe.rotation.x = -1.85;
      jewelGiraffe.rotation.y = 0.3;

      jewelGiraffe.position.z = 1.25;
      jewelGiraffe.position.y = 0.8;
      jewelGiraffe.position.x = -1.3;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelGiraffe.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      if (this.shoe.jewel === "Giraffe") {
        scene.add(jewelGiraffe);
      }
    });

    let jewelElephant;

    gltfLoader.load("/models/pendantElephant.glb", (gltf) => {
      jewelElephant = gltf.scene;
      jewelElephant.scale.set(0.05, 0.05, 0.05);

      jewelElephant.rotation.x = -1.95;
      jewelElephant.rotation.y = 0.6;

      jewelElephant.position.z = 1.25;
      jewelElephant.position.y = 1;
      jewelElephant.position.x = -1;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelElephant.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      if (this.shoe.jewel === "Elephant") {
        console.log("elephant");
        scene.add(jewelElephant);
      }
    });

    let jewelHedgehog;

    gltfLoader.load("/models/pendantHedgehog.glb", (gltf) => {
      jewelHedgehog = gltf.scene;
      jewelHedgehog.scale.set(0.05, 0.05, 0.05);

      jewelHedgehog.rotation.x = -1.95;
      jewelHedgehog.rotation.y = 0.6;

      jewelHedgehog.position.z = 1.15;
      jewelHedgehog.position.y = 1.2;
      jewelHedgehog.position.x = -1;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelHedgehog.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      if (this.shoe.jewel === "Hedgehog") {
        console.log("Hedgehog");
        scene.add(jewelHedgehog);
      }
    });

    let jewelWhale;

    gltfLoader.load("/models/pendantWhale.glb", (gltf) => {
      jewelWhale = gltf.scene;
      jewelWhale.scale.set(0.05, 0.05, 0.05);

      jewelWhale.rotation.x = -2;
      jewelWhale.rotation.y = 0.6;

      jewelWhale.position.z = 0.95;
      jewelWhale.position.y = 1.4;
      jewelWhale.position.x = -1;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelWhale.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      if (this.shoe.jewel === "Whale") {
        console.log("Whale");
        scene.add(jewelWhale);
      }
    });

    const fontLoader = new FontLoader();
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.4,
      roughness: 1,
      wireframe: true,
      wireframeLinewidth: 0.5,
    });
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry(this.shoe.initials, {
        font: font,
        size: 0.25,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      this.shoeText = new THREE.Mesh(textGeometry, textMaterial);

      this.shoeText.rotation.order = "YXZ";

      this.shoeText.rotation.x = -0.5;
      this.shoeText.rotation.y = -1.75;

      this.shoeText.position.x = -1.88;
      this.shoeText.position.y = 2.2;
      this.shoeText.position.z = -0.45;

      scene.add(this.shoeText);
    });

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
    async updateStatus(newStatus) {
      try {
        const response = await fetch(
          `https://dev5-api-sneakers.onrender.com/api/v1/shoes/${this.shoeId}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          this.shoe.status = newStatus; // Update the status in the local data
          console.log("Status updated successfully");
        } else {
          console.error("Error updating status:", data.message);
        }
      } catch (error) {
        console.error("Error updating status:", error);
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