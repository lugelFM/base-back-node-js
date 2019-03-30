import { BaseServer } from '../src/serverBase';
import { CreateContainer } from '../src/repository/createContainer'
import { RepositoryTest } from './repositoryTest';
import { Tests } from './tests';
import { DBConnectionBase } from '../src/mysql/db';

let routes = [
    new Tests()
]

CreateContainer.addService("caso",(prop: any) => new RepositoryTest());
DBConnectionBase.config({
    host     : 'sql156.main-hosting.eu',
    user     : 'u424965413_ter4',
    password : 'ter4123',
    database : 'u424965413_destr'
});

BaseServer.run(routes);