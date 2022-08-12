import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.camera= this.experience.camera;
        this.resources = this.experience.resources;
        this.room = this.experience.world.room.actualRoom;

        this.room.children.forEach((child) =>{            //Licht scaled nicht mit-> muss unten extra angepasst werden
            if(child.type === "RectAreaLight"){
                this.rectLight = child;
            }
        })

        GSAP.registerPlugin(ScrollTrigger);
        this.sizes = this.experience.sizes;
        

        this.setScrollTrigger();

        
       
    }


    setScrollTrigger(){

        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": ()=>{

                //Damit die Größen stimmen wenn man von mobile zurück auf Desktop geht
                this.room.scale.set(0.11, 0.11, 0.11);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.7;

                //----Erste Bewegung------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                })

                this.firstMoveTimeline.to(this.room.position,{
                   x: () => { return this.sizes.width*0.0014;}
                });


                //----Zweite Bewegung------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                })

                this.secondMoveTimeline.to(this.room.position,{
                   x: () => {return 1;},
                   z: () => {return this.sizes.height*0.0032;}
                }, "same");                                             //damit nicht erst bewegung dann zoom

                this.secondMoveTimeline.to(this.room.scale,{
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                 },"same");

                 this.secondMoveTimeline.to(this.rectLight,{ //AquariumLicht muss extra gescaled werden
                    width: 0.5 *4,                            //Oben wird alles 40% größer gescaled darum hier *4
                    height: 0.7 *4,
                 },"same");


                  //----Dritte Bewegung------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                })

                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position,{
                   y: 1.5,
                   x: -4.1,
                   z: () => {return this.sizes.height*0.01;}
                   
                });


                
            },




            //Mobile
            "(max-width: 968px)": ()=>{

               this.room.scale.set(0.07, 0.07, 0.07);
               this.rectLight.width= 0.9;
               this.rectLight.height= 0.4;
               this.room.position.set(0,0,0);


               //----Erste Bewegung------------------------------
               this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",     //Klasse wählen
                    start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                    end:"bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                    markers: true,
                },
            })

            this.firstMoveTimeline.to(this.room.scale,{
               
                x: 0.1,
                y: 0.1,
                z: 0.1
            });


               //----Zweite Bewegung------------------------------
               this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",     //Klasse wählen
                    start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                    end:"bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                    markers: true,
                },
            })

            this.secondMoveTimeline.to(this.room.scale,{
               
                x: 0.25,
                y: 0.25,
                z: 0.25
            },"same");

            this.secondMoveTimeline.to(this.rectLight.scale,{
               
                width:0.3,
                height:0.4,
            },"same");

            this.secondMoveTimeline.to(this.room.position,{
               
                x: 1.5
            },"same");

            

               //----Dritte Bewegung------------------------------
               this.ThirdMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",     //Klasse wählen
                    start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                    end:"bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                    markers: true,
                },
            })

            this.ThirdMoveTimeline.to(this.room.position,{
               
                z:-4.5
            });


            },

            //Gilt immer egal welche Screensize
            all: ()=> {

                this.SecondPartTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move ",     
                        start: "top top",       
                        end:"bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                    
                })
                
                

                    this.room.children.forEach(child=>{
                        if(child.name === "FloorNew001"){
                            GSAP.to(child.position,{
                                x: -7.9,
                                z: 14.5,
                                
                            })
                        }
                    }) 
                    
                    
                

            }
        });

    }


        
       

    



    resize(){
        
    }


    update(){
        
    }
    
}