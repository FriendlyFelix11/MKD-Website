import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";

export default class ControlsBackup{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
       
       

        this.progress = 0;
        this.dummyCurve = new THREE.Vector3(0,0,0);


        this.lerp ={            //Smooth Scroll
            current: 0,
            target: 0,
            ease: 0.1           //How Smooth: höher: abgehackt; niedriger: glatt
        };

        this.position = new THREE.Vector3(0,0,0);
        this.lookAtPosition = new THREE.Vector3(0,0,0);


        this.directionalVector = new THREE.Vector3(0,0,0);
        this.staticVector = new THREE.Vector3(0,-1,0);       //Um Cam nach außen zu setzen -vor die 1
        this.crossVector = new THREE.Vector3(0,0,0);


        this.setPath();
        this.onWheel();

       
    }


    setPath(){
            //Create a closed wavey loop
            this.curve = new THREE.CatmullRomCurve3( [      //Diese Vectoren sind die Punkte der Kurve
                new THREE.Vector3( -5, 0, 0 ),
                new THREE.Vector3( 0, 0, -5 ),
                new THREE.Vector3( 5, 0, 0 ),
                new THREE.Vector3( 0, 0, 5 ),
                
            ], true );



            const points = this.curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );

            const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

            // Create the final object to add to the scene
            const curveObject = new THREE.Line( geometry, material );
            this.scene.add(curveObject);
    }




    onWheel(){
        window.addEventListener("wheel",(e) =>{
            if(e.deltaY > 0){               //Scroll Up
                this.lerp.target += 0.1
            }
            else{                           //Scroll Down
                this.lerp.target -= 0.1
               
            }
        })
    }


    resize(){
        
    }


    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.curve.getPointAt(this.lerp.current %1, this.position) //Kopiert den aktuellen Punkt in "position"


        //this.lerp.target = GSAP.utils.clamp(0,1,this.lerp.target);     //Bei Werten <0 oder >1 => error
        //this.lerp.current = GSAP.utils.clamp(0,1,this.lerp.current);
        //this.curve.getPointAt(this.lerp.current, this.position);  //%1 damit progress nicht größer als 1 wird    //Wo soll Object sein? 0-> Erster Punkt der Kurve; 1-> letzter Punkt der Kurve (Wurde durch progress ersetzt)
        //this.curve.getPointAt(this.lerp.current + 0.0001, this.lookAtPosition);     
        
        //this.progress += 0.001;                                     //kamerabewegung läuft automatisch
        this.experience.camera.orthographicCamera.position.copy(this.position);
        

        //Kamera schaut immer im rechten winkel 
        this.directionalVector.subVectors(
            this.curve.getPointAt((this.lerp.current % 1) + 0.00001), 
            this.position
            );

        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.directionalVector, this.staticVector);
        this.crossVector.multiplyScalar(100000);    //Dreht Cam nach außen
        //this.experience.camera.orthographicCamera.lookAt(this.crossVector);

        this.experience.camera.orthographicCamera.lookAt(0,0,0);

        
    }
    
}