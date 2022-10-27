import EventEmitter from "events";
//import Experience from "../Experience";
//import World from "./World";

export default class Theme extends EventEmitter{
    constructor(){
        super();
        
        this.theme = "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.setEventListeners();
        
    }


    setEventListeners(){
        this.toggleButton.addEventListener("click", ()=>{
            this.toggleCircle.classList.toggle("slide");


            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");


            this.theme = this.theme ==="light"? "dark" : "light";       //Check for light-theme = light-> Wenn nicht dann mach aus dark-> light
            

            console.log(this.theme);
            this.emit("switch", this.theme);
        })
    }
}