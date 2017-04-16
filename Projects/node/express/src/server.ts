/// <reference path="./typings/modules/express/index.d.ts" />
/// <reference path="typings/modules/body-parser/index.d.ts" />
require("express");

import * as express from "express";

class HttpServer {
    private _app : express.Application;
    constructor() {
        this._app = express();
        this._app.get("/", function(request: express.Request, response: express.Response) {
            response.send("Hello world");
        });
    }
    start(port:number) {
        this._app.listen(port, function() {
            console.log("`Express App is running on ${port}");
        });
    }
}

let server = new HttpServer();
server.start(5000);