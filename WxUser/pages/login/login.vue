<template>
	<view>
		<view style="width: 85%;height: 880rpx;margin: auto;margin-top: 50%;background-color: #FFFFFF;border-radius: 50rpx;">
			<view class="bj" style="height: 380rpx;">
				<img style="height: 280rpx;margin-top: 100rpx;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4d5e750-801f-472e-9aec-75a1d2a4ce59/094e1ab2-d64d-4d5b-b72d-a17c5331200b.png" alt="">
			</view>
			<view style="text-align: center;margin-bottom: 10rpx;">{{name}}</view>
			<view><input @input="tel" v-model="telco" type="text" maxlength="11" placeholder="请输入手机号" style="text-align: center;border: 1px solid #333333;width: 85%;height: 95rpx;border-radius: 20rpx;margin: auto;"></view>
			<view style="text-align: center;margin-top: 30rpx;"><text>为方便使用，请输入手机号\n获取验证码</text></view>
			<view  @click="complete" style="text-align: center;"><img style="width: 160rpx;height: 160rpx;margin-top: 50rpx;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f4d5e750-801f-472e-9aec-75a1d2a4ce59/292e913d-49f0-4b21-925e-354a9fd85c16.png" alt=""></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:uni.getStorageSync("userset"),
				telco:""
			}
		},
		methods:{
			tel(ee){
					if(ee.target.value.length==11){
						console.log(ee.target.value)
						uni.setStorage({
							key:"tel",
							data:ee.target.value
						})
					}
			},
			complete(){
				console.log(22)
				let valsrc="";
				valsrc=this.telco;
				if(valsrc!=null && valsrc.length==11	){
					var random=Math.round((Math.random()+2)*1000);
					uni.setStorage({
						key:"radom",
						data:random
					})
					console.log(random)
					uniCloud.callFunction({
					 	name: 'sandcode',
						data:{
							"phone":this.telco,
							"code":random
						},
						success: (e)=> {
							console.log('这是发送验证码', e.result);
						}
					 })
					uni.navigateTo({
						url:"../validation/validation"
					})
				}else{
					wx.showModal({
					    title: '小简打车提醒您！',
					    content: '请输入手机号',
					    success: function (res) {
					      if (res.confirm) {  
					        
					      } else {   
					        console.log('点击取消回调')
					      }
					    }
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #F0AD4E;
	}
</style>
