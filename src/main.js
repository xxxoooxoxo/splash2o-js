import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const carModel =
  'https://splash2o.s3.us-east-1.amazonaws.com/mini.gltf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLWVhc3QtMSJIMEYCIQCy54dNpjpN1EhQy3SSIHST%2BYnWXQ9v5AKzyQkUmoR03wIhAJ%2BoBdz8BuHR0fUtaeeNBbtxmbIDigHoGNZfckMoxNIHKvECCPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDM4MjEzMTgzMjUzIgz1ayBaJhG%2FPyAXczUqxQLSR0g823Vv5xyoDlnis9itff15EDcbp8Lbq1m4XvkKMP%2B3siuvWr4562i4hrJlghdHFo%2B0WnWMk3pyR0mxBvI5s7wIHwh8Q6mQwOk6dkBvkkBDDldk4SGFQX%2Fo%2BkCVpqOawOhfyDjFje5Z6E1jzSv%2BEbgwmKJD%2F2cxe6tucvX3KRurUpuiwPyfWmyla6EPb8G8hFnm8sfwxKGo5OCtNaLz4DaS4gt56X3RFQu3ubMwfEsLMD9HG4XLnxeBOsPoS5zRzY50swhOYE9JT8pOwEaS1rIZnTQH6953xkBRy%2Fj6QaSEM%2BU5TM4gZHfjBw8B8w44FSwibj0BOxrP7nvVyhYDiXjIdwOJaT%2F6VAc6uuRJ0%2BYqu315sL5rats8SYKqu1NMlF3KZoUD1lVhmdAcGleT5GwrlX4v66yDinhowhbjfTUm3jxPMPmV358GOrICVKSs9SRQ51LviXOifEtUAwhA4FvYD89wdH1ecJhX9ZI7RVOl%2BSjRCxJaYQeW6za5ewefenGqXYtTivD9OtE9yR916U2up4OhcQphKxxJQHtqYeodfLeFXHLEqer3a1C6p3MBd4ezawDOOpi0wMH3Ok8qlhEXBQCPh3%2F9Y25lgPRrTmvKugirtTwG%2BpG3W1PxbJZiFbn0m2jx28dkSrO3Qym%2FoR2FYDH%2BDprsSweqqHxRUCnIVPrs2zTaQi3LqwaKcpw%2BhOeTnKWQHILzx4su7OJA7gBZQmxEt35ev7oSap9twPlJVLxreIeQtSLiH%2BY1N9%2BL9k5bxyrxZwlPLbSX%2FW%2Bm%2F0WO%2BiBcfu9LC4srrQ4uPjxcZKS%2FBudxv6UPYrICd8jJ9AFI86%2Fv0792Cbpa2rft&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230223T202232Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAQRZNO44KVF3GUFG4%2F20230223%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=48d2ab08d41550460c290abf4f0e36ab615c07f7be72a0db7e6b797eba0b77de'

const texture =
  'https://splash2o.s3.us-east-1.amazonaws.com/venice_sunset_1k.hdr?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLWVhc3QtMSJIMEYCIQCy54dNpjpN1EhQy3SSIHST%2BYnWXQ9v5AKzyQkUmoR03wIhAJ%2BoBdz8BuHR0fUtaeeNBbtxmbIDigHoGNZfckMoxNIHKvECCPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMDM4MjEzMTgzMjUzIgz1ayBaJhG%2FPyAXczUqxQLSR0g823Vv5xyoDlnis9itff15EDcbp8Lbq1m4XvkKMP%2B3siuvWr4562i4hrJlghdHFo%2B0WnWMk3pyR0mxBvI5s7wIHwh8Q6mQwOk6dkBvkkBDDldk4SGFQX%2Fo%2BkCVpqOawOhfyDjFje5Z6E1jzSv%2BEbgwmKJD%2F2cxe6tucvX3KRurUpuiwPyfWmyla6EPb8G8hFnm8sfwxKGo5OCtNaLz4DaS4gt56X3RFQu3ubMwfEsLMD9HG4XLnxeBOsPoS5zRzY50swhOYE9JT8pOwEaS1rIZnTQH6953xkBRy%2Fj6QaSEM%2BU5TM4gZHfjBw8B8w44FSwibj0BOxrP7nvVyhYDiXjIdwOJaT%2F6VAc6uuRJ0%2BYqu315sL5rats8SYKqu1NMlF3KZoUD1lVhmdAcGleT5GwrlX4v66yDinhowhbjfTUm3jxPMPmV358GOrICVKSs9SRQ51LviXOifEtUAwhA4FvYD89wdH1ecJhX9ZI7RVOl%2BSjRCxJaYQeW6za5ewefenGqXYtTivD9OtE9yR916U2up4OhcQphKxxJQHtqYeodfLeFXHLEqer3a1C6p3MBd4ezawDOOpi0wMH3Ok8qlhEXBQCPh3%2F9Y25lgPRrTmvKugirtTwG%2BpG3W1PxbJZiFbn0m2jx28dkSrO3Qym%2FoR2FYDH%2BDprsSweqqHxRUCnIVPrs2zTaQi3LqwaKcpw%2BhOeTnKWQHILzx4su7OJA7gBZQmxEt35ev7oSap9twPlJVLxreIeQtSLiH%2BY1N9%2BL9k5bxyrxZwlPLbSX%2FW%2Bm%2F0WO%2BiBcfu9LC4srrQ4uPjxcZKS%2FBudxv6UPYrICd8jJ9AFI86%2Fv0792Cbpa2rft&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230223T202324Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAQRZNO44KVF3GUFG4%2F20230223%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2cc0bb6bf04815f318472bea7f71fba247055ebff77e24a12cb88e48b3c83bd3'

