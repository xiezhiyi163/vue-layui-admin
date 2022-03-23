<template>
  <div class="searchbox">
    <div class="searchwrap" :class="{ searchwrapbg: searchflag == 1 }">
      <div class="searchwrapin">
        <!-- 输入框区域 -->
        <div class="searchwrap_base">
          <div class="selectwrap">
            <div class="selectwrapin selectwrap-back" @click="changesearch"><i></i>{{'←'}}</div>
            <div class="selectwrapin" @click="ifurl = !ifurl" :class="ifurl?'selectwrap-active':''">{{'</>'}}</div>
          </div>
          <!-- 输入框或者文件选择 -->
          <input
            v-if="ifurl"
            placeholder="- 输入识图的网址 -"
            v-model="searchvalues"
            type="text"
            @focus="searchflag = 1"
            @blur="searchflag = 0"
            autocomplete="off"
          />
          <div v-else class="fileupload" @click="tochoosefile">
            选择文件
            <input
              id="fileupload"
              type="file"
              @focus="searchflag = 1"
              @blur="searchflag = 0"
              autocomplete="off"
              style="visibility: hidden;"
              @change="getfiletodo"
            />
          </div>
        </div>
        <!-- 按钮区域 -->
        <div class="searchwrap_btn"><i></i>搜搜一下</div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  @地址或者图片发射出去,接收loading打开,请求完,接收loading关闭
*/
export default {
  data() {
    return {
      ifurl:1,
      searchflag: 0,
      searchvalues: '',
      searchfiles:[]
    };
  },
  methods:{
    changesearch:function(){
      this.$emit('changesearchtype',0)
    },
    tochoosefile:function(){
      document.getElementById('fileupload').click()
    },
    getfiletodo:function(){
      this.searchfiles = [...document.getElementById('fileupload').files]
      document.getElementById('fileupload').value = ''
    }
  }
};
</script>

<style scoped>
.searchbox {
  position: relative;
  padding-top: 30px;
  user-select: none;
}
.searchwrap {
  margin: 0 auto;
  width: 90%;
  min-width: 300px;
  max-width: 600px;
  height: 46px;
  background-color: #ccc;
  border-radius: 10px;
}
.searchwrapbg {
  background-color: brown;
}
.searchwrapin {
  position: relative;
  padding-top: 3px;
  margin-right: 117px;
}
.searchwrap_base {
  position: relative;
  margin: 0 0px 3px 3px;
  padding: 0 13px 0 100px;
  height: 40px;
  background-color: white;
  border-radius: 6px 0 0 6px;
  overflow: hidden;
}
.selectwrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100%;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.selectwrapin {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  line-height: 20px;
  font-size: 12px;
  vertical-align: middle;
  color: #ccc;
}
.selectwrap-active,
.selectwrap:hover .selectwrapin {
  color: brown;
  border-color: brown;
}
.selectwrap-active:hover {
  color: #ccc !important;
  border-color: #ccc !important;
}
.selectwrap-back {
  position: relative;
  margin-right: 30px;
  color: #ccc !important;
  border-color: #ccc !important;
}
.selectwrap-back i {
  position: absolute;
  right: -15px;
  top: 0;
  height: 18px;
  border-right: 1px solid #ccc;
}
.searchwrap_base input {
  padding: 12px 0;
  width: 100%;
  font-size: 14px;
}
.fileupload {
  padding: 10px 0;
  width: 60px;
  height:20px;
  box-sizing: content-box;
  font-size: 14px;
  cursor: pointer;
}
.searchwrap_btn {
  position: absolute;
  top: 0;
  right: -120px;
  width: 120px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  color: white;
  cursor: pointer;
  background-color: brown;
  border-radius: 0 10px 10px 0;
}
.searchwrap_btn i {
  position: absolute;
  left: -3px;
  top: 0;
  width: 3px;
  height: 100%;
  background-color: brown;
}
</style>
