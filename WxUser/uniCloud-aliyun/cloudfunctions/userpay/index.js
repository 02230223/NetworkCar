'use strict';
const db=uniCloud.database();
const userDB=db.collection('user')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const dbCmd = db.command
	let res = await db.collection('user').where({
	  state: '行程已结束',
	  orderId: event.orderId
	}).get()
	
	//返回数据给客户端
	if(res.affectedDocs<1){
		return{
			code:-1,
			msg:"无单"
		}
	}else{
		return{
			code:0,
			msg:"有单",
			data:res.data
		}
	}
};
