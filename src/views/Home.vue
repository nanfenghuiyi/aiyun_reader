<template>
  <div class="container">
    <div v-if="totalShow" class="container-title" @touchmove.prevent>
      当前没有数据，请到宗族页面添加
    </div>
    <div v-else class="swiper-page">
      第{{page}}页 共{{total}}页
    </div>
    <swiper :options="swiperOption" ref="mySwiper" :class="{'swiper-no-swiping':totalShow}">
      <swiper-slide></swiper-slide>
      <swiper-slide class="swiper-style" v-for="count in bookListNum" :key="count">
        <div class="section-swiper">
          <!-- <van-row justify="center" class="van-row" v-for="(item, i) of bookList" :key="i">
            <van-col class="van-col border-right" span="4" >
              <div class="border-bottem">世系</div>
              <div style="height:60px" class="border-bottem">{{item.generation}}</div>
              <div style="height:30px" class="border-bottem">兄妹 {{item.sibling_count}}人</div>
              <div style="height:30px" class="border-bottem">{{item.rank}}</div>
              <div style="height:30px" class="">个人简介</div>
            </van-col>
            <van-col class="van-col" span="8">
              <div class="border-bottem border-right">本人</div>
              <div class="border-right">
                <div class="van-adress border-bottem">
                  <div class="van-name">{{ item.self.name }}</div>
                  <div class="van-title border-right border-left border-width">
                    <div class="border-bottem">生</div>
                    <div>卒</div>
                  </div>
                  <div  class="van-time">
                    <div class="border-bottem">{{item.self.birthday!=''?item.self.birthday:'无'}}</div>
                    <div>1990-01-12</div>
                  </div>
                </div>
              </div>
              <div class="border-bottem border-right user-img">
                <img v-lazy="item.self.head_img!=null?item.self.head_img:'无'" alt="照片" />
              </div>
            </van-col>
            <van-col class="van-col" span="8">
              <div class="border-bottem border-right">配偶</div>
              <div class="border-bottem">
                <div class="van-adress border-right">
                  <div class="van-name">张三三</div>
                  <div class="van-title border-right border-left border-width">
                    <div class="border-bottem">生</div>
                    <div>卒</div>
                  </div>
                  <div class="van-time">
                    <div class="border-bottem">{{item.couple!=null?item.couple.birthday:'无'}}</div>
                    <div>无</div>
                  </div>
                </div>
              </div>
              <div class="border-bottem border-right user-img">
                <img v-lazy="item.couple!=null?item.self.head_img:'无'" alt="照片" />
              </div>
            </van-col>
            <van-col class="van-col" span="2">
              <div class="border-bottem border-right">父母</div>
              <div style="height:120px" class="border-bottem  border-right">
                <ul v-for="(parent, index) of item.parents" :key="index" v-if="item.parents!=null">
                  <li>{{parent.name}}</li>
                </ul>
              </div>
            </van-col>
            <van-col class="van-col" span="2">
              <div class="border-bottem">孩子</div>
              <div style="height:120px"  class="border-bottem">
                <ul v-for="(child, index) of item.children" :key="index" v-if="item.children!=null">
                  <li>{{child.name}}</li>
                </ul>
              </div>
            </van-col>
            <van-col class="van-col user-introduce" span="20">
              <div class="user-introduce-style">个人简介
              </div>
            </van-col>
          </van-row> -->
          <table
            border="1"
            v-for="(item, i) of bookList"
            :key="i">
            <tr>
              <th>世系</th>
              <th colspan="4">本人</th>
              <th colspan="4">配偶</th>
              <th>父母</th>
              <th>孩子</th>
            </tr>
            <tr>
              <td rowspan="4">{{item.generation}}</td>
              <td rowspan="2">{{ item.self.name }}</td>
              <td>生</td>
              <td colspan="2">{{item.self.birthday!=''?item.self.birthday:'无'}}</td>
              <td rowspan="2">{{item.couple!=null?item.couple.name:'无'}}</td>
              <td>生</td>
              <td colspan="2">{{item.couple!=null?item.couple.birthday:'无'}}</td>
              <td rowspan="6">
                <ul v-for="(parent, index) of item.parents" :key="index" v-if="item.parents!=null">
                  <li>{{parent.name}}</li>
                </ul>
              </td>
              <td rowspan="6" class="child-style">
                <ul v-for="(child, index) of item.children" :key="index" v-if="item.children!=null">
                  <li>{{child.name}}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>卒</td>
              <td colspan="2">{{item.s1}}</td>
              <td>卒</td>
              <td colspan="2">{{item.s2}}</td>
            </tr>
            <tr class="section-table-img">
              <td colspan="4" rowspan="4">
                <img v-lazy="item.self.head_img" alt="照片" />
              </td>
              <td colspan="4" rowspan="4">
                <img v-lazy="item.couple!=null?item.self.head_img:'无'" alt="照片" />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td>兄妹 {{item.sibling_count}}人</td>
            </tr>
            <tr>
              <td>{{item.rank}}</td>
            </tr>
            <tr>
              <td>本人简介</td>
              <td colspan="10" class="user-td-introduce">{{item.self.brief}}</td>
            </tr>
          </table>
        </div>
      </swiper-slide>
      <swiper-slide>
        <van-button class="btn" color="#EAC257" @click="goFirstPage">点击回到第 1 页</van-button>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

