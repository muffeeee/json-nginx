// Optional library used for this example
const fs = require("fs");
// Import library
const json2nginx = require("../index.js");
// Import JSON configuration
const json_config = require("./example-config.json");
// Define output path
const output_path_async = "./result-async.conf";
const output_path_sync = "./result-sync.conf"

// Synchronous example
let parsed_config = new json2nginx().parseSync(json_config)
fs.writeFileSync(output_path_sync, parsed_config);
console.log("Synchronous: File saved!")

// Asynchronous example
new json2nginx().parse(json_config).then((config) => {
    fs.writeFile(output_path_async, config, (err) => {
        if (err) throw err;
        console.log("Asynchronous: File saved!")
    })
})
