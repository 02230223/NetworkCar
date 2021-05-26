'use strict';
const db=uniCloud.database();
const drivercarDb=db.collection('user')
exports.main = async (event, context) => {
	return await drivercarDb.where({
		name:event.name
	}).get() 
};
