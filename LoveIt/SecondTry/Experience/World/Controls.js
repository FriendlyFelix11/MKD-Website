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
        
        
        this.roomChildren = this.experience.world.room.roomChildren;
        
        
        


        this.setSmoothScroll();
        this.setScrollTrigger();



        this.activatePrinterButton();
        
        

        

        
    }
    
    

    

   
buildRoom2(){
  console.log("Raum 2 wird gebaut")

  return new Promise((done)=>{

  this.bulidRoom2Timeline = new GSAP.timeline()  

  this.bulidRoom2Timeline.to(this.roomChildren.FloorRoom2.position,{
    x:-7.02302,
    z:13.7204,
    duration:2,

  })

  this.bulidRoom2Timeline.to(this.roomChildren.FloorTile.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom2Timeline.to(this.roomChildren.FloorTile1.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.1,
  }, "sameTile")

  this.bulidRoom2Timeline.to(this.roomChildren.FloorTile2.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.2,
  }, "sameTile")

  this.bulidRoom2Timeline.to(this.roomChildren.FloorTile3.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.3,
  }, "sameTile")
  
  this.bulidRoom2Timeline.to(this.roomChildren.FloorTile4.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.4,
  }, "sameTile")

  //Würfel
  this.bulidRoom2Timeline.to(this.roomChildren.MagicCubeBase.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom2Timeline.to(this.roomChildren.MagicCubeCube.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //Regal
  this.bulidRoom2Timeline.to(this.roomChildren.BoxFrame001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom2Timeline.to(this.roomChildren.Book005.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom2Timeline.to(this.roomChildren.Book006.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //VR
  this.bulidRoom2Timeline.to(this.roomChildren.VRBrille.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")






})

}

buildRoom3(){
  console.log("Raum 3 wird gebaut")

  return new Promise((done)=>{

  this.bulidRoom3Timeline = new GSAP.timeline()  

  

  //Wände---
  this.bulidRoom3Timeline.to(this.roomChildren.WallRoom3.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.BildTechZeich.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.1,
  }, "sameTile")

  //Tische---
  this.bulidRoom3Timeline.to(this.roomChildren.TableFoot001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.2,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.TableFoot002.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.3,
  }, "sameTile")
  
  this.bulidRoom3Timeline.to(this.roomChildren.TableTop001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
    delay: 0.4,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.TableTop002.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //Softbox---
  this.bulidRoom3Timeline.to(this.roomChildren.SoftboxStativFuss.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.SoftboxLicht.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.SoftboxSchirm.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.Steckdose.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //VR
  this.bulidRoom3Timeline.to(this.roomChildren.StativCamera.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.CameraBack.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.Body.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.Tuchgestell.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.StativausCAD.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //PCs---
  this.bulidRoom3Timeline.to(this.roomChildren.PcScreen002.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.PcScreen004.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.PcScreen3DL.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  this.bulidRoom3Timeline.to(this.roomChildren.PcScreen3DR.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //Kaffee---
  this.bulidRoom3Timeline.to(this.roomChildren.CoffeeMug001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameTile")

  //Keyboard---
  this.bulidRoom3Timeline.to(this.roomChildren.Keyboard001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameKeyB")

  this.bulidRoom3Timeline.to(this.roomChildren.Key160.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameKeyB")

  this.bulidRoom3Timeline.to(this.roomChildren.KeyEsc001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameKeyB")

  this.bulidRoom3Timeline.to(this.roomChildren.Key092.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "sameKeyB")

  //3DDrucker---
  this.bulidRoom3Timeline.to(this.roomChildren.Text001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinter001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterTerminal001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterPlatte001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterSpule001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterMaterial001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterHalterDuse001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterDuse001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterKnopfe001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.Circle.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")

  this.bulidRoom3Timeline.to(this.roomChildren.DPrinterScreen001.scale,{
    x: 1,
    y: 1,
    z: 1,
    duration:0.5,
  }, "samePrinter")










})

}


activatePrinterButton(){
  document.querySelector(".Printer-activate").addEventListener("click", () =>{

      console.log("Printer druckt")

      this.experience.world.room.duese.clampWhenFinished=true;
      this.experience.world.room.duesehalter.clampWhenFinished=true;
      this.experience.world.room.duese.setLoop(THREE.LoopOnce);
      this.experience.world.room.duesehalter.setLoop(THREE.LoopOnce);
      this.experience.world.room.duese.play();
      this.experience.world.room.duesehalter.play();


       return new Promise((done)=>{
        
         this.PrintTimeline=new GSAP.timeline();
     
          this.PrintTimeline.to(this.experience.world.room.localClippingPlane,{
          constant: 0.638,
          duration:15,
          delay:1.6
          })
     
          
          
     
       })

  });
}




    




    setScrollTrigger(){
        


        ScrollTrigger.matchMedia({

            //Desktop ---------------------------------------------------------------------------------------------------------------------------
            "(min-width: 969px)": ()=>{

              console.log("Desktop")
                

                //----Erste Bewegung------------------------------ Cam: 0,4,5 Look@: 0,1,0 Z:1
                this.firstMoveTimeline = new GSAP.timeline({

                  //Wann soll was passieren
                    scrollTrigger:{
                        trigger: ".first-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        id:"test1",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        //markers: true,
                    },
                })
                 //Was soll passieren
                 this.firstMoveTimeline.to(this.camera.orthographicCamera.position,{
                  x: () =>{
                    return -(this.sizes.width*0.0016)     //With my PC = 1032px ich will, dass Camera bei x= 1,6 ist => 1.6/1032 = 0.0016
                  }
                 },"same1")

                 this.firstMoveTimeline.to(this.camera.oCamLookAt,{
                  x: () =>{
                    return -(this.sizes.width*0.0016)     
                  }
                 },"same1")

                 




                //----Zweite Bewegung------------------------------ Cam: -1.6,4,5 Look@: -1.6,1,0 Z:1
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",     //Klasse wählen
                        start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                        end:"bottom bottom",
                        id:"test2",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        //markers: true,
                    },
                })

                this.secondMoveTimeline.to(this.camera.orthographicCamera.position,{
                  x: () =>{
                    return (this.sizes.width*0.0004)     
                  }
                 },"same2")

                 this.secondMoveTimeline.to(this.camera.oCamLookAt,{
                  x: () =>{
                    return (this.sizes.width*0.0004)   
                  }
                 },"same2")

                 this.secondMoveTimeline.to(this.camera.orthographicCamera.scale,{

                  x: 0.5,
                  y: 0.5,
                  z: 0.5,
                  
                 },"same2")

                

                //----Dritte Bewegung------------------------------ Cam: 0.4,4,5 Look@: 0.4,1,0 Z:0.5
                this.thirdMoveTimeline = new GSAP.timeline({
                  scrollTrigger:{
                      trigger: ".third-move",     //Klasse wählen
                      start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                      end:"bottom bottom",
                      id:"test3",
                      scrub: 0.6,
                      invalidateOnRefresh: true,
                  },
              })

              this.thirdMoveTimeline.to(this.camera.orthographicCamera.position,{
                x: () =>{
                  return -(this.sizes.width*0.00097)     
                },

                y: 2

               },"same3")

               this.thirdMoveTimeline.to(this.camera.oCamLookAt,{
                x: () =>{
                  return -(this.sizes.width*0.00097)     
                },

                y: -1

               },"same3")

              this.thirdMoveTimeline.to(this.camera.orthographicCamera.scale,{

                x: 0.35,
                y: 0.35,
                z: 0.35,
                
               },"same3")
               
             
               //Autobuild Room 2
               this.thirdMoveTimelineAuto = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",    
                    start: "center center",
                    onEnter:()=>this.buildRoom2(),
                    
                },
            })

               



              //----newRoom Bewegung------------------------------ Cam: -1,2,5 Look@: -1,-1,0 Z:0.35
              this.newRoomMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".newRoom-move",     //Klasse wählen
                    start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                    end:"bottom bottom",
                    id:"testNR",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                    //markers: true,
                },
            })

             this.newRoomMoveTimeline.to(this.camera.orthographicCamera.position,{
              x: () =>{
                return (this.sizes.width*0.002)     
              },

              y: 5

             },"sameNR")

            this.newRoomMoveTimeline.to(this.camera.oCamLookAt,{
              x: () =>{
                return -(this.sizes.width*0.003)     
              },

              z: () =>{
                return (this.sizes.width*0.001)     
              },

             },"sameNR")

             this.newRoomMoveTimeline.to(this.camera.orthographicCamera.scale,{

              x: 0.8,
              y: 0.8,
              z: 0.8,
              
             },"sameNR")


             //Autobuild Room 3
             this.thirdMoveTimelineAuto = new GSAP.timeline({
              scrollTrigger:{
                  trigger: ".newRoom-move",    
                  start: "center center",
                  onEnter:()=>this.buildRoom3(),
                  
              },
          })


             

             


          
          
          //----Vierte Bewegung------------------------------ Cam: 2,5,5 Look@: -3,-1,1 Z:0.8
          this.fourthMoveTimeline = new GSAP.timeline({
            scrollTrigger:{
                trigger: ".fourth-move",     //Klasse wählen
                start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                end:"bottom bottom",
                id:"test4",
                scrub: 0.6,
                invalidateOnRefresh: true,
                //markers: true,
            },
        })

        this.fourthMoveTimeline.to(this.camera.orthographicCamera.position,{
          z: () =>{
            return (this.sizes.width*0.0037)     
          },

          y: 5.5,

         },"same4")

        this.fourthMoveTimeline.to(this.camera.oCamLookAt,{
          z: () =>{
            return (this.sizes.width*0.002)     
          },

          y: -0.5,

         },"same4")

        this.fourthMoveTimeline.to(this.camera.orthographicCamera.scale,{

          x: 0.35,
          y: 0.35,
          z: 0.35,
          
         },"same4")
           



            //----Fünfte Bewegung------------------------------ Cam: 2,5.5,3.8 Look@: -3,-0.5,2 Z:0.35
            this.fifthMoveTimeline = new GSAP.timeline({
              scrollTrigger:{
                  trigger: ".fifth-move",     //Klasse wählen
                  start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                  end:"bottom bottom",
                  id:"test5",
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                  //markers: true,
              },
          })

          this.fifthMoveTimeline.to(this.camera.orthographicCamera.position,{
            z: () =>{
              return (this.sizes.width*0.0035)     
            },

            y:4.5,
  
           
  
           },"same5")

           this.fifthMoveTimeline.to(this.camera.oCamLookAt,{
            z: () =>{
              return (this.sizes.width*0.0005)     
            },
  
            x: () =>{
              return -(this.sizes.width*0.0035)     
            },

            y:-1.5,
           
  
           },"same5")


            //----Printer Bewegung------------------------------ Cam: 2,4.5,3.8 Look@: -3,-1.5,2 Z:0.35
          this.PrinterMoveTimeline = new GSAP.timeline({
            scrollTrigger:{
                trigger: ".Printer-move",     //Klasse wählen
                start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                end:"bottom bottom",
                id:"test6",
                scrub: 0.6,
                invalidateOnRefresh: true,
                //markers: true,
            },
        })

        this.PrinterMoveTimeline.to(this.camera.orthographicCamera,{

          z: () =>{
            return (this.sizes.width*0.00)     
          },

         },"samePrinter")

        this.PrinterMoveTimeline.to(this.camera.oCamLookAt,{
          
          x: () =>{
            return -(this.sizes.width*0.0030)     
          },

          z: () =>{
            return -(this.sizes.width*0.0005)     
          },

          y: -1.2

         },"samePrinter")

         this.PrinterMoveTimeline.to(this.camera.orthographicCamera.scale,{

          x: 0.15,
          y: 0.15,
          z: 0.15,
          
         },"samePrinter")




          //----Sechste Bewegung------------------------------
          this.sixedMoveTimeline = new GSAP.timeline({
            scrollTrigger:{
                trigger: ".sixed-move",     //Klasse wählen
                start: "top top",       //Wenn obere Kante von div an oberer Kante des Bildschirms
                end:"bottom bottom",
                id:"test6",
                scrub: 0.6,
                invalidateOnRefresh: true,
                //markers: true,
            },
        })

        

               
      
        },



        //Mobile ----------------------------------------------------------------------------------------------------------------------
        "(max-width: 969px)": ()=>{

        },




        //ALL ----------------------------------------------------------------------------------------------------------------------
        all: ()=>{

          //Circles----------------------------------------
          this.firstMoveTimeline = new GSAP.timeline({

            //Wann soll was passieren
              scrollTrigger:{
                  trigger: ".first-move",  
                  start: "top top",       
                  end:"bottom bottom",
                  id:"test1",
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                  //markers: true,
              },
          })

          this.firstMoveTimeline.to(this.circleFirst.scale,{
            x: 3,
            y: 3,
            z: 3,
          })



          this.secondMoveTimeline = new GSAP.timeline({

            //Wann soll was passieren
              scrollTrigger:{
                  trigger: ".second-move",  
                  start: "top top",       
                  end:"bottom bottom",
                  id:"test1",
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                  //markers: true,
              },
          })

          this.secondMoveTimeline.to(this.circleSecond.scale,{
            x: 3,
            y: 3,
            z: 3,
          })



          this.thirdMoveTimeline = new GSAP.timeline({

            //Wann soll was passieren
              scrollTrigger:{
                  trigger: ".third-move",  
                  start: "top top",       
                  end:"bottom bottom",
                  id:"test1",
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                  //markers: true,
              },
          })

          this.thirdMoveTimeline.to(this.circleThird.scale,{
            x: 3,
            y: 3,
            z: 3,
          })

      },




            
        }); //Endo of MatchMedia


    }//End of ScrollTrigger



    




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