import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import converter from "./Utils/convertDivsToSpans.js"



export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();                                        //Braucht der EventEmitter
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.device = this.sizes.device

        this.sizes.on("switchdevice", (device) => {
            this.device = device
        })

        this.world.on("worldReady", ()=>{
            this.setAssets();
            this.playFirstIntro();
        })


        
        
        
    }


    setAssets(){

        converter(document.querySelector(".intro-text"))
        converter(document.querySelector(".hero-main-title"))
        converter(document.querySelector(".hero-main-description"))
        converter(document.querySelector(".hero-second-subheading"))
        converter(document.querySelector(".hero-second-subheading2"))

        
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    
    };



    // Würfel erscheint, geht nach rechts und Schrift erscheint---------------------------------------------------

    firstIntro(){

        return new Promise((resolve)=>{
            this.timeline = new GSAP.timeline();

            //this.timeline.set(".animatedis", { y: 0, yPercent: 100 });        // MAcht style kaputt?
            this.timeline.to(".preloader", {                                    //   3 Ladepunkte verstecken
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });



        if(this.device  === "desktop"){

            this.timeline.to(this.roomChildren.WallCover.scale,{
                x:0.1,
                y:0.1,
                z:0.1,
                ease: "back.out(2.5)",
                duration:2,
            })

            this.timeline.to(this.roomChildren.WallCover.position,{
                x: () =>{
                    return -(this.sizes.width*0.007)     //With my PC = 1032px camera shall be at x= 1,6  => 1.6/1032 = 0.0016
                  },
                ease: "power1.out",
                duration: 1,
            })


            //Text animation
            this.timeline.to(".intro-text .animatedis",{
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.2)",

            onComplete: resolve,

            })

            //BouncingArrow
            this.timeline.to(".arrow-svg-wrapper",{
            opacity: 1
            })

        }

        else if(this.device === "mobile"){

            this.timeline.to(this.roomChildren.WallCover.scale,{
                x:0.1,
                y:0.1,
                z:0.1,
                ease: "back.out(2.5)",
                duration:2,
            })

            this.timeline.to(this.roomChildren.WallCover.position,{
                y: 3,
                ease: "power1.out",
                duration: 1,
            })

            //Text animation
            this.timeline.to(".intro-text .animatedis",{
            yPercent: -100,
            stagger: 0.07,
            ease: "back.out(1.2)",

            onComplete: resolve,

            })

            //BouncingArrow
            this.timeline.to(".arrow-svg-wrapper",{
            opacity: 1
            })


        }
        })

        


    };


    // ---------------------------------------------------

    secondIntro(){

        return new Promise((resolve2)=>{

        this.secondtimeline = new GSAP.timeline();


        //Desktop-----------------------
        //if(this.device  === "desktop"){

        //Text Intro verschwindet
        this.timeline.to(".intro-text .animatedis",{
            yPercent: 100,
            stagger: 0.07,
            ease: "back.in(1.2)",

        })

        //BouncingArrow verschwindet
        this.timeline.to(".arrow-svg-wrapper",{
            opacity: 0
        })

        //Restlichen Texte kommen
        this.timeline.to(".hero-main-title .animatedis",{
            yPercent: -100,
            stagger: 0.05,
            ease: "back.out(1.5)",
        },"sametexts")

        this.timeline.to(".hero-main-description .animatedis",{
            yPercent: -100,
            stagger: 0.05,
            ease: "back.out(1.5)",
        },"sametexts")

        this.timeline.to(".hero-second-subheading .animatedis",{
            yPercent: -100,
            stagger: 0.05,
            ease: "back.out(1.5)",
        },"sametexts")

        this.timeline.to(".hero-second-subheading2 .animatedis",{
            yPercent: -100,
            stagger: 0.05,
            ease: "back.out(1.5)",
        },"sametexts")

        //ToggleBar
        this.timeline.to(".toggle-bar",{
            opacity: 1
        },"sametexts")

        


        //Raumaufbau---

        this.secondtimeline.to(this.roomChildren.WallCover.position,{
            x: () =>{
                return (this.sizes.width*0.000)    
              },
            y:0,  
            ease: "power1.out",
            duration: 1,
        },"same")

        this.secondtimeline.to(this.roomChildren.WallCover.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "power1.out",
            duration: 1,
        },"same")

        this.secondtimeline.to(this.roomChildren.WallCover.rotation,{
            y: Math.PI*4,
            ease: "power1.out",
            duration: 1,
        },"same")

        this.secondtimeline.to(this.roomChildren.Wall.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "power1.out",
            duration: 1,
        },"same1")

        this.secondtimeline.to(this.roomChildren.WallCover.scale,{
            x: 0,
            y: 0,
            z: 0,
            ease: "back.out(1.5)",
            duration: 1,
        },"same2")

        //SetupFloor2
        this.secondtimeline.to(this.roomChildren.FloorRoom2.scale,{
            x: 1,
            y: 1,
            z: 1,
            delay: 0.3
        },"same2")

        this.secondtimeline.to(this.roomChildren.FloorRoom2.position,{
            x: 1.5,
            z: 5,
           
        },"same2")

    //}

        //Mobile---------------------------
        //else if(this.device === "mobile"){}


        
        //InnenEinrichtung---

        //Table --
        this.secondtimeline.to(this.roomChildren.TableFoot.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            
        },"same3")

        this.secondtimeline.to(this.roomChildren.TableTop.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.2
        },"same3")

        this.secondtimeline.to(this.roomChildren.TableTopTop.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.4
        },"same3")

        this.secondtimeline.to(this.roomChildren.BinBox.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.3
        },"same3")

        this.secondtimeline.to(this.roomChildren.BoxFrame.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.2,
        },"same3")

        this.secondtimeline.to(this.roomChildren.Pencilholder.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.8
        },"same3")

        this.secondtimeline.to(this.roomChildren.PencilBlue.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.9
        },"same3")

        this.secondtimeline.to(this.roomChildren.PencilRed.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.9
        },"same3")



        //PC --
        this.secondtimeline.to(this.roomChildren.PcScreen.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.5
        },"same3")

        this.secondtimeline.to(this.roomChildren.PcScreen001.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.5
        },"same3")

        //Keyboard --
        this.secondtimeline.to(this.roomChildren.Keyboard.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.7
        },"same3")

        this.secondtimeline.to(this.roomChildren.Key019.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.7
        },"same3")

        this.secondtimeline.to(this.roomChildren.KeyEsc.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.7
        },"same3")

        this.secondtimeline.to(this.roomChildren.Key080.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.7
        },"same3")

        //Plant --
        this.secondtimeline.to(this.roomChildren.PlantPot.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.6
        },"same3")

        this.secondtimeline.to(this.roomChildren.Leafs.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.6,
            delay: 0.7
        },"same3")

        //Clock --
        this.secondtimeline.to(this.roomChildren.Clock.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.0
        },"same3")

        this.secondtimeline.to(this.roomChildren.ZeigerStunden.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.2
        },"same3")

        this.secondtimeline.to(this.roomChildren.ZeigerMinuten.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.1
        },"same3")

        //Chair --
        this.secondtimeline.to(this.roomChildren.Chair.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.2
        },"same3")

        this.secondtimeline.to(this.roomChildren.ChairLeg.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.0
        },"same3")

        //TableSmall --
        this.secondtimeline.to(this.roomChildren.TableSmall.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.4
        },"same3")

        this.secondtimeline.to(this.roomChildren.Book004.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.7
        },"same3")

        this.secondtimeline.to(this.roomChildren.CoffeeMug.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.8
        },"same3")

        this.secondtimeline.to(this.roomChildren.PencilRed001.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.9
        },"same3")

        //Shelfs --
        this.secondtimeline.to(this.roomChildren.Shelfs.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.7
        },"same3")

        this.secondtimeline.to(this.roomChildren.Book.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.0
        },"same3")

        this.secondtimeline.to(this.roomChildren.Box.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.8
        },"same3")

        this.secondtimeline.to(this.roomChildren.Lamp001.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.9
        },"same3")

        this.secondtimeline.to(this.roomChildren.Shelfs001.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 0.7
            
        },"same3")

        this.secondtimeline.to(this.roomChildren.DekoAt.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.3
        },"same3")

        this.secondtimeline.to(this.roomChildren.Ordner.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.1
        },"same3")

        this.secondtimeline.to(this.roomChildren.Plane003.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.2
        },"same3")

        this.secondtimeline.to(this.roomChildren.Plane004.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.2
        },"same3")

        //Aquarium--
        this.secondtimeline.to(this.roomChildren.Base.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.3
        },"same3")

        this.secondtimeline.to(this.roomChildren.Glas.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.3
        },"same3")

        this.secondtimeline.to(this.roomChildren.rock.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.3
        },"same3")

        this.secondtimeline.to(this.roomChildren.SeaPlant.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.3
        },"same3")

        this.secondtimeline.to(this.roomChildren.Fish.scale,{
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
            delay: 1.3,

            onComplete: resolve2
        },"same3")

        


    
    })

    };



    //First Scroll------------------------------------------------------------------------------


    //Scroll

    onScroll(e){

        if(e.deltaY > 0){
            this.removeEventListeners();
            console.log("FirstScroll");

            this.playSecondIntro();
        }
    }


    //Touch

    onTouch(e){
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY; //Checks for swipe Up
        
        if(difference > 0){
            console.log("swiped");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null; //Not neccesary
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnce)
        window.removeEventListener("touchstart", this.touchStart)
        window.removeEventListener("touchmove", this.touchMove)
    }
    


   async playFirstIntro(){

       
       await this.firstIntro();     //Wait here unitl firstIntro is done
       
       this.scrollOnce = this.onScroll.bind(this);
       this.touchStart = this.onTouch.bind(this);
       this.touchMove = this.onTouchMove.bind(this);

       window.addEventListener("wheel", this.scrollOnce); //Check for first scroll
       window.addEventListener("touchstart", this.touchStart);
       window.addEventListener("touchmove", this.touchMove);

    }

    async playSecondIntro(){
        await this.secondIntro();
        this.emit("enablecontrols")
    }



    
}