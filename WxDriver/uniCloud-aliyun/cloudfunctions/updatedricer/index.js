'use strict';
const db=uniCloud.database();
const userDB=db.collection('driverinfo')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let userupdate=await userDB.where({
		name:event.name
	}).update({
		pwd:event.pwd
	})
	
	//返回数据给客户端
	return event
};
