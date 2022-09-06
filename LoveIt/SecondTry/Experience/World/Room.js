import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper.js"
import { RedFormat } from "three";


export default class Room{
    constructor(){
        this.experience = new Experience();
        
        this.scene = this.experience.scene;
        this.time = this.experience.time;

       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.actualRoom = this.room.scene;

       this.roomChildren = {};        //leeres Object für alle Meshs vom Raum
       

       console.log(this.actualRoom);


       this.lerp ={            //Smooth Scroll
        current: 0,
        target: 0,
        ease: 0.1           //How Smooth: höher: abgehackt; niedriger: glatt
    };


       this.setModel(); 
       this.setAnimation();
       this.onMouseWheel();

       

    }




    actPrinter(){
        console.log("hml")
    }




    setModel(){
        this.actualRoom.children.forEach((child) => {       //Mesh werfen Schatten
            child.castShadow = true;
            child.reciveShadow = true;

           if(child instanceof THREE.Group){               //Auch Meshs in Gruppen (Blender-Collections) werfen Schatten
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;  
                })
            }

            this.roomChildren[child.name] = child;

            child.scale.set(0,0,0);                         //Am Anfang sind alle Objekte unsichtbar

            



           //Test Clipping
            
           this.localClippingPlane = new THREE.Plane(new THREE.Vector3(0,-1,0),0.58);    //Material "materialClipping" auf Druckteil assignen und dann animation machen und Vector 4. Zahl anpassen
           
           this.materialClipping = new THREE.MeshPhongMaterial({
            clippingPlanes: [this.localClippingPlane],
            clipShadows: true,
           }) 

           
           if(child.name === "Text001"){
                this.mkdText = child;
                child.material = this.materialClipping
           }
           //Test Clipping Ende


            //Materialänderungen--------------------------------------------------------------------------------------

            //Aquarium wird durchsichtig: Werte von https://threejs.org/examples/?q=phy#webgl_materials_physical_transmission
            if(child.name === "Glas"){
                console.log(child)
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.1;
                child.material.color.set(0xABB1FF);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;

                //Wenn man nur ein Material eines Meshs "bedrucken" will-> child.children[0].material   ->Zahl im Inspector nachschauen
                
            }

            if(child.name === "GlasWindow"){
                console.log(child)
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xABB1FF);
                child.material.ior = 1.5;
                child.material.transmission = 1;
                child.material.opacity = 1;

                
                
            }


            //Bildschirme---
            if(child.name === "PcScreen001"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
                 
            }

            if(child.name === "PcScreen3DL"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });
                 
            }

            if(child.name === "PcScreen3DR"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen3,
                });
                 
            }



            //Canvas "maze" wird auf den Cube als Bumpmap gelegt; Canvas selbst ist display:none        //FÜR EXPORT AUSGEBLENDET 3 STELLEN: HIER; UPDATE & INDEX
           // if(child.name === "MagicCubeCube"){

                //this.MCube = child;
                //this.bumpMap = new THREE.Texture(maze);
                //
                //child.material = new THREE.MeshPhongMaterial({
                //    color: 0x00aa00,
                //    bumpMap: this.bumpMap
                //});
                //child.bumpScale=-.9;
                 
            //}

            

            //Positionsänderungen für Animationen-----------------------------------------------------------------------------

            if(child.name === "FloorNew001"){
                console.log(child);
                child.position.x = -0.5;
                child.position.z = 7.25;
                child.position.y = 2; 
            }


        });


        //Licht 3
        const width = 0.9;
        const height = 0.7;
        const intensity = 1;
        this.rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        this.rectLight.position.set( 8.5, 8.2, -2 );
        this.rectLight.rotation.x = -Math.PI/2;
        this.rectLight.rotation.z = -Math.PI/4;
        this.actualRoom.add( this.rectLight );

        

        //this.rectLightHelper = new RectAreaLightHelper( this.rectLight );
        //this.rectLight.add( this.rectLightHelper );



        this.scene.add(this.actualRoom);

        this.actualRoom.scale.set(0.11,0.11,0.11);
        //this.actualRoom.rotation.y = Math.PI/2;     //Rotiert Raum passend zu Achsen (Wurde dann aber gleich in Blender gemacht)
    }



  





    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        console.log("Animations active")


        //Animationen-------------------------------------------------------------------------------------------------------------------

        //Fisch----
        this.swim = this.mixer.clipAction(this.room.animations[0])      //Nimm aus "room" die erste Animation (gibt bislang nur eine)
        this.swim.play();


        //Uhrzeiger----
        this.minutes = this.mixer.clipAction(this.room.animations[1])      
        this.minutes.setLoop(THREE.LoopOnce);
        this.minutes.clampWhenFinished = true;
        
        this.hours = this.mixer.clipAction(this.room.animations[2])      
        this.hours.setLoop(THREE.LoopOnce);
        this.hours.clampWhenFinished = true; 
         
        this.experience.theme.toggleButton.addEventListener("click",()=>{

            if(this.experience.theme.theme === "dark"){
            this.minutes.paused=false;
            this.hours.paused=false;
            this.hours.timeScale = 1.5;
            this.minutes.timeScale = 1.5;
            this.hours.play();
            this.minutes.play();
            }

            if(this.experience.theme.theme === "light"){
                this.minutes.paused=false;
                this.hours.paused=false;
                this.minutes.timeScale = -1.5;
                this.hours.timeScale = -1.5;
                this.hours.play();
                this.minutes.play();
                }
        })
        

        //Zauberwürfel----
        this.wuerfel = this.mixer.clipAction(this.room.animations[3])      
        this.wuerfel.play();
        this.wuerfel.timeScale = 0.2;


        //3D-Drucker----
        this.duese = this.mixer.clipAction(this.room.animations[4])      
        //this.duese.play();

        this.duesehalter = this.mixer.clipAction(this.room.animations[5])      
        //this.duesehalter.play();


       

    }



    //Mausbewegung für Drehung des Hauses
    onMouseWheel(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX-window.innerWidth/2)*2)/window.innerWidth;  //Mausposition X-Achse -1 bis 1

            this.lerp.target = this.rotation* 0.1;      //Wie weit dreht sich der room
        })
    }

   
    resize(){
        
    }


    update(){
        this.mixer.update(this.time.delta * 0.001); //Speed of the Fish
        
        this.lerp.current = GSAP.utils.interpolate(    
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;


        //Test

        
        //this.MCube.material.bumpMap.needsUpdate=true;

        //TestEnde


        //Test Clipping
        this.mkdText.material = this.materialClipping
        //Test Clipping Ende
    }
    
}