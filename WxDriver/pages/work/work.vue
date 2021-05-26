<template>
	<view>
		<view>
			<map :latitude="latitude" :longitude="longitude" :polyline="polyline" style="width: 100%;height: 1050rpx;" show-scale="true" show-compss="true" show-location="true"></map>
			<view style="margin-top: 5%;margin-left: 8%;">
				<view style="display: flex;"><view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #4CD964; margin-right: 3%;"></view>乘客:{{name}}</view>
				<view style="display: flex;margin-top: 5%;margin-bottom: 5%;"><view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #DD524D;margin-right: 3%;"></view>目的地:{{address}}</view>
				<view style="display: flex;"><view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #C0C0C0;margin-right: 3%;"></view>{{distance}}</view>
			</view>
			<button @click="pay" type="warn"  style=" margin-top: 6%;">发起支付</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				polyline:"",
				longitude:"",
				latitude:"" ,
				name:uni.getStorageSync("orderdata").name,
				address:uni.getStorageSync("orderdata").address,
				distance:uni.getStorageSync("orderdata").distance
			}
		},
		onLoad() {
			uni.getLocation({
				success:(data)=> {
					console.log(data)
					this.longitude=data.longitude
					this.latitude=data.latitude 
					this.polyline=
					[{
					  points: [{
					    longitude: data.longitude,
					    latitude: data.latitude
					  }, {
					    longitude: uni.getStorageSync("orderdata").Zlon,
					    latitude: uni.getStorageSync("orderdata").Zlat
					  }],
					  color: "#FF0000DD",
					  width: 4,
					  borderWidth:2,
					  arrowLine: true
					}];
				}
			}),
			
/* 			uniCloud.callFunction({
				name:"driverlike",
				data:{
					"orderId":uni.getStorageSync("orderdata").orderId
				}, 
				success: (e) => {
					console.log(e.result.data)
				}, 
			}) */
			console.log(uni.getStorageSync("orderdata").Zlat) 
		},
		methods:{
			pay(){
				wx.showModal({
				    title: '小简打车提醒您！',
				    content: '已向用户发起支付,点击确认返回主界面',
				    success: function (res) {
				      if (res.confirm) {  
						uniCloud.callFunction({
						  	name:"driverupdate",  
						  	data:{
						  		"driver":uni.getStorageSync("orderdata").orderId 
						  	}
						  }) 
						console.log('点击确认回调')
						wx.redirectTo({
							url:"../main/main"
						})
				      } else {   
				        console.log('点击取消回调')
				      }
				    }
				})
			}
		}
	}
</script>

<style>
</style>