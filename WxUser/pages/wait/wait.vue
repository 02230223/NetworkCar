<template>
	<view>
		<view class="view-head">
			<image src="../../static/icon-piace.png"></image>您上车的地点为<text class="view-text">{{address}}</text>
		</view>
		<view  class="view-text-body1">
			<text>正在为您寻找车辆，请稍等...</text>
			
		</view>
		<view class="view-text-body2"><text>每人一小步，更快更顺路</text></view>
		<view class="box"  >
			<text style="color: #F0AD4E;">正在为您寻找车辆...</text>
				<view class="view-anim"><span></span></view>
		</view>
		<view>
			<button type="default" style="background-color: #F0AD4E;color: #FFFFFF;" class="btn-cancel" @click="cancel">取消行程</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				address:"平顶山工业职业技术学院",
				timer:null
			} 
		},  
		onUnload() {
			console.log("asd")
			this.timeUp();
		},
		onLoad() {
			console.log(uni.getStorageSync("orderId"))
			this.timer=setInterval(()=>{
				uniCloud.callFunction({
					name:"userorder",
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
								url:'../underway/underway'  	 	
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
		onShow() {
			this.address = uni.getStorageSync("QaddressName");
				
		},
		methods:{  
			timeUp(){
				clearInterval(this.timer)
			},
			cancel(){
				wx.showModal({
				    title: '小简打车提醒您！',
				    content: '点击确认取消行程。',
				    success: function (res) {
				      if (res.confirm) {   
						  uniCloud.callFunction({
						  	name:"userupdate", 
						  	data:{
						  		"driver":uni.getStorageSync("date")
						  	}
						  })
				        console.log('点击确认回调')
						wx.redirectTo({
							url:"../cancel/cancel"
						})
						if(this.timer){
							clearTimeout(this.timer);
							this.timer=null; 
						}
				      } else {   
				        console.log('点击取消回调')
				      }
				    }
				})
			},
			

		}
	}
</script>

<style>
	page{
		background: #F1F1F1;
	}
	.view-text{
		font-size: 1.0em;
		margin-left: 4%;
		color: #DD524D;
	}
	.view-head{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		line-height: 100rpx;
		font-size: 0.6em;
	}
	.view-head image{
		width: 50rpx;
		height: 50rpx;
		margin-top: 3%;
		margin-left: 5%;
		margin-right: 3%;
		float: left;
	}
	.view-text-body1{
		text-align: center;
		font-size: 1.1em;
		margin-top: 10%;
		margin-bottom: 8%;
	}
	.view-text-body2{
		text-align: center;
		font-size: 0.9em;
		margin-bottom: 10%;
	}
	.box{
			position: relative;
			width: 500rpx;
			height: 500rpx;
			border: 5px solid #C8C7CC;
			border-radius: 50%;
			margin: auto;
			text-align: center;
			line-height: 500rpx;
			font-size: 1.2em;
		}
		.box .view-anim{
			display: block;
			width: 500rpx;
			height: 500rpx;
			position: absolute;
			left: -10px;
			top: -10px;
			border-radius: 50%;
			border: 10px solid transparent;
			/*旋转*/
			animation:circleRoate 10s ;
			animation-timing-function:linear;
			animation-iteration-count: infinite;
			
		}
		.box .view-anim span{
			position: absolute;
			left: 379rpx;
			top: 24rpx;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			background: #F0AD4E;
		}
	@keyframes circleRoate{
		from{transform: rotate(0deg) infinite;}
		to{transform: rotate(360deg);}
	}
	.btn-cancel{
		margin-top: 50%;
	}
</style>
