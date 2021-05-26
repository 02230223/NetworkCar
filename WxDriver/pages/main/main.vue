<template>
	<view>
		<!-- <uni-notice-bar  text="ssssssssssssssssss" backgroundColor="none" color="#cad4eb" scrollable="true" showIcon="true"></uni-notice-bar> -->
		<view style="width: 100%;height: 100rpx;background-color: #cad4eb;text-align: center;line-height: 100rpx;display: flex;">
			<view style="width: 70%;font-size: 0.6em;">祝祖国100年华诞生日快乐！</view>
			<!-- <uni-notice-bar  text="ssssssssssssssssss" backgroundColor="none" color="#cad4eb" scrollable="true" showIcon="true"></uni-notice-bar> -->
			<view @click="info" style="width: 30%;border-left: 2rpx solid #DADADA;">资讯</view>
		</view>
		<view style="display: flex;margin-top: 5%;margin-left: 2%;">
			<view  style="width: 150rpx;height: 150rpx;" ><open-data type="userAvatarUrl"></open-data><!-- <img style="width: 150rpx;height: 150rpx;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4d5e750-801f-472e-9aec-75a1d2a4ce59/4e51a97c-3a49-44d3-90e2-ee5bc1a1ddf7.png" alt=""> --></view>
			<view style="line-height: 200rpx;margin-left: 3%;"><open-data type="userNickName"></open-data></view>
			<view style="font-size: 0.6em;line-height: 200rpx;margin-left: 20%;">2021年5月7日加入小简司机</view>
		</view>
		<hr style="width: 95%;margin: auto;">
		<view style="display: flex;font-size: 0.9em;margin-left: 5%;margin-top: 10%;">
			<view style="width: 50rpx;height: 50rpx;background-color: #83DC42;border-radius: 50%;margin-right: 5%;"></view>
			单数:{{number}}
		</view>
		<view style="display: flex;font-size: 0.9em;margin-left: 5%;margin-top: 10%;">
			<view style="width: 50rpx;height: 50rpx;background-color: #F9221D;border-radius: 50%;margin-right: 5%;"></view>
			收入:{{money}}
		</view>
		<view style="display: flex;font-size: 0.9em;margin-left: 5%;margin-top: 10%;">
			<view style="width: 50rpx;height: 50rpx;background-color: #999999;border-radius: 50%;margin-right: 5%;"></view>
			信誉:{{evaluation}}
		</view>
		<view><img style="width: 95%;margin-bottom: 15%;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4d5e750-801f-472e-9aec-75a1d2a4ce59/1c20da68-cc0e-41ee-a1e3-f4770d45cf21.png" alt=""></view>
		<view style="width: 100%;height: 120rpx;display: flex;line-height: 120rpx;text-align: center;background-color: #cad4eb;border-radius: 30rpx;">
			<view style="width: 25%;">{{state}}</view>|
			<view @click="tingdan" style="width: 50%;">{{order}}</view>|
			<view @click="xiuxi" style="width: 25%;">{{rest}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				number:"23",
				money:"165",
				evaluation:"★★★★★",
				state:"休息中",
				order:"听单",
				rest:"休息",
				timer:null
			}
		},
		onLoad() {
			
			if(uni.getStorageSync("ordernum")!=""){
				uni.removeStorageSync("ordernum")
				this.state="听单中",
				this.order=".....",
				this.timer=setInterval(()=>{
					uniCloud.callFunction({
						name:"order",
						success: (e) => { 
							if(e.result.code===0){
								console.log(e.result.data[0])
								uni.setStorage({
									key:'orderdata',
									data:e.result.data[0]
								})
								console.log(uni.getStorageSync("orderdata"))
								uni.navigateTo({
									url:'../order/order'
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
				},3000)
			}
		}, 
		methods:{
			info(){ 
				uni.navigateTo({
					url:"../journalism/journalism"
				})
			},
			tingdan(){
				this.state="听单中",
				this.order=".....",
				this.timer=setInterval(()=>{
					uniCloud.callFunction({
						name:"order",
						success: (e) => { 
							if(e.result.code===0){
								console.log(e.result.data[0])
								uni.setStorage({
									key:'orderdata',
									data:e.result.data[0]
								})
								console.log(uni.getStorageSync("orderdata"))
								uni.navigateTo({
									url:'../order/order'
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
			},
			xiuxi(){
				this.state="休息中",
				this.order="听单";
				if(this.timer){
					clearTimeout(this.timer);
					this.timer=null;
				}
			}
		}
	}
</script>

<style>
</style>
