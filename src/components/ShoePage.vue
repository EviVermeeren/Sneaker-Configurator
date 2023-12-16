<template>
  <div class="models-container">
    <h1 id="ourmodels" class="models-container__title">Our models</h1>
    <div class="models-container__flexbox">
      <div class="models-container__model">
        <div>
          <div class="loading-placeholder" ref="loadingPlaceholder1">
            <p class="loading-placeholder__message">
              Loading...
            </p>
          </div>
          <div class="models-container__canvas-container" ref="canvasContainer1"></div>
        </div>
        <div>
          <h1 class="models-container__model__name">AIR REV. NITRO S</h1>
          <h2 class="models-container__model__type">Custom shoes</h2>
          <p class="models-container__model__price">€200,00</p>
          <div class="models-container__model__buttons">
            <button class="models-container__model__buttons">
              <router-link to="/customize"
                >CUSTOMIZE</router-link
              >
            </button>
          </div>
        </div>
      </div>

      <div class="models-container__model flex">
        <div>
          <div class="loading-placeholder" ref="loadingPlaceholder2">
            <p class="loading-placeholder__message">
              Loading...
            </p>
          </div>
          <div class="models-container__canvas-container" ref="canvasContainer2"></div>
        </div>
        <div>
          <h1 class="models-container__model__name">AIR REV. XTRA</h1>
          <h2 class="models-container__model__type">Custom shoes</h2>
          <p class="models-container__model__price">€180,00</p>
          <button class="models-container__model__buttons">
              <router-link to="/config2"
                >CUSTOMIZE</router-link
              >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default {
  name: "Menu",
  data() {
    return {
      loadingState: true,
    };
  },
  mounted() {
    const windowWidth = window.innerWidth;

    const squareSize = 300;

    const createScene = (container, modelPath) => {

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(squareSize, squareSize);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      camera.position.z = 5;

      const loadingManager = new THREE.LoadingManager();

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      const gltfLoader = new GLTFLoader(loadingManager);
      gltfLoader.setDRACOLoader(dracoLoader);

      loadingManager.onStart = () => {
        this.loadingState = true;
        container.style.display = "none";
        this.$refs.loadingPlaceholder1.style.display = "flex";
        this.$refs.loadingPlaceholder2.style.display = "flex";
      };
      loadingManager.onLoad = () => {
        this.loadingState = false;
        container.style.display = "block";
        this.$refs.loadingPlaceholder1.style.display = "none";
        this.$refs.loadingPlaceholder2.style.display = "none";

      };

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.maxPolarAngle = Math.PI / 2;
      controls.enablePan = false;

      controls.minDistance = 5;
      controls.maxDistance = 5;

      scene.background = new THREE.Color(0x242424);

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

      gltfLoader.load(modelPath, (gltf) => {
        shoe = gltf.scene;
        shoe.rotation.order = "YXZ";

        if (modelPath === "/models/new-shoe.glb") {
          shoe.scale.set(2, 2, 2);
          shoe.rotation.x = 0.5;
          shoe.rotation.y = 1.5;
          shoe.position.z = 0;
          shoe.position.y = 0.5;
          shoe.position.x = -0.5;
          scene.add(shoe);
        } else {
          shoe.scale.set(0.75, 0.75, 0.75);
          shoe.rotation.x = 0;
          shoe.rotation.y = -0.15;
          shoe.rotation.z = -0.4;
          shoe.position.z = 0;
          shoe.position.y = -0.5;
          shoe.position.x = -0.5;
          scene.add(shoe);
        }
      });

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    };

    createScene(this.$refs.canvasContainer1, "/models/new-shoe.glb");
    createScene(this.$refs.canvasContainer2, "/models/vans-shoe.glb");
  },
};
</script>