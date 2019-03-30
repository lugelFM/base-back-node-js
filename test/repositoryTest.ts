import { BaseRepository } from "../src/repository/BaseRepository";
import { ModelTest } from "./modelTest";

export class RepositoryTest extends BaseRepository<ModelTest>{
    getEntityName(): string {
        return "caso";
    }    
}