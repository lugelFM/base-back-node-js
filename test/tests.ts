import { BaseRoutes } from "../src/routes/baseRoutes";
import { ModelTest } from "./modelTest";

export class Tests extends BaseRoutes<ModelTest>{
    getEntity(): string {
        return "caso";
    }

    getMethod(): string {        
        return "/casos";
    }


}