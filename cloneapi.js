
const path = require('path');
const fse = require('node-fs-extra');

let dir = function(pathName){
    return path.join(__dirname, pathName);
};


let resourcelocation = async function(filepath, jsonpath, callback){
    let file = await fse.readFileSync(filepath, { encoding: 'utf-8' });
    let replaceJson = await fse.readJsonSync(jsonpath,{ encoding: 'utf-8' });
    await  !callback && (callback = function(file){return file});
    await fse.outputFileSync(filepath, callback(file,replaceJson), { encoding: 'utf-8' });

}
let filematch = async function(parameter){
     let fileP = dir(parameter.filepath),
         jsonP = dir(parameter.jsonpath),
         newP = dir(parameter.newpath),
         state = true;
    await fse.copySync(fileP, newP);
     state = false;
    if(process.env.NODE_ENV == 'fe'){
        resourcelocation(newP,jsonP,parameter.callback);
    }
    if(state){
        console.log('API路径匹配不正确！');
        return;
    }
}

filematch({
    filepath : '/mock/api/index.js',
    jsonpath : '/mock/api/replace.json',
    newpath : '/src/api/index.js',
    callback : function(file,json){
        for(key in json){
            file = file.replace(/[\'\"](.*)[\'\"]/, function ($0,$1) {
                return "'"+json[$1]+'*'
            });
        }
        for(key in json){
            file = file.replace('*',"'");
        }
        return file;
    }
});

