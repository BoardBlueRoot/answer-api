const moment = require('moment')

const db = require('../models/db.js')

exports.get = (req,res,next) => {
    const sql = ``
}

exports.post = async (req,res,next) => {
	const {content,topic_id,reply_id} = req.body
	const sql = `insert into comments (content,modify_time,topic_id,user_id,reply_id) values (
	'${content}','${moment().format('YYYY-MM-DD HH:mm:ss')}','${topic_id}','${req.session.user.id}','${reply_id}');`
	try{
		const {insertId} = await db.query(sql)
		const [comment] = await db.query(`select * from comments where id = ${insertId}`)
		res.status(201).json(comment)
	}catch(err){
		next(err)
	}
}

exports.patch = (req,res,next) => {
	
}

exports.delete = (req,res,next) => {
	
}