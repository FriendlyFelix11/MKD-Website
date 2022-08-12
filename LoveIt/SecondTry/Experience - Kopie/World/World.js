import * as THREE from "three";

import Experience from "../Experience.js";
import Room from "./Room.js";
import Environment from "./Environment.js";
import Controls from "./Controls.js";
import Floor from "./Floor.js";


export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.theme = this.experience.theme;

        this.resources.on("ready", ()=>{            //Signal von Resources, dass alles geladen ist
            this.environment = new Environment();           
            this.room = new Room();                 //Raum wird erstellt
            this.floor = new Floor();
            this.controls=new Controls();
        });

        
        this.theme.on("switch", (theme) =>{
            this.environment.switchTheme(theme);
        })
        

    }


    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme);
        }
    }

   
    resize(){
        
    }


    update(){
        if(this.room){                  //sobald "room" existiert soll seine update ausgeführt werden -> Dies updated den Animations-mixer
            this.room.update();
        }

        if(this.controls){                 
            this.controls.update();
        }
    }
    
}