const shadow = new THREE.TextureLoader().load(
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/ferrari_ao.png'
)
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
  new THREE.MeshBasicMaterial({
    map: shadow,
    blending: THREE.MultiplyBlending,
    toneMapped: false,
    transparent: true,
  })
)
mesh.rotation.x = -Math.PI / 2

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.environment = new RGBELoader().load(texture)
scene.environment.mapping = THREE.EquirectangularReflectionMapping
// scene.fog = new THREE.Fog(0x333333, 10, 15)

let grid

grid = new THREE.GridHelper(20, 40, 0x333333, 0x333333)
grid.material.opacity = 0.2
grid.material.depthWrite = false
grid.material.transparent = true
scene.add(grid)

// Loaders
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/gltf/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// Car parts
const car = new THREE.Group()
const wheels = []

// Loading the car
gltfLoader.load(carModel, function (gltf) {
  let carParts = []

  // copies the car parts into an array
  for (let i = 0; i < gltf.scene.children.length; i++) {
    carParts.push(gltf.scene.children[i])
  }

  // renders tires
  for (let i = carParts.length - 4; i < carParts.length; i++) {
    if (
      carParts[i].name === 'Mini-WheelFtL' ||
      carParts[i].name === 'Mini-WheelFtR' ||
      carParts[i].name === 'Mini-WheelBkL' ||
      carParts[i].name === 'Mini-WheelBkR'
    ) {
      wheels.push(carParts[i])
      car.add(carParts[i])
    }
  }
  // renders the rest of the car
  for (let i = 0; i < carParts.length - 4; i++) {
    // if (carParts[i].material.name === 'glass') {
    //   carParts[i].material = glassMaterial
    // }
    car.add(carParts[i])
  }
  scene.add(car)
})

// Materials
// const glassMaterial = new THREE.MeshPhysicalMaterial({
//   color: 0xffffff,
//   metalness: 0.25,
//   roughness: 0,
//   transmission: 1.0,
// })

// Objects
// const objectsDistance = 4

/* Camera Positions */
// const pos1 = { x: -5.4, y: 1.4, z: -3.8 }
// const pos2 = { x: 6.9, y: 3.84, z: -4.8 }
// const pos3 = { x: -1, y: 10, z: -1 }
// const pos4 = { x: 5.7, y: 6, z: 4.1 }
// const pos5 = { x: -5.7, y: 1.85, z: 1.23 }

const carPositions = [
  { x: 0, y: 2, z: -5.3 },
  { x: -4.3, y: 1.3, z: -2.1 },
  { x: 5, y: 1, z: -2 },
  { x: 0, y: 6, z: -0.5 },
  { x: -4, y: 1, z: 0 },
]

console.log(carPositions)

// camera array
// const cameraPositions = [pos1, pos2, pos3, pos4, pos5]

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
)

camera.position.x = carPositions[0].x
camera.position.y = carPositions[0].y
camera.position.z = carPositions[0].z

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.85

gsap.registerPlugin(ScrollTrigger)
const tl = gsap.timeline({ default: { ease: 'none' } })

// NEW ANIMATIONS
window.scrollTo(0, 0)

tl.to(camera.position, {
  x: carPositions[1].x,
  y: carPositions[1].y,
  z: carPositions[1].z,
  scrollTrigger: {
    trigger: '.section-2',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    immediateRender: true,
  },
})
  .to(camera.position, {
    x: carPositions[2].x,
    y: carPositions[2].y,
    z: carPositions[2].z,
    scrollTrigger: {
      trigger: '.section-3',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      immediateRender: false,
    },
  })
  .to(camera.position, {
    x: carPositions[3].x,
    y: carPositions[3].y,
    z: carPositions[3].z,
    scrollTrigger: {
      trigger: '.section-4',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      immediateRender: false,
    },
  })

const clock = new THREE.Clock()

// Amimation
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.z = elapsedTime * Math.PI
  }

  // Update Camera
  camera.lookAt(car.position)
  grid.position.x = elapsedTime % 1

  // Render
  renderer.render(scene, camera)

  console.log(camera.position)

  //   controls.update()
  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
