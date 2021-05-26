'use strict';
const db=uniCloud.database();
const userDB=db.collection('user')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let userupdate=await userDB.where({
		orderId:event.driver
	}).update({
		state:'司机已接单'
	})
	
	//返回数据给客户端
	return event
};
