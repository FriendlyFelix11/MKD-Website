import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";


export default class Floor{
    constructor(){
        this.experience = new Experience();
        
        this.scene = this.experience.scene;
       
  
       this.setFloor(); 
       this.setCircles();
     

    }


    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color:0xffffff,
            side: THREE.DoubleSide,
        })

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);


        this.plane.rotation.x = Math.PI /2;
        this.plane.position.y = -0.3
        this.plane.receiveShadow= true;
    }


    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 64 );
        
        const material = new THREE.MeshStandardMaterial( { color: 0xe5a1aa } );     //Standard statt Basic weil es Schatten haben soll
        const material2 = new THREE.MeshStandardMaterial( { color: 0x8395CD } );
        const material3 = new THREE.MeshStandardMaterial( { color: 0x7ad0ac } );
        
        this.circleFirst = new THREE.Mesh( geometry, material );
        this.circleSecond = new THREE.Mesh( geometry, material2 );
        this.circleThird = new THREE.Mesh( geometry, material3 );
        this.circleFourth = new THREE.Mesh( geometry, material );
        this.circleFifth = new THREE.Mesh( geometry, material2 );
        this.circleSixed = new THREE.Mesh( geometry, material3 );

        this.circleFirst.position.y = -0.29;
        this.circleSecond.position.y = -0.28;
        this.circleThird.position.y = -0.27;
        this.circleFourth.position.y = -0.26;
        this.circleFifth.position.y = -0.25;
        this.circleSixed.position.y = -0.24;
        
        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);
        this.circleFourth.scale.set(0,0,0);
        this.circleFifth.scale.set(0,0,0);
        this.circleSixed.scale.set(0,0,0);
        
        this.circleFirst.rotation.x = -Math.PI/2
        this.circleSecond.rotation.x = -Math.PI/2
        this.circleThird.rotation.x = -Math.PI/2
        this.circleFourth.rotation.x = -Math.PI/2
        this.circleFifth.rotation.x = -Math.PI/2
        this.circleSixed.rotation.x = -Math.PI/2
        
        this.circleFirst.receiveShadow = true;
        this.circleSecond.receiveShadow = true;
        this.circleThird.receiveShadow = true;
        this.circleFourth.receiveShadow = true;
        this.circleFifth.receiveShadow = true;
        this.circleSixed.receiveShadow = true;

        this.scene.add( this.circleFirst );
        this.scene.add( this.circleSecond );
        this.scene.add( this.circleThird );
        this.scene.add( this.circleFourth );
        this.scene.add( this.circleFifth );
        this.scene.add( this.circleSixed );
    }
   
    resize(){
        
    }


    update(){
        
    }
    
}