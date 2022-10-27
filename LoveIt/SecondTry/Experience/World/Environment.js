import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from 'lil-gui'; 


export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
       //this.resources = this.experience.resources;

       //this.gui = new GUI();        //Helper um Lichter live einzustellen

       this.obj = {
        colorObj:{ r:0 , g:0, b:0 },
        intensity:3,
       };


       
        this.setSunlight();

        //this.setGUI();        //Helper um Lichter live einzustellen
       

    }



    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientlight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);

        });

        this.gui.add(this.obj, "intensity").onChange(()=>{
           this.sunLight.intensity = this.obj.intensity;
           this.sunLight.ambientlight = this.obj.intensity;

        });

    }


    setSunlight(){

        this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientlight);


        this.sunLight= new THREE.DirectionalLight("#ffffff", 3)     //Color, Intensity
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);        //Resolution of the Shadows (1k 1024, 2k 2048...)
        this.sunLight.shadow.normalBias= 0.05;

        //Helper
        const lighthelper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        //this.scene.add(lighthelper); 

        this.sunLight.position.set(-1.5,7,3);
        this.scene.add(this.sunLight);

        
       

        


    }

    switchTheme(theme){

        //Themeswitch to Dark
        if(theme === "dark"){
            GSAP.to(this.sunLight.color,{
                r: 44/255,          // /255 weil hier der wert eig zwischen 0-1 liegt
                g: 71/255,
                b: 135/255           
            });

            GSAP.to(this.ambientlight.color,{
                r: 44/255,
                g: 71/255,
                b: 135/255            
            });

            GSAP.to(this.sunLight,{
                intensity: 0.78,
            });

            GSAP.to(this.ambientlight,{
                intensity: 0.78,
            });


            GSAP.to(this.experience.world.room.rectLight,{
                intensity: 1
            })

            GSAP.to(this.experience.world.room.rectLight2,{
                intensity: 4
            })


        }


        //Themeswitch to Light
        else{
            GSAP.to(this.sunLight.color,{
                r: 255/255,                  
                g: 255/255,
                b: 255/255
            });

            GSAP.to(this.ambientlight.color,{
                r: 255/255,
                g: 255/255,
                b: 255/255
            });

            GSAP.to(this.sunLight,{
                intensity: 3,
            });

            GSAP.to(this.ambientlight,{
                intensity: 1,
            });

            GSAP.to(this.experience.world.room.rectLight,{
                intensity: 0
            })

            GSAP.to(this.experience.world.room.rectLight2,{
                intensity: 0
            })
        }

       
    }
   
    resize(){
        
    }


    update(){
        
    }
    
}