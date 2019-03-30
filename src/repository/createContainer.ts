import { Container } from "./repositoyContainer";

export class CreateContainer{

        private static container : Container = new Container();

        static addService(entityName : string, callBack : Function){
                this.container.service(entityName, callBack)
        }

        static getContainer(): Container{
                return this.container;
        }
}