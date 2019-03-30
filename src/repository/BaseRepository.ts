import BaseResponse from "../model/response";
import { DBConnectionBase } from "../mysql/db";
import { ModelBase } from "../model/model-base";
import { messages, responseCodes } from "../common/enums";

export abstract class BaseRepository<T>
{
    abstract getEntityName() : string;

    public getList(callback : Function){
        const query = "select * from " + this.getEntityName();
        DBConnectionBase.executeQuery(query, (err : any, list : T[]) => {
            if(!err){
               callback(this.SuccessResponse<T[]>(list));
            } else {
               callback(this.ErrorResponse(err));
            }
        });
    }

    public getEntityById(id : string, callback : Function){
        const query = "select * from " + this.getEntityName() + " where id=" + id;
        DBConnectionBase.executeQuery(query, (err : any, entity : T) => {
            if(!err){
               callback(this.SuccessResponse<T>(entity));
            } else {
               callback(this.ErrorResponse(err));
            }
        });
    }

    public saveEntity(entity : ModelBase, callback : Function){
        const query = "insert into " + this.getEntityName() + entity.getValuesDB() + " values " + entity.getStringValuesCreateDB();
        DBConnectionBase.executeQuery(query, (err : any, entity : T) => {
            if(!err){
               callback(this.SuccessResponse<T>(entity));
            } else {
               callback(this.ErrorResponse(err));
            }
        });
    }

    public executeCommand<R>(command : string, callback : Function){
        DBConnectionBase.executeQuery(command, (err : any, result : R) => {
            if(!err){
               callback(this.SuccessResponse<R>(result));
            } else {
               callback(this.ErrorResponse(err));
            }
        });
    }

    public updateEntity(entity : ModelBase, callback : Function){
        const query = "update " + this.getEntityName() + entity.getUpdateValues() + " where id = " + entity.id;
        
        DBConnectionBase.executeQuery(query, (err : any, entity : T) => {
            if(!err){
               callback(this.SuccessResponse<T>(entity));
            } else {
               callback(this.ErrorResponse(err));
            }
        });
    }

    private SuccessResponse<R>( content : R) : BaseResponse<R>{
        return new BaseResponse(responseCodes.SUCCESS_OPERATION, messages.SUCCESS_RESPONSE, true, content); 
    }

    private ErrorResponse(msj : string) : BaseResponse<undefined>{
        return new BaseResponse(responseCodes.ERROR_OPERATION, msj, false);         
    }
}