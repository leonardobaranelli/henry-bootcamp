const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
    print(process.cwd());
}

function date(print) {
    print(Date());
}

function echo(print, args) {
    print(args);
}

function ls(print) {
    fs.readdir(".", (error, files) => {
        if (error) throw Error("There was an error");
        print(files.join(" "));
    });
}

function cat(print, args) {
    printFile(print, args);
}

function head(print, args) {
    printFile(print, args, "head");
}

function tail(print, args) {
    printFile(print, args, "tail");
}

function curl(print, args) {
    utils.request(`https://${args}`, (error, response) => {
        if (error) throw new Error("There was an error");
        print(response);
    });
}

const printFile = (print, filename, lines) => {
    fs.readFile(filename, 'utf-8', (error, data) => {
        if (error) throw Error("There was an error");
        
        !lines && print(data);
        //lines === "head" && print(data.split("\n").slice(0,8).join("\n")); 
        lines === "head" && print(data.split("\n")[0]);
        lines === "tail" && print(data.split("\n").at(-1).trim());
    });
};

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail, 
    curl,    
};
