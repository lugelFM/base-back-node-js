export class Container {
    services: any;
    [key:string]: any;
    constructor(){
        this.services = {};
    }

    service(name : string, cb: Function){
        Object.defineProperty(this, name, {
            get: () => {
                if(!this.services.hasOwnProperty(name)){
                    this.services[name] = cb(this);
                }
                return this.services[name];
            },
            configurable: true,
            enumerable: true
        });

        return this;
    }

    getService(name : any) : any{     
        return this[name];
    }

}