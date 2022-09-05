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


//Experience ist Master JS Datei

export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance                  //Canvas wird erstellt
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();                 //Zugriff auf alle anderen JS Dateien
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.time = new Time();
        this.resources= new Resources(assets);
        

        this.theme = new Theme();
        this.world= new World();
        this.preloader= new Preloader();
        
        
        
        this.time.on("update", () =>{                   //Wenn in "Time" das Event "update" ausgelöst wird soll hier im Master auch "update" ausgelöst werden
            this.update();
        })

        this.sizes.on("resize", () =>{                   
            this.resize();
        })


        
    }

    update(){                                           //Der MasterUpdate updatet jetzt alle anderen JS Dateien
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