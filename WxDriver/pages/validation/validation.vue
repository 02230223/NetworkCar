<template>
	<view>
		<!-- <view style="text-align: center;"  v-for="(item,i) in list" :key="i">
			<view>乘客：{{item.name}}</view>
			<view>起始点：{{item.current}}</view>
			<view>目的地：{{item.address}}</view>
			<view>{{item.distance}}</view>
			<view>{{item.price}}</view>
		</view> -->
		<view style="margin-top: 15%; margin-left: 5%;">
			<view style="display: flex; margin-bottom: 5%;color: #FFFFFF;"><view style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #83DC42;margin-right: 2%;"></view>乘客上车点:{{Qaddress}}</view>
			<view style="display: flex; margin-bottom: 5%;color: #FFFFFF;"><view style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #DD524D;margin-right: 2%;"></view>行程目的地:{{Zaddress}}</view>
			<view style="display: flex; margin-bottom: 5%;color: #FFFFFF;"><view style="width: 50rpx;height: 50rpx;border-radius: 50%;background-color: #999999;margin-right: 2%;"></view>全程{{length}}</view>
		</view>
		<hr>
		<view class="content" >
		    <view style="height: 150rpx;padding: 30rpx 30rpx;color: #FFFFFF;">请输入乘客手机后四位：</view>
		    <view style="height: 150rpx;margin-top: 50rpx;"><validcode ref="code" :maxlength="4" :isPwd="false" @finish="getCode" ></validcode></view>
		    <!-- <view>密码:</view> -->
		    <!-- <validcode ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd"></validcode> -->
		    <view style="display: flex; margin: auto; margin-top: 200rpx;"><button  style="width: 300rpx;" type="primary" @tap="clearCode">清空</button>
			<button style="width: 300rpx;" type="primary" @click="yzsjh">验证</button></view>
		    <!-- <button type="primary" @tap="clearPwd">清空密码</button> -->
		
		</view> 
	</view>
</template> 

<script>
	import validCode from '../../components/p-validCode/validCode.vue';
	
	 export default {
		 components:{
			 validcode:validCode
		 },
	        data() {
	            return {
					Qaddress:uni.getStorageSync("orderdata").current,
					Zaddress:uni.getStorageSync("orderdata").address,
					length:uni.getStorageSync("orderdata").distance,
					num:""
					
				};
	        },
	        onLoad() {
				console.log(uni.getStorageSync("newtel")) 
				console.log(uni.getStorageSync("orderdata")) 
			},
	        methods: {
	            //获取code码
	            getCode(val) {
	                console.log(val);
					this.num=val;
	            },
	            //获取密码
	            // getPwd(val) {
	            //     console.log(val);
	            // },
	            // 清空验证码
	            clearCode(){
	                 this.$refs.code.clear();
	            },
	            // 清空密码
	            // clearPwd(){
	            //      this.$refs.pwd.clear();
	            // }
				yzsjh(){  
					console.log('验证成功'+this.num)
					if(uni.getStorageSync("newtel")==this.num){
						wx.showToast({
							title:'验证成功！',
							icon:"success",
							duration:1500
						}),
						uniCloud.callFunction({
						  	name:"valiupdate",  
						  	data:{
						  		"driver":uni.getStorageSync("orderdata").orderId 
						  	}
						  }) , 
						uni.redirectTo({
							url:"../work/work"
						})
					}else{
						wx.showToast({
							title:'验证失败！',
							icon:"none",
							duration:1500
						})
					}
					
					/* wx.showToast({
					  title: '操作成功！',   // 标题
					  icon: 'success',      // 图标类型，默认success
					  duration: 1500        ,// 提示窗停留时间，默认1500ms
					  
					} */
				}
	        }
	    };
</script>

<style>
	page{
		background-color: #333333;
	}
	.content {
	        height: 400upx;
	    }
	    button{
	        margin-top: 30upx;
	    }
</style>