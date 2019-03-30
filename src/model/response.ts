export default class BaseResponse<T> {

    private code : String;
    private message : String;
    private success : Boolean;
    private response? : T;

    constructor(code : String, message: String, success: Boolean, response? : T){
        this.code = code;
        this.message = message;
        this.success = success;
        this.response = response;
    }

    public getCode() : String {
        return this.code;
    }

    public getMessage() : String {
        return this.message;
    }

    public getSuccess() : Boolean {
        return this.success;
    }

    public getResponse() : T | undefined{
        return this.response;
    }

}

