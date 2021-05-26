<template>
	<view>
		<view class="page-section">
		    <view class="view-body">
				<view class="page-section-title">您为什么取消？</view>
				<view class="page-section-title2">请告知我们，我们可以改善</view>
			</view>
		    <view class="weui-cells">
		      <radio-group class="view-radio" bindchange="radioChange">
		        <label class="weui-cell" :wx:for="items" :wx:key="item.value">
		
		          <view class="weui-cell__hd" style="width: 20%;">
		            <radio :value="item.value" class="radio" checked="true"/>
		          </view>
		          <view class="weui-cell__bd" style="width: 80%;">{{item.name}}</view>
		        </label>
		      </radio-group>
		    </view>
		  </view>
		  <view class="btn-cancel-ok" @click="cancelOk">
			  <button style="background-color: #F0AD4E;" type="default">提交</button>
		  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				items:[
					{value:'1',name:"行程有变，暂时不需要用车"},
					{value:'1',name:"赶时间，换用其它交通工具"},
					{value:'1',name:"平台派单太远"},
					{value:'1',name:"司机以各种理由不来接我"},
					{value:'1',name:"联系不上司机"},
					{value:'1',name:"我找不到终点"},
				]
			}
		},
		methods:{
			cancelOk(){
				
				wx.showToast({
				  title: '操作成功！',   // 标题
				  icon: 'success',      // 图标类型，默认success
				  duration: 1500        ,// 提示窗停留时间，默认1500ms
				  
				}, 
				 
				/* uniCloud.callFunction({
					name:"userdel",
					data:{
						"name":uni.getStorageSync("userWxName")
					}
				}), */
				wx.redirectTo({ 
					url:"../index/index"
				})
				)
				
			}
		},
		radioChange(e) {
		    console.log('radio发生change事件，携带value值为：', e.detail.value)
		
		    const items = this.data.items
		    for (let i = 0, len = items.length; i < len; ++i) {
		      items[i].checked = items[i].value === e.detail.value
		    }
		
		    this.setData({
		      items
		    })
		  }
	}
</script>

<style>
	page{
		background-color: #F1F1F1;
	}
	.view-body{
		width: 100%;
		height: 200rpx;
		text-align: center;
		background-color: #FFFFFF;
	}
	.page-section-title{
		line-height: 100rpx;
	}
	.page-section-title2{
		color: #F0AD4E;
	}
	.weui-cells{
		width: 100%;
	}
	.view-radio{
		width: 100%;
		
	}
	.weui-cell{
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		background-color: #FFFFFF;
		border: 1px solid #EBEAEA;
	}
	.btn-cancel-ok{
		margin-top: 20%;
	}
</style>
