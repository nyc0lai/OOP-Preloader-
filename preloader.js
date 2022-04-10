//Base Preloader class
class BasePreloader{
   #timerID
    constructor(rootDiv){
        this.rootDiv = rootDiv;
        this.init();
        this.onload;
    }
   get onload() {
        this.#timerID = setInterval(() => {
            this.step()
            if(this.condition()){
            clearInterval(this.#timerID);
            }
            this.rootDiv.innerHTML = this.render()
        }, this.timer);
    }
    init(){};
    step(){
        throw new ReferenceError("You must implement the step() method inside the inheriting class");
    };
    condition(){
        throw new ReferenceError("You must implement the condition() method inside the inheriting class");
        // throw is a statiment alows to generate a custom error
        // ReferenceError is an object which represent an error when a variable doesn't exist
        // in the current scope is referenced
    };
    render(){
        throw new ReferenceError("You must implement the render() method inside the inheriting class");
    };
}

//Progress Preloader class
class ProgressPreloader extends BasePreloader{
    constructor(rootDiv) {
        super(rootDiv);     
    }
    init(){
         this.progress = 0;
         this.timer = 500; 
    }
    step(){
        return this.progress += 10
    };
    condition(){
        return this.progress >= 100
        // return this.timerID == null;
    };
    render(){
        return `[${this.progress}]%`
    };
}


//Circular Preloader class
class CircularPreloader extends BasePreloader{
    constructor(rootDiv) {
        super(rootDiv);
    
    }
    init(){
        this.duration = 5250;
        this.timer = 250;
        this.symbols = [`|`,'/','--',`\\`];  
    }
    step(){
         this.duration -= 250;
        //************clockwise direction************//
        // let frame = this.symbols.shift();
        // this.symbols.push(frame);

        //*************anticlockwise direction */
        // let frame = this.symbols.pop();
        // this.symbols.unshift(frame);

        //*************anticlockwise direction with splice() method */
         let frame = this.symbols.splice(-1,1);
         this.symbols.splice(0,0,frame[0])
    };
    condition(){
        return this.duration <= 0
    };
    render(){
        return `[ ${this.symbols[0]} ]`
    };
}



//Incomplete Preloader class
class IncompletePreloader extends BasePreloader{
    constructor(rootDiv) {
        super(rootDiv);     
    }
    init(){
         this.progress = 0;
         this.timer = 500; 
    }
    step(){
        return this.progress += 10
    };
    // condition(){
    //     return this.progress >= 100
    // };
    //condition() its used for stop setTimer() at 100% for our case,
    // if te condition is removed then setTimer will work at infinite
    // in other words percents will increse at infinite (preloader will never stop).
    ///0%....50%......100%......150%.......∞ 

    render(){
        return `[${this.progress}]%`
    };
}

let pp1 = new ProgressPreloader(window['prel-1'])
let pp2 = new CircularPreloader(window['prel-2'])
let pp3 = new IncompletePreloader(window['prel-3'])