<template>
	<div>
		<textarea id="textareas" rows="" cols=""></textarea>
	</div>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	var winh = '';
	var editor = ''
	onMounted(()=>{
		winh = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
		editor = CodeMirror.fromTextArea(document.getElementById('textareas'), {
			lineNumbers: true,
			lineWrapping: true,
			height:'700px'
		});
		editor.setSize('auto',winh.value - 160 + 'px');
		window.addEventListener('resize',function(){
			winh = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
			editor.setSize('auto',winh.value - 160 + 'px');
		})
	})
	// //这个函数是用来测试运行的，先不用管
	// function gettotest() {
	// 	eval(editor.getValue())
	// }
</script>

<style>
</style>
