/**
 * Modules
 *
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "lil-gui";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

/**
 * * DOM elements
 */
const canvasDOM = document.querySelector(".webgl-canvas");

/**
 * * Base Configuration
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//  Debugging UI

const gui = new GUI();

const parameters = {
  backgroundColor: 0xfafafa,
};

gui
  .addColor(parameters, "backgroundColor")
  .name("Background Color")
  .onChange(() => {
    renderer.setClearColor(parameters.backgroundColor);
  });

/**
 * * Creating scene
 *
 */

const scene = new THREE.Scene();

/**
 * * Camera
 */

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  10
);
camera.position.z = 5;

const controls = new OrbitControls(camera, canvasDOM);

scene.add(camera);

/**
 * * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvasDOM,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(new THREE.Color(parameters.backgroundColor));
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

/**
 * * Events
 */

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // updating camera aspect
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // updating renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * ? Meshes
 */

const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 10, 10),
  new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
  })
);

scene.add(mesh);

/**
 * * Tick function
 */

const tick = () => {
  renderer.render(scene, camera);

  // updating orbit controls
  controls.update();

  window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
