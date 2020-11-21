class json2nginx {
    constructor() {
        this.objectDepth = 0;
        this.result = " ";
    }
    parseSync(obj) {
        this.parseObject(obj);
        return this.result;
    }
    async parse(obj) {
        this.parseObject(obj);
        return this.result;
    }
    parseObject(obj) {
        let keys = Object.keys(obj);
        for (let keys in obj) {
            if (typeof obj[keys] === "string") {
                this.write(keys + " " + obj[keys] + ";");
            } else if (typeof obj[keys] == "object" && !Array.isArray(obj[keys])) {
                if (obj[keys].id != undefined) {
                    this.write("##_N2J_##_DO_NOT_REMOVE_##" + obj[keys].id)
                }
                if (obj[keys].args != undefined) {
                    this.write(keys + " " + obj[keys].args + " {");
                    this.objectDepth++;
                } else {
                    this.write(keys + " {");
                    this.objectDepth++;
                }
                this.parseObject(obj[keys].data);
                this.objectDepth--;
                this.write("}")
            } else if (Array.isArray(obj[keys])) {
                for (let i = 0; i < obj[keys].length; i++) {
                    if (typeof obj[keys][i] === "string") {
                        this.write(keys + " " + obj[keys][i] + ";");
                    } else if (obj[keys][i].data != undefined) {
                        if (obj[keys][i].id != undefined) {
                            this.write("##_N2J_##_DO_NOT_REMOVE_##" + obj[keys][i].id)
                        }
                        if (obj[keys][i].args != undefined) {
                            this.write(keys + " " + obj[keys][i].args + " {");
                            this.objectDepth++;
                        } else {
                            this.write(keys + " {");
                            this.objectDepth++;
                        }
                        this.parseObject(obj[keys][i].data);
                        this.objectDepth--;
                        this.write("}")
                    } else this.parseObject(obj[keys])
                }
            }
        }
    }
    write(data) {
        let depthPrefix = "    ".repeat(this.objectDepth)
        this.result += depthPrefix + data + "\n"
    }
}

module.exports = json2nginx;