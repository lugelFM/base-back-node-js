import { ModelBase } from "../src/model/model-base";

export class ModelTest extends ModelBase{
    
    private AbogadoId? : number;
    private ClientesId : number;
    private Asunto : string;
    private Descripcion : string;

    constructor(
        AbogadoId: number,
        ClientesId: number,
        Asunto: string,
        Descripcion: string,
        id: number
    ){
        super(id);
        this.AbogadoId = AbogadoId;
        this.ClientesId = ClientesId;
        this.Asunto = Asunto;
        this.Descripcion = Descripcion;
    }

    public get getAbogadoId(){
        return this.AbogadoId;
    }

    public set setAbogadoId(AbogadoId: number){
        this.AbogadoId = AbogadoId;
    }

    public get getClientesId(){
        return this.ClientesId;
    }

    public set setClientesId(ClientesId: number){
        this.ClientesId = ClientesId;
    }

    public get getDescripcion(){
        return this.Descripcion;
    }

    public set setDescripcion(Descripcion: string){
        this.Descripcion = Descripcion;
    }

    public get getAsunto(){
        return this.Asunto;
    }

    public set setAsunto(Asunto: string){
        this.Asunto = Asunto;
    }

}