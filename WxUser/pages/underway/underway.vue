<template>
	<view style=" text-align: center;color: #FFFFFF;">
		<view style="display: flex;margin-top: 8%;margin-left: 5%;font-size: 1.6em;"><view style="width: 50rpx;height: 50rpx;background-color: #83DC42;border-radius: 50%;margin-right: 5%;"></view>司机已接单，正向你赶来！</view>
		<view style="margin-top: 5%;font-size: 1.0em;">预计在五分钟内到达上车点</view>
		<view style="display: flex;margin-top: 5%;margin-left: 25%;"><view style="width: 50rpx;height: 50rpx;background-color: #007AFF;border-radius: 50%;margin-right: 5%;"></view>司机——{{name}}</view>
		<view style="display: flex;margin-top: 5%;margin-left: 25%;"><view style="width: 50rpx;height: 50rpx;background-color: #DD524D;border-radius: 50%;margin-right: 5%;"></view>手机——{{tel}}</view>
		<view style="display: flex;margin-top: 5%;margin-left: 25%;"><view style="width: 50rpx;height: 50rpx;background-color: #555555;border-radius: 50%;margin-right: 5%;"></view>车牌——{{plate}}</view>
		<view style="margin-top: 10%;"><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4d5e750-801f-472e-9aec-75a1d2a4ce59/440e6b9b-5aa1-446f-b944-404da0c377db.jpg" alt=""></view>
		<view style="color: #F0AD4E;margin-top: 5%;">请耐心等待司机到达上车点</view>
	</view>
</template> 

<script>
	export default {
		data(){
			return{
				name:"Aɴᴅ J.",
				tel:"15537695997",
				plate:"豫s.XJ520",
				timer:null
			}
		},
		onLoad() {
			this.timer=setInterval(()=>{
				uniCloud.callFunction({
					name:"underway",
					data:{
						orderId:uni.getStorageSync("orderId")
					},
					success: (e) => {  
						if(e.result.code===0){
							console.log(e.result.data[0]) 
							uni.setStorage({
								key:'orderdata',
								data:e.result.data[0]
							}) 
							console.log(uni.getStorageSync("orderdata"))
							uni.redirectTo({ 
								url:'../pay/pay'  	 	
							}) 
							if(this.timer){
								clearTimeout(this.timer);
								this.timer=null; 
							}
							console.log(e.result.msg)
						}else{
							console.log(e.result.msg)
						}
					} 
				})
			},1500)
		}
	}
</script>

<style>
	page{
		background-color: #333333;
	}
</style>
