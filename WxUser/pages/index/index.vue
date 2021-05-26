 <template>	 
	<view>
		<view><map style="width: 100%;height: 1000rpx;" show-scale="true" show-compass="true" show-location="true" :polyline="polyline" :longitude="longitude" :latitude="latitude">
		<view @click="user" class="icon-user icon"><image mode="widthFix" src="../../static/icon-user.png"></image></view>
		<view @click="alarm" class="icon-alarm icon"><image mode="widthFix" src="../../static/icon-alarm.png"></image></view>
		</map></view>
		<view>
			<view>
				<view class="text" style="color: #F0AD4E;"><text space="nbsp">{{mess}}  {{price}}</text></view>
				<view class="hr-view"></view>
				<view class="since" @click="since">{{current}}</view>
				<view  class="final" @click="destination">{{address}}</view>
				<button style="background-color: #F0AD4E;" type="default" @click="userwait" class="btn">呼叫快车</button>
			</view>
		</view>
	</view>
</template> 
 
<script>
	var QQMapWX = require('../../untils/qqmap-wx-jssdk.js');
	var qqmapsdk=new QQMapWX({
		key:'ODSBZ-IHYRQ-WMZ5M-GDTCV-3GCJH-P3FTY'
	});
	export default {
		
		data() {
			return {
				form:{
					orderId:"",
					current:"", //起点
					address:"", //目的地
					name:"", //乘客姓名
					distance:"", //距离
					price:"", //价格
					tel:uni.getStorageSync("tel"), //手机号
					state:"发送行程", //状态
					Qlat:"",
					Qlon:"",
					Zlat:"",
					Zlon:"",
					driver:"无"
					
				},
				mess:"选择位置",
				price:"",
				longitude:"",
				latitude:"",
				address:"你想去哪儿?",
				current:"我的位置",
				polyline: "",
				sss:""
			}

		},
		onShow() {
			  wx.hideHomeButton() 
			  if(uni.getStorageSync("userifmoney")!=""){
				  uni.redirectTo({
				  	url:"../paypwd/paypwd"
				  })
			  }if(uni.getStorageSync("pay")!==""){
				  uni.redirectTo({
				  	url:"../pay/pay"
				  })
			  }
		},
		onLoad() {
				uni.getLocation({
					success:(data)=> {
						console.log(data)
						this.longitude=data.longitude
						this.latitude=data.latitude
					}
				})
				if(uni.getStorageSync("userset")==""){
					var that=this
					wx.showModal({
					    title: '小简打车提醒您！',
					    content: '请选择信息授权',
					    success: function (res) {
					      if (res.confirm) {  
					        wx.getUserProfile({
					          desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					          success: (res) => { 
								uni.setStorage({
									key:"userset",
									data:res.userInfo.nickName
								}),
								that.form.name=res.userInfo.nickName
								console.log(that.form.name)
								console.log(uni.getStorageSync("userset"))
					          }
					          
					        }) 
					      } else {   
					        console.log('点击取消回调')
					      }
					    }
					})
				}else{
					this.form.name=uni.getStorageSync("userset")
					console.log(this.form.name)
				}
				console.log(new Date())
				
		},
		methods: {
			juli(la1, lo1, la2, lo2) {
				 // console.log("ss")
			  var La1 = la1 * Math.PI / 180.0;
			  var La2 = la2 * Math.PI / 180.0;
			  var La3 = La1 - La2;
			  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
			  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
			  s = s * 6378.137; //地球半径
			  s =Math.round(s * 10000) / 10000;
			  var money=5;
			  console.log("计算结果",parseInt(s));
			  if(Math.round( s*1000) < 1000){
				  this.mess="距离："+Math.round( s*1000)+"m";
				  this.price="价钱："+money+"元";
				  this.form.distance=this.mess;
				  this.form.price=this.price;
			  }if(Math.round( s*1000) >= 1000){
				  this.mess="距离："+parseFloat(s*1).toFixed(1)+"km";
				  money=money+Math.round(s*1.5);
				  this.price="价钱："+money+"元"; 
				  this.form.distance=this.mess;
				  this.form.price=this.price;
			  }
			   
			  //return s
			}, 
			userwait(){
				if(this.form.tel==""){
					uni.navigateTo({
						url:"../login/login"
					})
				}else{
					if(this.sss!=""){
						uniCloud.callFunction({
							name:"useradd",
							data:this.form,
							success: (e) => {
								console.log(e.result.orderId)
								uni.setStorage({
									key:"orderId",
									data:e.result.orderId
								})
								console.log(uni.getStorageSync("orderId"))
							}
						})
						uni.redirectTo({
							url:"../wait/wait"
						})
					}else{
						wx.showModal({
						    title: '小简打车提醒您！',
						    content: '请选择目的地',
						    success: function (res) {
						      if (res.confirm) {  
								
						      } else {   
						        console.log('点击取消回调')
						      }
						    }
						})
					}
				}
			},
			alarm(){
				uni.navigateTo({
					url:"../alarm/alarm"
				})
			},
			user(){
				console.log(222)
				uni.navigateTo({
					url:'../user/user'
				})
			},
			since(){
				uni.chooseLocation({
					success:  (res) => {
					    console.log('位置名称：' + res.name);
					    console.log('详细地址：' + res.address);
					    console.log('纬度：' + res.latitude);
					    console.log('经度：' + res.longitude);
						this.current=res.name;
						this.longitude=res.longitude;
						this.latitude=res.latitude;
						this.form.Qlat=res.latitude;
						this.form.Qlon=res.longitude;
						uni.setStorage({
							key:"Qlongitude",
							data:res.longitude
						});
						uni.setStorage({
							key:"Qlatitude",
							data:res.latitude
						});
						this.form.current=res.name;
						uni.setStorage({
							key:"QaddressName",
							data:res.name
						})
					}
				})
			},
			destination(){
				if(uni.getStorageSync("QaddressName")!=""){
					uni.chooseLocation({
					    success:  (res) => {
					        console.log('位置名称：' + res.name);
					        console.log('详细地址：' + res.address);
					        console.log('纬度：' + res.latitude);
					        console.log('经度：' + res.longitude);
							this.address=res.name;
							this.form.Zlat=res.latitude;
							this.form.Zlon=res.longitude;
							uni.setStorage({
								key:"Zlongitude",
								data:res.longitude
							});
							uni.setStorage({
								key:"Zlatitude",
								data:res.latitude
							});
							this.form.address=res.name;
							uni.setStorage({
								key:"ZaddressName",
								data:res.name
							});
							this.form.orderId=new Date()
							uni.setStorage({
								key:"date",
								data:this.form.orderId 
							})
							console.log(uni.getStorageSync("date")) 
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
							this.juli(uni.getStorageSync("Qlatitude"),uni.getStorageSync("Qlongitude"),res.latitude,res.longitude);
							console.log(this.form)
							this.sss="sss"
					    }
					});
				}else{
					wx.showModal({
					    title: '小简打车提醒您！',
					    content: '请选择上车点',
					    success: function (res) {
					      if (res.confirm) {  
							
					      } else {   
					        console.log('点击取消回调')
					      }
					    }
					})
				}
				
				
			}
			
		},
		
	}
</script>

<style>
	.text{
		font-size: 1.4em; 
		text-align: center;
		margin: 0.8em;
	}
	.hr-view{
		width: 80%;
		height: 0.03em;
		margin: auto;
		background-color: #007947;
	}
	.since{
		text-align: center;
		margin: 0.8em;
	}
	.final{
		text-align: center;
		margin: 0.8em;
	}
	.icon{
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		margin-left: 85%;
		margin-top: 87%;
	}
	.icon-alarm{
		margin-top: 105%;
	}
	.icon image{
		width:70%;
		margin: 16%;
	}
</style>
