var clock, container, camera, scene, renderer, controls, listener;

var ground, character;
var light;
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.JSONLoader();
var loader = new THREE.ObjectLoader();
var isLoaded = false;

init();

function init () {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true });
  renderer.setClearColor( 0x000000, 0 );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(0, 1.2, 2.5);
  //listener = new THREE.AudioListener();
  //camera.add(listener);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0.6, 0);
  // Lights
  light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

/*
  textureLoader.load('textures/ground.png', function (texture) {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    ground = new THREE.Mesh(geometry, material);
    scene.add(ground);

  });
*/

  var url = "models/stadium.json";
  //var url = "scene.json";
  //var url = "../jsonPlayer/PlayerBlue.json"
 
  loader.load(url, function (object) {
    /*
    character = new THREE.Mesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );
	*/
	
    scene.add(object);

    window.addEventListener('resize', onWindowResize, false);

    animate();

    isLoaded = true;
  });

}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate () {
  requestAnimationFrame(animate);
  controls.update();
  render();

}

function render () {
  renderer.render(scene, camera);
}
