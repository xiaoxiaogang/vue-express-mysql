let shell = require('shelljs');
let async = require('async');

const {resolve} = require('path')
// __dirname 当前文件所在目录;
console.log('__dirddname : ' + __dirname)

const workDir = 'test';  //需要提交的文件目录
const branchName= 'master';
const modifyText = '"自动提交编译生成的文件，时间：'+(new Date()).toLocaleString()+'"';


const gitExePath =  {
    'status': 'git status',
    'check': 'git checkout  '+branchName,
    'pull': 'git pull origin '+branchName,
    'add': 'git add '+workDir,
    'commit': 'git commit -m  '+ modifyText,
    'push':  'git push origin '+branchName
}

const gitStatus = "git status -s";

//格式化执行结果数据为数组
function getBranch(data) {
    return data
        .toString()
        .split('\n')
        .map(s => s.trim())
}

//分类文件修改的名称，分类出需要提交的和不需要提交的文件
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
//打开当前package.json所有目录
shell.cd('./');

shell.ls('*.js').forEach((file) => {
    console.log('当前目录的所有文件:', file);
})


function myFirstFunction(callback) {
    const ret = shell.exec(gitExePath.check);
    console.log('DJDKKDKDKDD');
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
        console.log('====pull文件成功====');
        callback(null, '1');
    } else {
        callback(null, '0');
    }
}
function myLastFunction(arg1, callback) {
    if(arg1 === '0'){
        console.log('退出add');
        shell.exit(0);
    }
    const ret = shell.exec(gitExePath.add);
    if(ret.code === 0){
        console.log('====add文件成功====');
        callback(null, '1');
    } else {
        console.log('add失败，失败原因：:', ret.stderr);
        callback(null, '0');
    }
}

function gitCommit(arg1, callback) {
    if(arg1 === '0'){
        console.log('退出gitCommit')
        shell.exit(0);
    }
    const commitStatus = shell.exec(gitExePath.status)
    if( commitStatus.toString().indexOf("no changes added to commit") > -1){
        console.log('退出gitCommit,退出原因：没有需要commit的内容');
        shell.exit(0);
    }

    const ret = shell.exec(gitExePath.commit);
    if(ret.code === 0){
        console.log('====commit文件成功====');
        setTimeout(() => {
            callback(null, '1');
        }, 3000)
    } else {
        console.log('commit失败，失败原因：:', ret.stderr);
        callback(null, '0');

    }
}

function gitPush(arg1, callback) {
    if(arg1 === '0'){
        console.log('退出Push');
        shell.exit(0);
    }

    const ret = shell.exec(gitExePath.push);
    console.log('ret44:', ret);
    if(ret.code === 0){
        console.log('====Push文件成功====');
        callback(null, '1');
    } else {
        console.log('push失败，失败原因：:', ret.stderr);
        callback(null, '0');
    }
}

// let modifyFile = dearModifyType(getBranch(shell.exec(gitStatus)), 'aa');
// modifyFile.add.forEach((item, index, arr) => {
//     if(item.status === 1){
//     }
// })

async.waterfall([
     myFirstFunction,
    mySecondFunction,
    myLastFunction,
    gitCommit,
    gitPush
], function (err, result) {
    // result now equals 'done'
});






