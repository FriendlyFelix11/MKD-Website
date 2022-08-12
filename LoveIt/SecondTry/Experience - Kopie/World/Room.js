import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper.js"


export default class Room{
    constructor(){
        this.experience = new Experience();
        
        this.scene = this.experience.scene;
        this.time = this.experience.time;

       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.actualRoom = this.room.scene;

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


            //Aquarium wird durchsichtig: Werte von https://threejs.org/examples/?q=phy#webgl_materials_physical_transmission
            if(child.name === "Aquarium"){
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0.1;
                child.children[0].material.color.set(0xABB1FF);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;

                
                console.log("Auqariumglas runs");
            }


            if(child.name === "PC"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });

                console.log("PC screen Video runs");
             
                
            }

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

        this.swim = this.mixer.clipAction(this.room.animations[0])      //Nimm aus "room" die erste Animation (gibt bislang nur eine)
        this.swim.play();
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
    }
    
}