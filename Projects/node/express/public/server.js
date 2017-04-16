"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("express");
var express = require("express");
var HttpServer = (function () {
    function HttpServer() {
        this._app = express();
        this._app.get("/", function (request, response) {
            response.send("Hello world");
        });
    }
    HttpServer.prototype.start = function (port) {
        this._app.listen(port, function () {
            console.log(`Example Express App running on ${port}`);
        });
    };
    return HttpServer;
}());
var server = new HttpServer();
server.start(5000);
//# sourceMappingURL=server.js.map