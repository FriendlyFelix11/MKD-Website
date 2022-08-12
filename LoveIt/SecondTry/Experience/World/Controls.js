import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera= this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
         

        GSAP.registerPlugin(ScrollTrigger);
        
        


        this.setSmoothScroll();
        this.setScrollTrigger();
        
       
    }




   







    setScrollTrigger(){

        

        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": ()=>{

                

                //----Erste Bewegung------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        id:"test1",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                })

                //----Zweite Bewegung------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        id:"test2",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: true,
                    },
                })

              

                
            },
            
        }); 

       

    }




    setSmoothScroll(){
        this.asscroll=this.setupASScroll();
    }




    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.15,           //Wie stark ist der smoothing effekt
            disableRaf: true 
        });
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }
        
       

    



    resize(){
        
    }


    update(){
        
    }
    
}