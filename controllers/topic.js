const moment = require('moment')

const db = require('../models/db.js')

exports.get = async (req,res,next) => {
    let {_page = 1,_limit = 20} = req.query//对象解构赋值带默认值
    if(_page < 1)_page = 1
    if(_limit < 0)_limit = 0
    if(_limit > 20)_limit = 20
    const sql = `select * from topics limit ${(_page-1)*_limit},${_limit};`
    try{
		const list = await db.query(sql)
		res.status(200).json(list)
    }catch(err){
    	next(err)
    }

}

exports.post = async (req,res,next) => {
	const id = req.session.user.id
	const body = req.body
	const sql = `insert into topics (title,content,modify_time,user_id)	values (
	'${body.title}','${body.content}','${moment().format('YYYY-MM-DD HH:mm:ss')}',${id});`
	try{
	    const info = await db.query(sql)
		const topic = await db.query(`select * from topics where id = ${info.insertId};`)
		res.status(201).json(topic)
	}catch(err){
        next(err)
	}
}

exports.patch = async (req,res,next) => {
	const {id} = req.params
	const body = req.body
	const sql =`update topics set 
	title = '${body.title}',content = '${body.content}',modify_time = '${moment().format('YYYY-MM-DD HH:mm:ss')}';`
	try{
		await db.query(sql)
		const [topic] = await db.query(`select * from topics where id = ${id}`)
		res.status(201).json(topic)
	}catch(err){
		next(err)
	}
}

exports.delete = async (req,res,next) => {
	try{
		const {id} = req.params//params是个对象,里面有动态路由参数即:id
    	await db.query(`delete from topics where id = ${id}`)
    	res.status(201).json({})//按照restful接口规范,删除请求响应一个空对象
    }catch(err){
    	next()
    }
}