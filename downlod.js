var fs = require('fs')

var args = []

process.argv.forEach(function (val, index, array) {
    if (index >= 3) {
        args.push(val)
    }
});

var dev = true
var version = "TEST"
var https = require('https');
const { CallTracker } = require('node:assert');

    https.get("https://raw.githubusercontent.com/afonya2/dlman/main/versions.json", (responsea) => {
    let todo = '';

    // called when a data chunk is received.
    responsea.on('data', (chunk) => {
        todo += chunk;
    });

  // called when the complete response is received.
    responsea.on('end', () => {
        if (todo == "404: Not Found") {
            return console.log("update server not working...");
        }
        if (todo == "Error: getaddrinfo ENOTFOUND raw.githubusercontent.com") {
            return console.log("You have a slow internet");
        }
        let ttc = false
        let jons = JSON.parse(todo)
        for (let i = 0; i < jons.length; i++) {
            if (version == jons[i]) {
                ttc = true
            }
        }
        if (ttc == false) {
            console.log("dlman update!\nPlease download from github: https://github.com/afonya2/dlman");
            if (dev == true) {
                console.log("You are using the devmode of dlman.");
            }
        } else {
            console.log("dlman is up to date");
            if (dev == true) {
                console.log("You are using the devmode of dlman.");
            }
        }
    });

    }).on("error", (error) => {
    console.log("Error: " + error.message);
    });

console.log("searching...");

//var https = require('https');

    https.get("https://raw.githubusercontent.com/afonya2/dlman/main/packs.json", (responsea) => {
    let todo = '';

    // called when a data chunk is received.
    responsea.on('data', (chunk) => {
        todo += chunk;
    });

  // called when the complete response is received.
    responsea.on('end', () => {
        if (todo == "404: Not Found") {
            return console.log("server not working...");
        }
        if (todo == "Error: getaddrinfo ENOTFOUND raw.githubusercontent.com") {
            return console.log("You have a slow internet");
        }
        var cfg = JSON.parse(todo)
        https.get("https://raw.githubusercontent.com/afonya2/dlman/main/" + cfg[args[0].dir] + "pack.json", (responseab) => {
        let todoa = '';

        // called when a data chunk is received.
        responseab.on('data', (chunk) => {
            todoa += chunk;
        });

        // called when the complete response is received.
        responseab.on('end', () => {
            if (todoa == "404: Not Found") {
                return console.log("server not working...");
            }
            if (todoa == "Error: getaddrinfo ENOTFOUND raw.githubusercontent.com") {
                return console.log("You have a slow internet");
            }
            var cfgb = JSON.parse(todoa)
            for (let ia = 0; ia < cfgb.length; ia++) {
                https.get("https://raw.githubusercontent.com/afonya2/dlman/main/" + cfg[args[0].dir] + cfgb[ia], (responseabc) => {
                let todoaa = '';

                // called when a data chunk is received.
                responseabc.on('data', (chunk) => {
                    todoaa += chunk;
                });

                // called when the complete response is received.
                responseabc.on('end', () => {
                    if (todoaa == "404: Not Found") {
                        return console.log("server not working...");
                    }
                    if (todoaa == "Error: getaddrinfo ENOTFOUND raw.githubusercontent.com") {
                        return console.log("You have a slow internet");
                    }
                    console.log("Downloading: " + cfg[args[0].dir] + cfgb[ia]);
                    try {
                        let ffs = todo
                        fs.writeFileSync(args[1] + "/" + cfgb[ia], ffs);
                        console.log("Downloaded!");
                    } catch(e) {
                        console.log("Download fail: " + e.stack);
                    }
                });

                }).on("error", (error) => {
                console.log("Error: " + error.message);
                });
            }
            console.log("full downloaded to directory: " + args[1] + "!");
            console.log("name: " + cfg[args[0].name] + " description: " + cfg[args[0].desc]);
        });

        }).on("error", (error) => {
        console.log("Error: " + error.message);
        });
    });

    }).on("error", (error) => {
    console.log("Error: " + error.message);
    });
  