import * as THREE from "three";

import Experience from "../Experience.js";


export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
       this.resources = this.experience.resources;
       
        this.setSunlight();
       

    }

    setSunlight(){
        this.sunLight= new THREE.DirectionalLight("#ffffff", 3)     //Farbe, Intensity
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);        //Schärfe der Schatten (1k 1024, 2k 2048...)
        this.sunLight.shadow.normalBias= 0.05;

        //Helper
        const lighthelper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        //this.scene.add(lighthelper); 

        this.sunLight.position.set(-1.5,7,3);
        this.scene.add(this.sunLight);

        
        const light = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(light);
    }
   
    resize(){
        
    }


    update(){
        
    }
    
}