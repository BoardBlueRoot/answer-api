const md5 = require('blueimp-md5')

const db = require('../models/db.js')

exports.get = (req,res,next) => {
    if(!req.session.user){
    	return res.status(401).json({
    		error:'unauthorized'
    	})
    }
    res.status(201).json({
		message:'logined'
	})
}

exports.post = async (req,res,next) => {
	const body = req.body
	const sql = `select * from users where username = '${body.username}' and password = '${md5(body.password)}';` 
	const [user] = await db.query(sql)
	if(!user){
		return res.status(404).json({
			error:'invalid username or password'
		})
	}
	//登录成功,记录session
	req.session.user = user
	res.status(201).json({
		message:'login successfully '+body.username
	})
}

exports.patch = (req,res,next) => {
	
}

exports.delete = (req,res,next) => {
	delete req.session.user
	res.status(201).json({})
}