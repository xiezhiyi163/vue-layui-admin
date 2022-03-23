<template>
  <div class="searchbox">
    <div class="searchwrap" :class="{ searchwrapbg: searchlistflag == 1 }">
      <div class="searchwrapin">
        <!-- 输入框区域 -->
        <div class="searchwrap_base">
          <input
            placeholder=" - 输入关键词进行搜索 - "
            v-model="searchvalues"
            @focus="searchlistflag = 1"
            @blur="closelistflag"
            type="text"
            autocomplete="off"
            @input="testifobj"
          />
          <div class="topic" @click="changesearch">搜图</div>
        </div>
        <!-- 按钮区域 -->
        <div class="searchwrap_btn" @click="tosearch"><i></i>搜搜一下</div>
        <!-- 搜索历史和模糊搜索展示区域 -->
        <div class="searchwrap_list" v-if="searchlistflag == 1">
          <i></i>
          <div class="searchwrap_listdiv">
            <div class="listbox">
              <div class="listitems">
                <!-- 展示历史搜索 -->
                <div v-if="searchvalues == ''">
                  <div v-if="searchhistorylist.length != 0">
                    <div v-for="(v, i) in searchhistorylist">
                      <div @click="searchvalues = v" class="listitem" v-if="i < 9">
                        {{ v }}
                        <div @click.stop="delitem(i)" class="listitemdiv">删除</div>
                      </div>
                    </div>
                  </div>
                  <div v-if="searchhistorylist.length == 0" class="nothingitem">
                    没有更多历史记录
                  </div>
                </div>
                <!-- 展示模糊搜索 -->
                <div v-else-if="searchvalues != ''">
                  <div v-for="(v, i) in newsearchlist">
                    <div @click="searchvalues = v" class="listitem" v-if="i < 9">
                      {{ v }}
                    </div>
                  </div>
                  <div v-if="newsearchlist.length == 0" class="nothingitem">
                    没有更多记录或结果
                  </div>
                </div>
              </div>
              <div class="listbtn">
                <div class="listbtn_close" @click="closelist">关闭列表</div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    searchlist:{
      type:null,
      default:[]
    },
    requestlist:{
      type:null,
      default:[]
    },
    mode:{
      type:null,
      default:'local'
    },
    keys:{
      type:null,
      default:'null'
    },
    subkey:{
      type:null,
      default:'null'
    }
  },
  data() {
    return {
      searchvalues: '',
      searchhistorylist: [],
      newsearchlist:[],
      searchlistflag: 0,
    };
  },
  methods: {
    changesearch:function(){
      this.$emit('changesearchtype',1)
    },
    testifobj:function() {
      this.newsearchlist = []
      //线上拿数据，直接赋值
      if(this.mode != 'local'){
        this.$emit('requestSearchValue',this.searchvalues)
        if(this.requestlist.constructor.toString().indexOf('Array') != -1) {
          this.newsearchlist = this.requestlist
        }
        return
      }
      //本地数据，处理赋值
      if(typeof this.searchlist[0] == 'object'&&this.searchlist.constructor.toString().indexOf('Array') != -1&&this.searchlist[0][this.keys]){
        var arr = []
				function fns(list,key,subkey){
					list.map(item=>{arr.push(item[key]);if(item[subkey]){fns(item[subkey],key,subkey)}})
				}
				fns(this.searchlist,this.keys,this.subkey)
        this._testifobj(arr)
      }else{
        this._testifobj(this.searchlist)
      }
    },
    _testifobj:function(arrs) {
      for(var i=0;i<arrs.length;i++){
        var m = 0
        for(var k=0;k<this.searchvalues.toString().length;k++){
          if(arrs[i].toString().indexOf(this.searchvalues[k])!=-1){
            m = 1
          }
        }
        if(m == 1) {
          this.newsearchlist.push(arrs[i])
        }
      }
    },
    //
    closelistflag: function () {
      setTimeout(() => {
        this.searchlistflag = 0;
      }, 100);
    },
    delitem: function (i) {
      this.searchhistorylist.splice(i, 1);
      window.localStorage.setItem('searchhis', JSON.stringify(this.searchhistorylist));
      if (this.searchhistorylist.length == 0) {
        window.localStorage.removeItem('searchhis');
      }
    },
    closelist: function () {
      this.searchlistflag = 0;
    },
    tosearch: function () {
      if (window.localStorage.getItem('searchhis')) {
        var arr = JSON.parse(window.localStorage.getItem('searchhis'));
        if (arr.indexOf(this.searchvalues) == -1) {
          arr.push(this.searchvalues);
          window.localStorage.setItem('searchhis', JSON.stringify(arr));
          this.searchhistorylist.push(this.searchvalues);
        }
      } else {
        window.localStorage.setItem(
          'searchhis',
          JSON.stringify([this.searchvalues])
        );
        if (this.searchhistorylist.indexOf(this.searchvalues) == -1) {
          this.searchhistorylist.push(this.searchvalues);
        }
      }
      this.$emit('search', this.searchvalues);
    },
  },
  mounted() {
    if (window.localStorage.getItem('searchhis')) {
      this.searchhistorylist = JSON.parse(window.localStorage.getItem('searchhis'));
    }
  },
};
</script>

<style scoped>
.searchbox {
  position: relative;
  padding-top: 30px;
  z-index: 2;
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
  padding: 0 73px 0 10px;
  height: 40px;
  background-color: white;
  border-radius: 6px 0 0 6px;
  overflow: hidden;
}
.searchwrap_base input {
  padding: 12px 0;
  width: 100%;
  font-size: 14px;
}
.topic {
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #aaa;
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
  z-index: 2;
}
.searchwrap_btn i {
  position: absolute;
  left: -3px;
  top: 0;
  width: 3px;
  height: 100%;
  background-color: brown;
}
.searchwrap_list {
  position: absolute;
  left: 0;
  top: 35px;
  width: 100%;
  background-color: white;
}
.searchwrap_list i {
  position: absolute;
  left: 0;
  top: -3px;
  height: 10px;
  width: 3px;
  background-color: brown;
}
.searchwrap_listdiv {
  border-radius: 0 0 10px 10px;
  border: 3px solid brown;
  border-top: 0.001px solid transparent;
}
.listbox {
  margin: 10px;
  border-top: 1px solid #eee;
}
.listitems {
  padding: 10px 0px 10px 0;
  min-height: 60px;
}
.listitem {
  position: relative;
  padding: 0 50px 3px 0;
  min-height: 31px;
  line-height: 31px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  cursor: pointer;
}
.listitemdiv {
  display: none;
  position: absolute;
  right: 0;
  top: 0px;
  padding-left: 10px;
  line-height: 31px;
  font-size: 16px;
  color: #ccc;
  background-color: white;
}
.nothingitem {
  padding: 20px 20px 30px;
  text-align: center;
  color: #ccc;
}
.listbtn {
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.listbtn_close {
  float: right;
  color: #ccc;
  cursor: pointer;
}
.listitem:hover .listitemdiv {
  display: block;
}
.listitem div:hover,
.listbtn_close:hover {
  color: skyblue !important;
}
</style>
