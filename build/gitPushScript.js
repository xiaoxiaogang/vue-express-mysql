let shell = require('shelljs');
let async = require('async');

const {resolve} = require('path')
// __dirname 当前文件所在目录;
console.log('__dirname : ' + __dirname)

const workDir = 'test';
const modifyText = '提交编译生成的文件';


const gitExePath =  {
        'check': 'git checkout  master',
        'pull': 'git pull origin master',
        'add': 'git add *',
        'commit': 'git commit -m  '+ modifyText,
        'push':  'git push origin master'
    }

const gitStatus = "git status -s";

//格式化执行结果数据为数组
function getBranch(data) {
    return data
        .toString()
        .split('\n')
        .map(s => s.trim())
}

//打开应用程序
// 并且跳转到对应工作目录
function openCmd(cmdPath){
    const ret = shell.exec(cmdPath);
    console.log('ret:', ret.stdout);
    return  ret;
}
//分类文件修改的名称
function dearModifyType(ret, filter){
    let dataRet = {'add': [], 'modi': []};
    console.log('aa:', ret);
    ret.forEach((item, index, arr) => {
        console.log('11', item.split(" "))
        if(item.split(" ").length > 1){
            console.log('22')
            if(item.split(" ")[0] === '??'){
                dataRet.add.push({'name': item.split(" ")[1] , 'status': item.indexOf(filter+'/') >  -1? 1: 0})
            }else{
                dataRet.modi.push({'name': item.split(" ")[1] , 'status': item.indexOf(filter+'/') >  -1? 1: 0})
            }
        }
      })

    return dataRet;
}

if (!shell.which('git')) {
    //向命令行打印git命令不可用的提示信息
    shell.echo('Sorry, this script requires git');
    //退出当前进程
    shell.exit(1);
}
shell.cd(__dirname+'\\test');



shell.ls('*.js').forEach((file) => {
    console.log('88888888aaa', file);
})

function myFirstFunction(callback) {
    const ret = shell.exec(gitExePath.check);
    console.log('ret11:', ret);
    if(ret.stdout.indexOf('Already on \'master') > -1){
        callback(null, '1');
    } else {
        callback(null, '0');
    }
}
function mySecondFunction(arg1, callback) {
    // arg1 now equals 'one'
    const ret = shell.exec(gitExePath.pull);

    if(ret.stdout.indexOf('Already up to date') > -1){
        callback(null, '1');
    } else {
        callback(null, '0');
    }
}
function myLastFunction(arg1, callback) {
    // arg1 now equals 'three'
    const ret = shell.exec(gitExePath.add);
    console.log('ret22:', ret);
    if(ret.stdout.indexOf('Already up to date') > -1){
        callback(null, '1');
    } else {
        callback(null, '0');
    }
}

function gitCommit(arg1, callback) {
    // arg1 now equals 'three'
    const ret = shell.exec(gitExePath.commit);
    console.log('ret33:', ret);
    if(ret.stdout.indexOf('Already up to date') > -1){
        callback(null, '1');
    } else {
        callback(null, '0');
    }
}

function gitPush(arg1, callback) {
    // arg1 now equals 'three'
    const ret = shell.exec(gitExePath.push);
    console.log('ret44:', ret);
    if(ret.stdout.indexOf('Already up to date') > -1){
        callback(null, '1');
    } else {
        callback(null, '0');
    }
}
let modifyFile = dearModifyType(getBranch(shell.exec(gitStatus)), 'aa');
console.log('modifyFile:', modifyFile);
modifyFile.add.forEach((item, index, arr) => {
    if(item.status === 1){

    }
})




//shell.exec(gitExePath.push);

async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
    gitCommit,
    gitPush
], function (err, result) {
    // result now equals 'done'
});






