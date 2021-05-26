<template>
	<view>
		<view>
			<view><map style="width: 100%;height: 800rpx;" show-scale="true" show-compass="true" show-location="true"  :longitude="longitude" :latitude="latitude" :polyline="polyline"></map></view>
		</view>
		<view class="center">
		<view class="center-center">
			<view><image style="width: 100rpx;height: 100rpx;" src="../../static/icon/tximg.png"></image></view>
			<view><text>{{name}}</text></view>
			<view @click="phonee"><text>{{phone}}</text></view>
		</view>
		</view>
		<view style="font-size: 1.2em;padding-top: 10%;color: #DD524D;text-align: center;margin-top: 10rpx; ">行程进行中</view>
		<view class="price">
			<view class="price-text"><text space="nbsp" style="font-size: 1.3em;">{{distance}}  {{money}}</text><text></text></view>
			<view class="price-text"><text>费用有疑问？</text></view>
		</view>
		<!-- <view style="margin-top: 20rpx;"><button type="primary"style="background-color: #007AFF;" size="default">支付</button></view> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				longitude:"",
				latitude:"",
				name:"Aɴᴅ J .",
				phone:'15537695997',
				money:uni.getStorageSync("orderdata").price,
				distance:uni.getStorageSync("orderdata").distance,
				polyline:"",
				timer:null
			}
		},
		onLoad(){
			this.timer=setInterval(()=>{
				uniCloud.callFunction({
					name:"userpay",
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
							uni.removeStorageSync("pay"),   
							uni.redirectTo({ 
								url:'../paypwd/paypwd'  	 	
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
			},1500),
			uni.getLocation({
				success:(data)=> {
					console.log(data)
					this.longitude=data.longitude
					this.latitude=data.latitude
				}
			}),
			this.polyline=
			[{
			  points: [{
			    longitude: uni.getStorageSync("Qlongitude"),
			    latitude: uni.getStorageSync("Qlatitude")
			  }, {
			    longitude: uni.getStorageSync("Zlongitude"),
			    latitude: uni.getStorageSync("Zlatitude")
			  }],
			  color: "#FF0000DD",
			  width: 4,
			  borderWidth:2,
			  arrowLine: true
			}];
		},
		onShow() {
			uni.setStorage({
				key:"pay",
				data:"行程"
			})
		},
		methods:{
			phonee(){
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			}
		}
	}
</script>

<style>
	.center{
		width: 750rpx;
		height: 200rpx;	
		border-bottom: 2rpx solid #808080;
	}
	.center-center{
		width: 600rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		margin: auto;
		padding-top:50rpx ;
		line-height: 100rpx;
	}
	.price{
		width: 750rpx;
		height: 150rpx;
		margin-top: 40rpx;
	}
	.price-text{
		text-align: center;
		padding-top:10rpx;
	}
</style>