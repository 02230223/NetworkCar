'use strict';
const db=uniCloud.database();
const userDB=db.collection('driverinfo')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const dbCmd = db.command
	let res = await db.collection('driverinfo').where({
	  name: event.name,
	  pwd: event.pwd
	}).get()
	
	//返回数据给客户端
	if(res.affectedDocs<1){
		return{
			code:-1,
			msg:"没有此用户"
		}
	}else{
		return{
			code:0,
			msg:"登录成功",
			data:res.data
		}
	}
};
