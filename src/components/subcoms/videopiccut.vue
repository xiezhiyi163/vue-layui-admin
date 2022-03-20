<template>
    <div>
        <input id="videochooseinput" type="file" accept="*.mp4,*.ogg,*.m3u8" @change="getvideo"><br>

        <div style="position:relative;overflow:hidden;height:.1px;">
            <video v-if="videolocal!=''" id="videos" @canplay="load = 1" crossOrigin="anonymous" :src="videolocal" controls></video>
        </div>

        <img id="pics" style="width:500px;vertical-align:top">
        <button @click="getpic">点击截图</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            load:0,
            videolocal:''
        }
    },
    methods:{
        getvideo:function(){
            this.load = 0
            this.videolocal = URL.createObjectURL(document.getElementById('videochooseinput').files[0])
        },
        getpic:function(){
            var id = 'videos'
            var player = document.getElementById(id);   //获取video的Dom节点
            // player.oncanplay = () => {
            if(this.load == 1) {
                setTimeout(()=>{
                    var canvas = document.createElement("canvas");
                    var img = document.getElementById('pics');
                    canvas.width = player.videoWidth;
                    canvas.height = player.videoHeight;
                    canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);//截
                    var dataURL = canvas.toDataURL("image/png");  //将图片转成base64格式
                    img.src = dataURL;
                },1000)
            }
            // }
        }
    },
}
</script>

<style scoped>
    video {
        visibility: hidden;
        width: 500px;
        height: 300px;
    }
</style>