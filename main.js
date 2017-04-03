var conf = require('example.json');
function parseObject(obj) {
  var keys = Object.keys(obj);
  for (keys in obj) {
    if (typeof obj[keys] === "string") {
      console.log(keys + " " + obj[keys] + ";");
    }
    else if (typeof obj[keys] == "object" && !Array.isArray(obj[keys])) {
      parseObject(obj[keys]);
    }
    else if (Array.isArray(obj[keys])) {
      for (i=0; i<obj[keys].length; i++) {
        if (typeof obj[keys][i] === "string") {
          console.log(keys + " " + obj[keys][i] + ";");
        }
        else if (obj[keys][i].data != undefined) {
          if (obj[keys][i].args != undefined) { console.log(keys + " " + obj[keys][i].args + " {") }
          else { console.log(keys + " {") }
          parseObject(obj[keys][i].data);
          console.log("}")
        }
        else parseObject(obj[keys]);
      }
    }
  }
}

parseObject(conf);
