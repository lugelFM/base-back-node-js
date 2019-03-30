import app from './app';
import { Clients } from './routes/clients';
import { BaseRoutes } from './routes/baseRoutes';

export class BaseServer{

    constructor(){
        
    }
    
    static PORT = process.env.PORT || 3000;
    
    static run(routes : BaseRoutes<any>[]){
        let  App = new app(routes);
        App.app.listen(this.PORT, () =>{
            console.log('Corriendo en el puerto ' + this.PORT);
        });        
    }
}