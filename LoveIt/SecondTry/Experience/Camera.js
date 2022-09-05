import * as THREE from"three";
import Experience from "./Experience.js";
import Sizes from "./Utils/Sizes.js";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import { GridHelper } from "three";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        console.log(this.experience, this.sizes, this.scene, this.canvas)


        //Test Look@

        this.oCamLookAt = new THREE.Vector3(0,1,0);
        //Test Look@Ende
        

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setHelpers();
        this.setOrbitControls();
        


    }


    //Erstellt eine Perspektivische Camera zum arbeiten
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect,
            0.1, 
            1000 
            );
        
        this.scene.add(this.perspectiveCamera);

        this.perspectiveCamera.position.set(15,12,14); //Default Position
       
    }

    //Erstellt eine Orthographische Kamera für finale Ansicht
    createOrthographicCamera(){
        

        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            90
            );

        this.orthographicCamera.position.set(0,4,5);

        //this.orthographicCamera.zoom = 2;             //FUnktioniert hier aber in Controls in der GSAP Timeline irgendwie nicht

        this.orthographicCamera.rotation.x = -Math.PI /6;   
        
        this.scene.add(this.orthographicCamera);

        console.log(this.orthographicCamera);

        //Helper
        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        //this.scene.add(this.helper);   




        

    }


    //Hilfestellungen
    setHelpers(){
        const size = 10;
        const division = 10;
        const gridHelper = new THREE.GridHelper(size, division);
       // this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(10);
       // this.scene.add(axesHelper);

    }


    //Damit Perspektivische Kamera frei bewegbar ist
    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;

    }



    //Cameras passen sich der Bildschirmgröße an
    resize(){
        this.perspectiveCamera.aspect= this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;

        this.orthographicCamera.updateProjectionMatrix();
    }


    update(){
        this.controls.update();

        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation);


        //Test Look@

        this.orthographicCamera.lookAt(this.oCamLookAt);
        //Test Look@Ende
        
       
    }
    
}