<template>
	<view>
		<view v-for="(item,i) in list" :key="i">
			<view  style="width: 90%; background-color: #FFFFFF;margin: auto;margin-top: 5%;border-radius: 40rpx;">
				<view style="display: flex;padding-left: 5%;padding-top: 3%;padding-bottom: 3%;">
					<view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #4CD964;"></view>
					<view style="padding-left: 3%;">出发地:{{item.current}}</view>
				</view>
				<view style="display: flex;padding-left: 5%;padding-top: 3%;padding-bottom: 3%;">
					<view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #DD524D;"></view>
					<view style="padding-left: 3%;">目的地:{{item.address}}</view>
				</view>
				<view style="display: flex;padding-left: 5%;padding-top: 3%;padding-bottom: 3%;">
					<view style="width: 35rpx;height: 35rpx;border-radius: 50%;background-color: #F0AD4E;"></view>
					<view style="padding-left: 3%;">状态:{{item.state}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name:'selectuser',
				data:{
					'name':uni.getStorageSync("userset")/* "Aɴᴅ J ." */
				},
				success: (e) => {
					this.list=e.result.data
				}
			})
		}
	}
</script>

<style>
	page{
		background-color: #555555;
	}
</style>
