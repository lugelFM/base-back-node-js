import mysql = require('mysql');


export class DBConnectionBase {

    private static _instance : DBConnectionBase;
    private static cnn : mysql.Connection;
    private static mustConnect : boolean = true;

    private static pool : mysql.Pool;
    
    public static config(config: string | mysql.PoolConfig){
        this.pool = mysql.createPool(config);
    }

    public static get instance(){
        return this._instance || ( this._instance = new this())
    }
    
    public static executeQuery(query : string, callback : Function){
        DBConnectionBase.pool.getConnection(function(err, connection){   
            if(err){
                console.log(err);                
            }
            try{
                connection.query(query, (err, results: Object[], fields )=> {
                    if(err){
                        console.log(err);
                        return callback(err);
                    }
                    callback(null, results);
                });             
                connection.release();
            }catch(err){
                console.log(err);         
                return null;       
            }
        });
    }

    private static connectDB (){
        this.cnn.connect(function(err) {              // The server is either down
            if(err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', err);
                //setTimeout(DBConnectionBase.connectDB, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
            console.log("connection succeed");            
        });                                     // process asynchronous requests in the meantime.
                                                // If you're also serving http, display a 503 error.
        this.cnn.on('error', function(err) {

            console.log('db error', err);
            
            DBConnectionBase.mustConnect = true;

            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                DBConnectionBase.connectDB();
            } else 
            {       
                if(err.code === 'ER_USER_LIMIT_REACHED')
                {
                    throw new DOMException("Se ha alcanzado el límite de conexiones (500), intententelo nuevamente más tarde"); 
                } 
                 else{
                    throw err;  
                }
            }
        });
    }
}
