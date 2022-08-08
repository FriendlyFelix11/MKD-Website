import EventEmitter from "events";

export default class Sizes extends EventEmitter{
    constructor(){
        super();                                        //Braucht der EventEmitter
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio,2)

        this.frustrum = 5;      //for Orthographic Cam


        window.addEventListener ("resize",()=> {
            this.width = window. innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio,2)

            this.emit("resize");
            
        })
    }
}