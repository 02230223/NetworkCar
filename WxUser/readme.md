# 使用
下载下来直接引入，然后使用。也可以直接复制下面的源码内容。无任何依赖。

`type`可以控制是 中间划线(middle) 下划线(bottom) 方宽(box) 样式。

## refs

`<one-input ref="one" type="box" @finish="finished"></one-input>`

## v-model

`<one-input v-model="test" @finish="finished"></one-input>`

## 都不需要

`<one-input @finish="finished"></one-input>`

# 示例

```
<template>
	<view>
		<view style="height: 100rpx;"></view>
		<one-input v-model="test" @finish="finishedOne"></one-input>
		<view style="height: 100rpx;"></view>
		<button @tap="toClear">清空</button>
		<view style="height: 100rpx;"></view>
		<one-input ref="hi" type="box"></one-input>
	</view>
</template>

<script>
	import oneInput from '@/components/one.vue'
	
	export default {
		components: {
			oneInput
		},
		data() {
			return {
				test: '48'
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.$refs.hi.set('831')
			})
		},
		methods: {
			finishedOne(val) {
				console.log(val)
			},
			toClear() {
				this.test = ''
				this.$refs.hi.clear()
			}
		}
	}
</script>

<style>
</style>
```

# `mypUI`

全新的 `nvue-uniapp` 组件，一套组件支持编译到 `mp/h5/app`。

## 特点：

- `nvue`页面组件，一套页面适合全端，且`app`端对应为`weex`原生，对于`app`端性能提升很大；
- 开放主题配置，通过`scss`变量配置主题，默认配置5套主题，支持无限套主题；
- 基于效率与细节定制双重考虑，支持快速使用与细节定制；
- 不仅仅只是一套UI组件，还有更多关于uniapp的注意细节，使用示范；
- 代码规范，注重代码质量与开发效率。

## 包含内容

- 常用组件：button/cell/icon/grid/input/item/radio/check/group/tag/notify/over/loading/popup/toast/navbar/tabbar/tabs/refresh/loading/divider/picker...UI组件上该有的都有;
- 能够在大项目中直接使用的request请求库；
- 打开与关闭动画都良好的popup/modal/actionsheet等，且在app端优化。百分比支持关闭动画，不只是打开动画；
- 快速从icons的css文件中提取icon的Python脚本；
- Vue/uni-app整套的教程，包含基础和进阶，高级，不需要再次花时间和金钱来徘徊（事件机制/通信/vuex/router/nextTrick/refs/mixin/provide/inject/...）；
- 下拉刷新/上提加载，封装良好，scroll全平台支持，而且app支持weex中的list；
- 自定义的tabbar（非swiper方式实现）以及navbar，支持popup全屏；
- ...

