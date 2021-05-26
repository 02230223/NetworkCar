<template>
	<view>
		<view style="color: #F1F1F1;text-align: center;font-size: 1.5em;margin-top: 15%;">本单距离您</view>
		<view style="color: #F1F1F1;font-size: 1.3em;text-align: center;">500米</view>
		<view style="display: flex;color: #F1F1F1;margin-top: 12%;margin-left: 40rpx;">
			<view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #4CD964;"></view><view style="margin-left: 30rpx;font-size: 1.0em;">上车点:{{current}}</view>
		</view>
		<view style="display: flex;color: #F1F1F1;margin-top: 5%;margin-left: 40rpx;">
			<view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #DD524D;"></view><view style="margin-left: 30rpx;font-size: 1.0em;">下车点:{{address}}</view>
		</view>
		<view style="display: flex;color: #F1F1F1;margin-top: 5%;margin-left: 40rpx;">
			<view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #C0C0C0;"></view><view style="margin-left: 30rpx;font-size: 1.0em;">全程总{{distance}}</view>
		</view>
		<view @click="jiedan" style="width: 96%;color: #F1F1F1;margin: auto;height: 250rpx; background-color: #F0AD4E;border-radius: 25rpx;margin-top: 80%;text-align: center;line-height: 250rpx;">
			{{num}}后停止接单
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:uni.getStorageSync("orderdata").current,
				address:uni.getStorageSync("orderdata").address,
				distance:uni.getStorageSync("orderdata").distance,
				num:15,
				timer:null
			}
		},
		onLoad(option) {	
			uni.setStorage({
				key:"ordernum",
				data:"111"
			})
			console.log(uni.getStorageSync("orderdata").tel)
			var tellengt=11
			var newstel=uni.getStorageSync("orderdata").tel.substring(tellengt-4,11)
			console.log(newstel)
			uni.setStorage({
				key:'newtel',
				data:newstel
			})
			this.timer=setInterval(()=>{
				this.num=this.num-1
				if(this.num==0){
					if(this.timer){
						clearTimeout(this.timer);
						this.timer=null;
						this.num="";
						uni.redirectTo({
							url:"../main/main"
						})
					}
				}
			},1000)
		},
		methods:{
			jiedan(){
				if(this.timer){
					clearTimeout(this.timer);
					this.timer=null;
					this.num="";
				}
				uniCloud.callFunction({
				  	name:"orderupdate",  
				  	data:{
				  		"driver":uni.getStorageSync("orderdata").orderId 
				  	}
				  }) ,
				uni.redirectTo({
					url:"../validation/validation"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #333333;
	}
</style>
