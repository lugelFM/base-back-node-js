
export abstract class ModelBase {

  public id: number;
  
  constructor (id : number)
  {
    this.id = id;
  }

  public getStringUpdateDB() : string {
    let attr = Object.keys(this);
    let result = "";
    let aux : any = this;
    attr.forEach(prop => {
        result = result + prop + "=" + this.getValueDB(aux[prop]) + ",";
      }
    );
    result = result.substring(0, result.length-1);
    return result;
  }

  public getValuesDB(genericItem? : any) : string {
    let attr = genericItem ? Object.keys(genericItem) :  Object.keys(this);
    let result = "(";
    attr.forEach(prop => {
        result = result + prop + ",";
      }
    );
    result = result.substring(0, result.length-1) + ")";
    return result;
  }

  public getUpdateValues() : string {
    return "";
  }

  public getStringValuesCreateDB(genericItem? : any) : string {   
    let attr = genericItem? Object.keys(genericItem) :  Object.keys(this);
    let result = "(";
    let aux : any = this;
    attr.forEach(prop => {
        result = result + this.getValueDB(aux[prop])+ ",";
      }
    );
    result = result.substring(0, result.length-1) + ")";
    return result;
  }

  private getValueDB(value : any) : string{
    switch(typeof(value))
    {
        case 'number':
          return value.toString();
        case 'string':
          return "'" + value.toString() + "'";
        default:
          return "";
    }
  }
}