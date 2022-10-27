import * as THREE from"three";
import Sizes from "./Utils/Sizes.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";
import Theme from "./World/Theme.js";

import World  from "./World/World.js";
import Preloader from "./Preloader.js";
import Controls from "./World/Controls.js";


//Experience is the Master JS file

export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance                  
        }
        Experience.instance = this;
        
        this.canvas = canvas;                           //Canvas is created

        this.scene = new THREE.Scene();                 //Access to all other scripts
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.time = new Time();
        this.resources= new Resources(assets);
        this.theme = new Theme();
        this.world= new World();
        this.preloader= new Preloader();
        
        this.preloader.on("enablecontrols", ()=> {
            this.controls= new Controls();
        })
        
        this.time.on("update", () =>{                   //When Time.js triggers its "update" then this update-function also gets triggerd
            this.update();
        })

        this.sizes.on("resize", () =>{                   
            this.resize();
        })


        
    }

    update(){                                           //The Masterscript Experience triggers all the other update-functions
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
        
    }
}