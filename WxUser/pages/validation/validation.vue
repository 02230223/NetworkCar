<template>
    <view>
		<view style="font-size: 1.6em;font-weight: 500;font-style:normal;width: 80%;margin: auto;margin-top: 6%;">
			输入短信验证码
		</view>
		<view style="font-size: 0.9em;color: #C0C0C0;width: 80%;margin: auto;margin-top: 3%;">
			验证码已发送至{{before}}****{{after}},请在下方输入框内输入四位数字验证码
		</view>
        <view style="height: 100rpx;"></view>
        <one-input v-model="test" @finish="finishedOne"></one-input>
		<view style="text-align: center;margin-top: 3%;font-size: 0.6em;">
			{{num}}秒后重新发送
		</view>
		<view style="text-align: center;margin-top: 3%;font-size: 0.6em;color: #DD524D;">
			{{chongxin}}
		</view>
    </view>
</template>

<script>
    import oneInput from '@/components/myp-one/myp-one.vue'

    export default {
        components: {
            oneInput
        },
        data() {
            return {
                test: '',
				before:uni.getStorageSync("tel").substring(0,3),
				after:uni.getStorageSync("tel").substring(11-4,11),
				num:60,
				timer:null,
				chongxin:""
            }
        },
        onLoad() {
			this.timer=setInterval(()=>{
				this.num=this.num-1
				if(this.num==0){
					if(this.timer){
						clearTimeout(this.timer);
						this.timer=null;
						this.num="";
						this.chongxin="重新发送"
						
					}
				}
			},1000)
        },
        methods: {
            finishedOne(val) {
                if(val=uni.getStorageSync("radom")){
					console.log("验证成功")
					wx.showToast({
						title:'验证成功！',
						icon:'success',
						duration:1500
					}),
					uni.reLaunch({
						url:"../index/index"
					})
				}
            }
        }
    }
</script>

<style>
</style>