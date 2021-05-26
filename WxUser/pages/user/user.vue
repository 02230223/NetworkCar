<template>
	<view class="user">
		<view @click="trip" class="user-view"><image mode="widthFix" src="../../static/icon-record.png"></image>我的行程</view>
		<view class="hr-user"></view>
		<view @click="service" class="user-view"><image mode="widthFix" src="../../static/icon-service.png">客服中心</view>
		<view class="hr-user"></view>
		<view @click="alarm" class="user-view"><image mode="widthFix" src="../../static/icon-alarm.png">一键报警</view>
		<view class="hr-user"></view>
		<view @click="esc" class="user-view"><image mode="widthFix" src="../../static/icon-esc.png">退出登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		
		methods:{
			trip(){
				uni.navigateTo({
					url:"../order/order"
				})
			},
			esc(){
				wx.reLaunch({
					url:"../index/index"
				})
			},
			service(){
				uni.makePhoneCall({
					phoneNumber:"15537695997"
				})
			},
			alarm(){
				uni.navigateTo({
					url:"../alarm/alarm"
				})
			}
		}
	}
</script>

<style>
	.user{
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
	.user-view{
		width: 100%;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		display: flex;
	}
	page{
		background-color: #ebeaea;
	}
	.hr-user{
		width: 90%;
		margin: auto;
		height: 0.06em;
		background-color: #EBEAEA;
	}
	.user-view image{
		width: 10%;
		margin-top: 5%;
		margin-left: 10%;
		margin-right: 10%;
	}
</style>