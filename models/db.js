const mysql = require('mysql')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'answer'
})

exports.query = function(sql){

    //resolve和reject在then里定义,如果不then,可能默认为(err)=>{return err}和(res)=>{return res},且promise对象自动调用
    //所以这个query方法才能直接返回mysql api的返回值res和err
    //const res = await db.query()await后面跟promise,等待promise resolve了,才继续执行,并把结果赋给res
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if(err)return reject(err)
            connection.query(sql,(err,res) => {
                //只要进入回调函数,说明已经查询完了,就可以释放连接了
                connection.release()
                if(err)return reject(err)
                resolve(res)
            })
        })
    })
}
    