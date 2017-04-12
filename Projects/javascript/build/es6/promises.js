var p1 = Promise.resolve('Resolve Me');
p1.then(function (res) { return console.log("" + res); });
var p2 = new Promise(function (resolve, reject) {
    setTimeout(function () { return resolve('Resolve Me'); }, 2000);
});
p2.then(function (res) { return console.log(res + "<br />"); });
