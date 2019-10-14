const moment = require('moment')
const md5 = require('blueimp-md5')

const db = require('../models/db.js')

exports.get = (req,res,next) => {
    const sql = ``
    	console.log(req.body)

}

//把query方法封装成了promise函数,就可以在async方法中用await query(),以同步的方式写异步(即虽然同步写,但是异步拿,不会拿不到)
//因为回调函数可能有作用域问题,能用async就用async
exports.post = async (req,res,next) => {
	const body = req.body
	const sql = `insert into users (username,password,email,avatar,gender,modify_time) values 
	('${body.username}',
	'${md5(body.password)}',
	'${body.email}',
	'default-avatar.jpg',
	1,
	'${moment().format('YYYY-MM-DD HH:mm:ss')}');`
    //mysql插入操作返回一个值res是个对象,不是插入的行,是插入的行的状态信息,其中insertId是插入的行的id
    //但是按照restful接口设计规范,添加资源后应返回添加的资源
    try{
    	//query是异步操作,需await,才能用info拿到
    	const info = await db.query(sql)
        //mysql查询操作返回两个值res,fields,数组解构赋值
    	const [user] = await db.query(`select * from users where id = ${info.insertId}`)
    	//mysql查询操作返回的是个数组,数组里是查询到的行
    	res.status(201).json(user)
    }catch(err){
    	next(err)
    }
}

exports.patch = (req,res,next) => {
	
}

exports.delete = (req,res,next) => {
	
}