<template>
	<view>
		<view>{{num}}</view>
		<view>{{num2}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:15537695997,
				num2:""
			}
		},
		onLoad() {
			
			var string="15537695997"
			var stringlength = string.length
			var newstring= string.substring(stringlength-4, stringlength);
			this.num2=newstring
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