export default {
  data() {
    return {
      swiperOption: {
        autoplay: false, // 自动播放
        loop: false, // 循环播放
        on: {
          // 使用es6的箭头函数，使this指向vue对象
          transitionEnd: () => {
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.mySwiper.swiper;
            this.swiperindex = swiper.activeIndex;
            if (this.swiperindex>1) {
              if (this.page<this.total) {
                this.page++;
                // this.$store.commit('pageStorage',{page: this.page});
                this.loadMore(1);
                // this.$refs.mySwiper.swiper.slideTo(1, 1, true);
              }else {
                this.$toast('最后一页')
              }
            }else if(this.swiperindex==0){
              if (2<=this.page) {
                this.page--;
                // this.$store.commit('pageStorage',{page: this.page});
                this.loadMore(1);
                // this.$refs.mySwiper.swiper.slideTo(1, 1, true);
              }else {
                this.$refs.mySwiper.swiper.slideTo(1, 1, true);
                this.$toast('第一页');
                return
              }
            }
          },
        },
      },
      token: '',
      swiperindex: 0,
      bookListNum: 1, // 页数
      bookList: [],
      page: 1,
      total: 1,
      totalShow: false,
    };
  },
  methods: {
    // 数据获取
    loadMore(e) {
      JsInterface.showAndroidLoading();
      this.$refs.mySwiper.swiper.slideTo(1, 1, true);
      var url='/Web/book/page';
      if (e==1) {
        var page = this.page;
      }else {
        var page = 1;
        // this.$store.commit('pageStorage',{page: page});
        this.page = page;
      }
      // var obj={page: page, page_size: 3, token: 'fgex7T7PIXJ9bZxBPw1SMf65WbfUZC/L'}
      // var token = window.getUserId ? window.getUserId() :  window.JsInterface.getUserId();
      // if (window.getUserId != null && window.getUserId != undefined) {
      //   var token = window.getUserId();
      //   console.log('loadMore===进入后',token)
      // }
      var obj={page: page, page_size: 3, token: this.token}
      console.log(obj)
      this.axios.post(url,obj)
      .then(res=>{
        console.log('请求成功获取的结果====',res)
        var data = res.data;
        this.total = Math.ceil(data.data.total / 3);
        if (data.data.total>0) {
          this.totalShow = false;
        }else {
          this.totalShow = true
        }
        JsInterface.dismissAndroidLoading();
        this.bookList = data.data.records
      }).catch(err=>
        JsInterface.dismissAndroidLoading(),
        // console.log(err)
      )
    },
    // 返回第一页
    goFirstPage() {
      this.loadMore(2);
      this.$refs.mySwiper.swiper.slideTo(1, 1, true);
    },
    getToken() {
      console.log("JsInterface===",JsInterface)
      this.token = JsInterface.getToken();
      this.loadMore(1)
      console.log("getToken token = " + this.token);
    },
  },
  created() {
    // console.log(window.getUserId())
    // this.token = window.getUserId();
    // this.loadMore(1);
  },
  mounted() {
    // 初始化页面
    var u = navigator.userAgent;
    console.log('终端判断===',u)
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      this.getToken();
    }else if (isiOS) {
      this.token = window.getUserId();
      this.loadMore(1);
    }
    
  },
  beforeUpdate () {
    console.log('当前数据发生更改')
  }
};
</script>

<style scoped>
td {
  padding: 0;
}
.container {
  width: 100%;
  height: 100%;
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
  height: 90%;
  /* background: red; */
}
.swiper-style table {
  width: 100%;
  height: 30%;
}
/* .swiper-style th{
  width: 20px;
} */
.swiper-style td {
  width: 20px;
  height: 20px;
}
.swiper-page{
  padding: 3px 0 0 0;
}
.section-swiper {
  /* width: 360px; */
  margin: auto 5px;
}
.section-swiper > table {
  margin-top: 5px;
  table-layout: fixed;
}
.section-table-img > td > img {
  width: 60px;
  height: 60px;
}
.child-style{
  overflow-y: scroll;
}
.user-td-introduce{
  overflow-y: scroll;
}

/* 弹性布局 */
.van-row{
  height: 30%;
  border: 1px solid red;
  text-align: center;
  margin-top: 5px;
}
.van-col{
  height: 80%;
  box-sizing: border-box;
  background: #0ff;
}
.border-width{
  width: 20px;
}
.border-bottem{
  border-bottom: 1px solid red;  
  box-sizing: border-box;
}
.border-right{
  border-right: 1px solid red;  
  box-sizing: border-box;
}
.border-left{
  border-left: 1px solid red;  
  box-sizing: border-box;
}
.van-adress{
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.van-name,.van-time{
  flex: 1;
}
.van-title{
  flex: .5;
}
.user-img{
  height: 74px;
}
.user-img img{
  width: 100%;
  height: 100%;
}
.user-introduce{
  display: flex;
}
.user-introduce-style{
  width: 100%;
  height: 30px;
  overflow-y: auto;
}


.btn{
  margin-top: 80%;
}
.progress{
  width: 95%;
  border: 1px solid red;

}
</style>

<style>
.van-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>