import '../css/style.scss'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"


class Main {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.renderer = null;
    this.scene = new THREE.Scene();
    this.camera = null;
    this.controls = null;
    this.mesh = null;

    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this._init();
    this._update();
    this._addEvent();
  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);
  }

  _setCamera() {
    // this.camera = new THREE.PerspectiveCamera(45, this.size.width / this.size.height, 1, 100);
    // this.camera.position.set(0, 0, 5);
    // this.scene.add(this.camera);

    //ウインドウとWebGL座標を一致させる
    const fov = 45;
    const fovRadian = (fov / 2) * (Math.PI / 180); //視野角をラジアンに変換
    const distance = (this.size.height / 2) / Math.tan(fovRadian); //ウインドウぴったりのカメラ距離
    this.camera = new THREE.PerspectiveCamera(fov, this.size.width / this.size.height, 1, distance * 2);
    this.camera.position.z = distance;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
  }

  _setControlls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  _setLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  _addMesh() {
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshStandardMaterial({color: 0x444444});
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  _init() {
    this._setRenderer();
    this._setCamera();
    this._setControlls();
    this._setLight();
    this._addMesh();
  }

  _update() {
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.x += 0.01;

    //レンダリング
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    requestAnimationFrame(this._update.bind(this));
  }

  _onResize() {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    // レンダラーのサイズを修正
    this.renderer.setSize(this.size.width, this.size.height);
    // カメラのアスペクト比を修正
    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();
  }

  _addEvent() {
    window.addEventListener("resize", this._onResize.bind(this));
  }
}

new Main();



// ラジアンに変換
// function radian(val) {
//   return (val * Math.PI) / 180;
// }

// ランダムな数
// function random(min, max) {
//   return Math.random() * (max - min) + min;
// }

