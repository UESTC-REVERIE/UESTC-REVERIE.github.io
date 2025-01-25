import * as THREE from 'three';
import {PLYLoader} from 'three/addons/loaders/PLYLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 添加进度条
const preview = document.getElementById('preview');
// const progressBar = document.getElementById('progressBar');


// const canvas = document.querySelector('#c2d')
// 渲染器
// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = preview.offsetWidth; //窗口文档显示区的宽度作为画布宽度
const height = preview.offsetHeight; //窗口文档显示区的高度作为画布高度
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// const renderer = new SoftwareRenderer();
// renderer.setSize(width, height);

preview.appendChild(renderer.domElement);

const fov = 40 // 视野范围
const aspect = width / height // 相机默认值 画布的宽高比
const near = 0.1 // 近平面
const far = 1000 // 远平面
// 透视投影相机
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 0.3, 0.85)
camera.lookAt(0, 0, 0)
// 控制相机
const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
// controls.autoRotateSpeed = 1.0
controls.update()

// 场景
const scene = new THREE.Scene()
scene.background = new THREE.Color('#E1AA74')
// scene.background = new THREE.Color('white')



{
    // 半球光
    const skyColor = 0xb1e1ff // 蓝色
    const groundColor = 0xffffff // 白色
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
}

{
    // 方向光
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
}

var url = window.location.href
var previewName = url.split('/').pop()
const objectUrl = 'src/model/ict.ply'
{
    const plyLoader = new PLYLoader()
    plyLoader.load(objectUrl, 
        //加载完成
        (geometry) => {
            geometry.computeVertexNormals();
            const material = new THREE.MeshBasicMaterial({ vertexColors: true });

            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = 0;
            mesh.scale.multiplyScalar(0.2 );
            scene.add( mesh );

            // progressBar.style.visibility = 'hidden'
        },
        // 加载中
        (xhr)=>{
            // progressBar.value = xhr.loaded / xhr.total * 100
        })
    
}

// 渲染
function render() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(render)
}
requestAnimationFrame(render)
