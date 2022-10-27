import * as THREE from "three";

import Experience from "./Experience.js";
import Sizes from "./Utils/Sizes.js";

export default class Renderer{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();

    }

    setRenderer(){

        this.renderer = new THREE.WebGLRenderer({                    //Create Renderer
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.physicallyCorrectLights = true;                //Renderer adjustments
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;                     //0->Rought and dark; 5->smooth an light
        this.renderer.shadowMap.enabled= true;
        this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

       
        this.renderer.localClippingEnabled=true                         // neccesary for clipping (3D-Printer)
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);     //if window is adjusted renderer gets also adjusted
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }


    update(){
        
        this.renderer.setViewport(0,0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.orthographicCamera);
            //this.renderer.render(this.scene, this.camera.perspectiveCamera);

        //2.Screen
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(this.sizes.width - this.sizes.width/3, this.sizes.height - this.sizes.height/3, this.sizes.width/3, this.sizes.height/3);
        // this.renderer.setScissor(this.sizes.width - this.sizes.width/3, this.sizes.height - this.sizes.height/3, this.sizes.width/3, this.sizes.height/3);
        // this.renderer.render(this.scene, this.camera.perspectiveCamera);
            //this.renderer.render(this.scene, this.camera.orthographicCamera);
        // this.renderer.setScissorTest(false);
        
    }
    
}