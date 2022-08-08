import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";


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
            if(child.name === "Glas"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.1;
                child.material.color.set(0xABB1FF);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;

                console.log("Auqariumglas runs");
            }


            if(child.name === "PcScreen001"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });

                console.log("PC screen Video runs");
                
            }
        });


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