import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

renderer.render(scene, camera);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const texture = new THREE.TextureLoader().load('frog.png')
const material = new THREE.MeshBasicMaterial({map: texture});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const frog_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const frog_tex = new THREE.MeshBasicMaterial({ color: 0xffffff });
const frog = new THREE.Mesh(frog_geo, frog_tex);
scene.add(frog);

let hue = 0;

camera.position.z = 18;


function animate() {

  frog.rotation.x += 0.01;
  frog.rotation.y += 0.01;

  hue += 0.005;
  if (hue > 1) hue = 0;
  frog.material.color.setHSL(hue, 1, 0.5);

  renderer.render( scene, camera );

  requestAnimationFrame(animate);
}

animate();
function add_star() {
  const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const star_material = new THREE.MeshBasicMaterial({ color: 0xffffff  });
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);
camera.position.setZ(45);
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;

}

document.body.onscroll = moveCamera;
moveCamera();

