<template>
	<view class="content">
		<passkeyborad :show="show" @close="close"></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'; 
		export default {
			components: {
				passkeyborad,
			},
			data() {
				return {
					show: false,
				}
			},
			onLoad() {
				this.show = true,
				uni.removeStorageSync("pay"),
				uni.setStorage({
					key:"userifmoney",
					data:"支付"
				})
			},
			methods: {
				
			}
		}
</script>

<style>
	.content {
		}
		.logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
		}
		.text-area {
			display: flex;
			justify-content: center;
		}
		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}
</style>