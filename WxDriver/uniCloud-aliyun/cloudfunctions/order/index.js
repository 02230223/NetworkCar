'use strict';
const db=uniCloud.database();
const userDB=db.collection('user')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let order=await userDB.where({
		state:'发送行程'
	}).limit(1).get()
	
	//返回数据给客户端
	if(order.affectedDocs<1){
		return{
			code:-1,
			msg:"无单"
		}
	}else{
		return{
			code:0,
			msg:"有单",
			data:order.data
		}
	}
};
