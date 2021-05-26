'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const collection=db.collection("user")
	//event为客户端上传的参数
	let user
	user=await collection.where({
		orderId:event.orderId
	}).get()
	return user
};
