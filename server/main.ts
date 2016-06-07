/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-handlebars/express-handlebars.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import {router} from './routing'


var port = process.env.PORT || 3000;


var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var server = http.createServer(app);

// Routing
// app.use(express.static(__dirname + '/public'));
console.log(__dirname)
app.use(express.static(__dirname + '/../web'));
app.use(express.static(__dirname + '/../../public'));
app.use("/bootstrap", express.static(__dirname + "/../../node_modules/bootstrap") )
	
app.use('/', router)
server.listen(port, () => console.log('connected on port ' + port + '!'))

let start = () =>
{
	console.log('start')
}

export default start
