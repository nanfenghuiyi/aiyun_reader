<template>
  <div class="container" v-loading="loading">
    <div v-if="totalShow" class="container-title" @touchmove.prevent>
      当前没有数据，请到宗族页面添加
    </div>
    <div v-else >
      <div class="menu" @click="menuPopup">
        搜索
      </div>
      <div>
      <div class="swiper-page">
        第{{page}}页 共{{total}}页
        <div>
          <input type="number" style="width:30px; text-align:center" v-model="pageValue">
          <button class="jump" @click="pageJump">跳转</button>
        </div>
      </div>
      </div>
    </div>
    <!-- 表格展示 -->
    <swiper :options="swiperOption" ref="mySwiper" :class="{'swiper-no-swiping':totalShow}">
      <swiper-slide></swiper-slide>
      <swiper-slide class="swiper-style">
        <div class="section-swiper" :style="{ height: scrollerHeight }">
          <el-row class="el-row" v-for="(item, i) of bookList" :key="i">
            <el-col :span="4"><div class="grid-content bg-purple user-text-left">{{ item.generation }}</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light user-text-left">{{ item.name }}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple user-text-left user-introduce">{{ item.brief }}</div></el-col>
          </el-row>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide-btn">
          <van-button class="btn" color="#EAC257" @click="goFirstPage">点击回到当前首页</van-button>
          <br>
          <van-button class="btn" color="#EAC257" @click="goInitialPage">点击回到初始页</van-button>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 目录 -->
    <div class="section-genealogy">
      <van-popup v-model="genealogyShow" position="left" :style="{ with: '100%', height: '100%'}">
        <div class="genealogy-search">
          <van-search
            v-model="searchValue"
            placeholder="请输入姓名"
            show-action
            shape="round"
            @input="onSearch(1)"
            @clear="onClear">
            <div slot="action" @click="onCancel(1)">取消</div>
          </van-search>
        </div>
        <!-- <van-button class="goback-btn" color="#EAC257" @click="goInitialPage">回到初始页</van-button> -->
        <div class="genealogy-section" :style="{ height: scrollerHeight }">
          <div class="goback-btn" @click="goInitialPage">回到初始页</div>
          <!-- <ul v-for="(item, index) of getGenealogyList" :key="index">
            <li @click="getGenealogy(item.depth, index)">
              {{item.title}}
            </li>
          </ul> -->
        </div>
        <!-- 搜索结果显示 -->
        <div v-show="searchShow" class="res-show" :style="{ height: scrollerHeight }">
          <ul v-infinite-scroll="onLoad" infinite-scroll-disabled="disabled" infinite-scroll-immediate="false" infinite-scroll-delay="10">
            <li :class="{'genealogyActive':genealogyChecked.indexOf(index)>-1}"
              v-for="(item, index) of searchList" :key="index" @click="getSearch(item.user_id, index)">
              {{item.name}}
              <!-- <span class="search-father">父亲 {{item.father_name}}</span> -->
            </li>
          </ul>
            <p v-if="resLoading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  data() {
    return {
      // scrollerHeight: '',
      swiperOption: {
        autoplay: false, // 自动播放
        loop: false, // 循环播放
        on: {
          // 使用es6的箭头函数，使this指向vue对象
          transitionEnd: () => {
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.mySwiper.swiper;
            if (swiper != null) {
              this.swiperindex = swiper.activeIndex;
              if (this.swiperindex>1) {
                if (this.page<this.total) {
                  this.page++;
                  this.loadMore(1);
                }else {
                  this.$toast('最后一页')
                }
              }else if(this.swiperindex==0){
                if (2<=this.page) {
                  this.page--;
                  this.loadMore(1);
                }else {
                  this.$refs.mySwiper.swiper.slideTo(1, 1, true);
                  this.$toast('第一页');
                  return
                }
              }
            }else {
              this.reload();
            }
          },
        },
      },
      token: '',
      depth: 0,
      user_id: '',
      swiperindex: 0,
      // bookListNum: 1, // 页数
      bookList: [],
      page: 1,
      total: 1,
      pageValue: '',
      totalShow: false, // 内容显示
      genealogyShow: false, // 目录显示 
      getGenealogyList: [], // 目录列表
      searchValue: '', // 搜索value
      searchShow: false , // 搜索结果显示
      searchList: [], // 搜索结果列表
      loadPage: 1, // 搜索的page
      genealogyChecked: [], // 点击后的状态
      disabled: false, // 滚动禁用
      loading: false, // 加载状态
      resLoading: true, // 加载中
      noMore: false, // 加载状态
    };
  },
  methods: {
    // 数据获取
    loadMore(e) {
      this.loading = true; // 加载状态
      if (this.$refs.mySwiper != null && this.$refs.mySwiper.swiper.slideTo != null) {
        this.$refs.mySwiper.swiper.slideTo(1, 1, true);
      }else {
        this.reload()
      }
      var url='/Web/book/memberLists';
      if (e==1) {
        console.log('数据获取===')
        var page = this.page;
      }else if(e==2){
        // console.log('返回当前首页===')
        var page = 1;
        this.page = page;
      }else {
        // console.log('返回初始状态===')
        var page = 1;
        this.page = page;
        this.depth = 0;
        this.user_id = '';
      }
      this.pageValue = page;
      var obj={page: page, page_size: 10, depth: this.depth, user_id: this.user_id, token: this.token}
      
      console.log('obj===',obj)
      this.axios.post(url,obj)
      .then(res=>{
        console.log('请求成功获取的结果====',res)
        var data = res.data;
        this.total = Math.ceil(data.data.total / 10);
        if (data.data.total>0) {
          this.totalShow = false;
        }else {
          this.totalShow = true;
        }
        this.bookList = data.data.records;
        this.loading = false;
      }).catch(err=>{
        console.log(err)
      })
    },
    // 返回当前首页
    goFirstPage() {
      this.loadMore(2);
      this.$refs.mySwiper.swiper.slideTo(1, 1, true);
    },
    // 返回初始页
    goInitialPage() {
      this.genealogyShow = false;
      this.loadMore(3);
      this.$refs.mySwiper.swiper.slideTo(1, 1, true);
    },
    // 安卓获取token
    getToken() {
      // console.log("JsInterface===",JsInterface)
      this.token = JsInterface.getToken();
      this.loadMore(1)
      console.log("getToken token = " + this.token);
    },
    // 获取目录
    menuGetGenealogy() {
      var url = '/Web/Book/contents';
      var obj = {token: this.token};
      
      this.axios.post(url, obj)
      .then(res=>{
        var data = res.data.data;
        this.getGenealogyList = data.records
      })
    },
    // 目录选中
    getGenealogy(depth, index) {
      this.depth = depth;
      this.page = 1;
      this.user_id = '';
      this.loadMore(1);
      this.genealogyShow = false;
    },
    // 目录显示
    menuPopup() {
      this.genealogyShow = true;
    },
    // 搜索
    onSearch(page) {
      this.searchShow = true;
      this.disabled = false;
      if (this.searchValue != '') {
        var url = '/web/Book/searchMember';
        var obj = {keyword:this.searchValue, page:page, page_size: 20, token: this.token};
        
        this.axios.post(url, obj)
        .then(res => {
          console.log('确定搜索时触发===',res);
          var data = res.data;
          console.log(data.data.records)
          if (data.data.records != [] && data.data.records.length !=0 ) {
            if (this.searchList.length < 20) {
              this.noMore = true;
              this.resLoading = false;
            }
            if (page>1) {
              this.searchList=this.searchList.concat(data.data.records)
            }else {
              this.searchList = data.data.records;
            }
          }else {// 阻止滚动事件
            // console.log('阻止滚动事件===')
            this.disabled = true;
            this.noMore = true;
            this.resLoading = false;
          }
        })
      }
    },
    // 取消搜索
    onCancel() {
      this.searchValue = '';
      this.searchShow = false;
      this.searchList = [];
      this.loadPage = 1;
      this.genealogyChecked = [];
    },
    // 清除按钮
    onClear() {
      this.searchShow = false;
      this.searchList = [];
      this.loadPage = 1;
      this.genealogyChecked = [];
    },
    // 搜索结果滚动
    onLoad () {
      var page=this.loadPage++;
      if (this.searchList.length>=20) {
        this.onSearch(page);
      }
    },
    //点击搜索结果
    getSearch(user_id, index) {
      this.user_id = user_id;
      this.page = 1;
      this.loadMore(1);
      this.genealogyShow = false;
      // 选择后的样式改变
      console.log('getSearch===',user_id)
      if(this.genealogyChecked.indexOf(index) == -1) {
        this.genealogyChecked.push(index); //实现第一种效果只需要这句代码  实现第二种效果就要加上外面的判断条件 
      }/* else {
        var spliceIndex = this.genealogyChecked.indexOf(index);
        this.genealogyChecked.splice(spliceIndex, 1);
      } */
    },
    // 跳转指定页数
    pageJump() {
      this.page = this.pageValue;
      if (this.page > this.total) {
        this.page = this.total;
      }
      console.log(this.page )
      this.loadMore(1)
    },
  },
  computed: {
    // 滚动区高度
    // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
    scrollerHeight: function() {
      console.log('scrollerHeight===',111)
      return (window.innerHeight - 44 - 60) + 'px';
    }
  },
  mounted() {
    // 获取当前窗口的高度
    console.log('获取当前窗口的高度==',window.innerHeight)
    console.log('获取当前窗口的80%高度==',window.innerHeight*0.8)
    // this.scrollerHeight = window.innerHeight;

    /* // 测试
    this.token = 'S7vfTo0N4AmST/9ygdxBAw=='
    this.loadMore(1);
    this.menuGetGenealogy();
     */
    // 初始化页面
    var u = navigator.userAgent;
    // console.log('终端判断===',u)
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      this.getToken();
      JsInterface.dismissAndroidLoading();
      this.menuGetGenealogy();
    }else if (isiOS) {
      this.token = window.getUserId();
      this.loadMore(1);
      this.menuGetGenealogy();
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  font-size: 8px;
}
.container-title{
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: rgba(252,251,231,1);
  font-size: 18px;
  padding-top: 60%;
}
.swiper-style {
  width: 375px;
  /* background: red; */
}
.swiper-style table {
  width: 100%;
}
.el-row{
  border-bottom: 1px solid #EAC257;
  padding: 5px 10px;
}
.user-text-left{
  text-align: left;
}
.user-introduce{
  font-size: 12px;
  margin-left: 10px;
}
.swiper-page{
  display: flex;
  font-size: 10px;
  border-bottom: 1px solid #EAC257;
  padding: 10px 0 5px 0;
  justify-content: center;
  align-items: center;
}
.swiper-page div{
  margin-left: 10px;
}
.jump{
  display: inline;
  margin-left: 6px;
}
.section-swiper {
  /* width: 360px; */
  font-size: 14px;
  overflow-y: scroll;
  margin: auto 5px;
}
.slide-btn{
  margin-top: 40%;
}
.btn{
  width: 50%;
  margin-bottom: 20px;
}
.goback-btn{
  color: #EAC257;
}
/* 目录 */
.genealogy-section {
  width: 250px;
  height: 350px;
  background: rgba(252,251,231,1);
  /* background: #0ff; */
  overflow: auto;
}
.genealogy-section li, .res-show li, .goback-btn{
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  /* background: #0ff; */
}
.menu{
  position:fixed;
  top: 30px;
  left: 15px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  font-size: 12px;
  background: #EAC257;
  z-index: 999;
}
/* 点击后的样式 */
.genealogyActive {
  color: #ccc;
}
/* 搜索框 */
.genealogy-search{
  width: 250px;
}
/* 搜索结果 */
.res-show{
  position: fixed;
  top: 90px;
  left: 0px;
  width: 250px;
  height: 350px;
  background: rgba(252,251,231,1);
  overflow-y: scroll; 
}
.search-father{
  font-size: 10px;
  color: #664237;
}
</style>
