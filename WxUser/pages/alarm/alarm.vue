<template>
	<view>
		<view class="top">
			<view class="toptext1"><text>遇到危机，请向警方求助</text></view>
			<view class="toptext2"><text>谎报警情可能被处以5日以上10日以下拘留</text></view>
		</view>
		<view class="center">
			<view class="center-text1"><text>当前位置</text></view>
			<view class="center-text2" @click="addd">{{aaa}}</view>
		</view>
		<view class="bottom">
			<!-- <input type="text" placeholder="输入目标电话" v-model="phone" /> -->
			<button class="submit" type="warn" @click="submit(phone)">呼叫110</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// text:''
			     aaa:'点击获取当前位置'
			}
		},
		methods:{
			addd:function(){
				uni.getLocation({
					type:'wgs84',
					success:function(res){
						console.log('当前位置的经度'+res.longitude);
						console.log('当前位置的维度'+res.latitude);
					}
				}),
				uni.chooseLocation({
					success:(res)=>{
						// this.aaa=res.name;
						console.log('位置名称'+res.name)
						console.log('位置名称'+res.address)
						console.log('位置名称'+res.latitude)
						console.log('位置名称'+res.longitude)
						this.aaa=res.name
					}
				})
			},
			 submit(phone){
			 // 	let Lphone=this.phone;
			 // 	console.log(Lphone);
			 // 	this.text=Lphone;
				// //console.log(Lphone);
				// Lphone='110';
			 	uni.makePhoneCall({
			 		phoneNumber:'110'
			 	})
			 }
			
		}
	}
</script>

<style>
	page{
		background-color: #F1F1F1;
	}
	.toptext1{
		text-align: center;
		margin-top: 50rpx;
	}
	.toptext1 text{
		font-size: 50rpx;
		font-weight: bold;
		color: red;
	}
	.toptext2{
		text-align: center;
		margin-top: 20rpx;
	}
	.toptext2 text{
		font-size: 30rpx;
		color: #333333;
	}
	.center{
		width: 730rpx;
		height: 200rpx;
		background-color: #FFFFFF;	
		border-radius: 20px;
		margin: auto;
		margin-top: 150rpx;
		text-align:center;
		color: #555555;
	}
	.center-text1
	{
		padding-top: 20rpx;
	}
	.center-text2{
		margin-top: 20rpx;
	}
	.bottom{
		width: 700rpx;
		height: 100rpx;
		margin: auto;
		margin-top: 800rpx;
	}
</style>
