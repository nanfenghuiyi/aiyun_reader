<template>
  <div class="container">
    <swiper :options="swiperOption" ref="mySwiper" @click="changeMenu">
      <swiper-slide class="swiper-style" v-for="count in tListNum" :key="count">
        <div class="section-swiper">
          <table
            border="1"
            v-for="(item, i) of testList[index].slice(testListStart, testListEnd)"
            :key="i"
          >
            <tr style="height: 20px">
              <th>世系</th>
              <th colspan="4">本人</th>
              <th colspan="4">配偶</th>
              <th>父母</th>
              <th>孩子</th>
            </tr>
            <tr>
              <td rowspan="4" style="height:60px">{{item.sx}}</td>
              <td rowspan="2">{{item.name}}</td>
              <td>生</td>
              <td colspan="2">{{item.b1}}</td>
              <td rowspan="2">{{item.uname}}</td>
              <td>生</td>
              <td colspan="2">{{item.b2}}</td>
              <td rowspan="6">{{item.fname}}</td>
              <td rowspan="6">{{item.cname}}</td>
            </tr>
            <tr>
              <td>卒</td>
              <td colspan="2">{{item.s1}}</td>
              <td>卒</td>
              <td colspan="2">{{item.s2}}</td>
            </tr>
            <tr class="section-table-img">
              <td colspan="4" rowspan="4">
                <img v-lazy="item.src1" alt="照片" />
              </td>
              <td colspan="4" rowspan="4">
                <img v-lazy="item.src2" alt="照片" />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td style="height: 20px">兄妹 1人</td>
            </tr>
            <tr>
              <td style="height: 20px">排行 1人</td>
            </tr>
            <tr>
              <td style="height: 40px">本人简介</td>
              <td colspan="10">{{item.introduction}}</td>
            </tr>
          </table>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 菜单 -->
    <div class="section-menu">
      <van-popup v-model="menuShow" position="bottom" :style="{ height: '20%' }">
        <div class="section-menu-check">
          <div @click="genealogyPrev">上一页</div>
          <div class="section-menu-slider">
            <van-slider v-model="sliderValue" disabled active-color="#ee0a24">
              <div slot="button" class="custom-button">{{ sliderValue }}</div>
            </van-slider>
          </div>
          <div @click="genealogyNext">下一页</div>
        </div>
        <div @click="GenealogyList">
          <p>
            <i class="icon iconfont icon-caidan"></i>
          </p>目录
        </div>
      </van-popup>
    </div>
    <!-- 目录 -->
    <div class="section-genealogy">
      <van-popup v-model="genealogyShow" position="left" :style="{ with: '100%', height: '100%'}">
        <div class="genealogy-header" @click="goBack">
          <i class="el-icon-arrow-left"></i>
          <p>目 录</p>
        </div>
        <ul class="genealogy-section">
          <li
            :class="{genealogyActive:genealogyChecked==index}"
            v-for="(item, index) of testList.length"
            :key="index"
            @click="genealogyCheck(index)"
          >{{item}}</li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
          type : 'progressbar',
        }, // 分页器
        autoplay: false, // 自动播放
        loop: false, // 循环播放
        on: {
          // 使用es6的箭头函数，使this指向vue对象
          transitionEnd: () => {
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.mySwiper.swiper;
            // console.log(swiper)
            this.swiperindex = swiper.activeIndex;
            // console.log(this.swiperindex);
            // location.href = flag.url;
            if (this.swiperindex > 0) {
              this.testListStart = this.swiperindex * 3;
              this.testListEnd = this.swiperindex * 3 + 3;
            } else {
              this.testListStart = 0;
              this.testListEnd = 3;
            };
            // console.log(this.testListStart, "+", this.testListEnd);
          }
        }
      },

      tListNum: 1, // 测试页数
      testListStart: 0, // 测试开始页
      testListEnd: 3, // 测试结束页
      index: 0, // 测试章节
      testList: [
        [
          {
            sx: "一世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "一世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "一世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "二世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "二世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "二世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "三世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          }
        ],
        [
          {
            sx: "1 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "1 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "1 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "2 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "2 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "2 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "3 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          },
          {
            sx: "3 世",
            name: "张三",
            b1: "1978.10.10",
            s1: "2017.12.2",
            src1:
              "http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg",
            uname: "李四",
            b2: "1978.10.10",
            s2: "2017.12.2",
            src2:
              "http://b-ssl.duitang.com/uploads/blog/201401/07/20140107171234_3W2RC.jpeg",
            fname: "张钱",
            cname: "李馨",
            introduction: "南高架上的oil叫哦我"
          }
        ]
      ],

      menuShow: false, // 菜单显示
      sliderValue: 0, // 进度条
      genealogyShow: false, // 目录显示
      genealogyChecked: 0, // 列表选中
      genealogyList: [
        "家谱序言",
        "姓氏来源",
        "家规家训",
        "家族照",
        "世系表",
        "世系表",
        "世系表"
      ] // 目录列表
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    // 菜单
    changeMenu() {
      this.menuShow = true;
    },
    // 目录选择
    GenealogyList() {
      this.menuShow = false;
      // console.log("目录详情");
      this.genealogyShow = true;
    },
    // 切换
    genealogyPrev() {
      if (this.index > 0) {
        this.index -= 1;
        this.genealogyChecked = this.index;
        this.$refs.mySwiper.swiper.slideTo(0, 1, true); // 返回第一张
        this.sliderValue=((this.genealogyChecked+1)/this.testList.length).toFixed(2)*100
        // console.log(this.sliderValue)
      }
      if (this.index == 0) {
        this.$toast("这是首页");
      }
    },
    genealogyNext() {
      if (this.index < this.testList.length) {
        this.index += 1;
        this.genealogyChecked = this.index;
        this.$refs.mySwiper.swiper.slideTo(0, 1, true);
        this.sliderValue=Math.floor(((this.genealogyChecked+1)/this.testList.length))*100
      }
      if (this.index == this.testList.length) {
        this.index -= 1;
        this.$toast("没有更多了");
        this.genealogyChecked = this.index;
      }
      return;
    },
    // 返回
    goBack() {
      this.genealogyShow = false;
    },
    // 目录选择
    genealogyCheck(index) {
      this.genealogyChecked = index;
      this.genealogyShow = false;
      // console.log("选中的列表是", index);
      this.index = index;
      this.sliderValue=((this.genealogyChecked+1)/this.testList.length).toFixed(2)*100
    }
    // 数据获取
    /* loadMore() {
      var url='';
      console.log(url)
      this.axios.get(url,{})
      .then(res=>{
        console.log(res)
      })
    } */
  },
  created() {
    // this.loadMore();
    // console.log(this.genealogyChecked);
    let tList = this.testList[this.index];
    this.tListNum = Math.ceil(tList.length / 3);
    this.sliderValue = this.index;
    this.sliderValue=((this.genealogyChecked+1)/(this.testList.length))*100
  },
  mounted() {}
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
.swiper-style {
  width: 375px;
  height: 667px;
}
.swiper-style table {
  width: 100%;
}
.swiper-style td {
  width: 20px;
  height: 20px;
}
.section-swiper {
  width: 360px;
  margin: 0 auto;
}
.section-swiper > table {
  margin-top: 15px;
  table-layout: fixed;
}
.section-table-img > td > img {
  width: 100px;
}
/* 菜单 */
.section-menu .section-menu-check {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section-menu-slider {
  width: 200px;
  padding-right: 25px;
  padding-left: 25px;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
/* 目录 */
.genealogy-header {
  width: 375px;
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 18px;
  background: #eee;
  display: flex;
  align-items: center;
}
.el-icon-arrow-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.genealogy-header > p {
  flex: 1;
  text-align: center;
}
.genealogy-section {
  width: 375px;
  height: 627px;
  overflow: auto;
}
.genealogy-section li {
  height: 25px;
  line-height: 25px;
  /* background: #0ff; */
}
.genealogyActive {
  color: #fff;
  background: #e4c139;
}
</style>

<style>
.van-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
/* 分页器位置 */
.swiper-container-horizontal > .swiper-pagination-progressbar, .swiper-container-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{
  top: 663px !important;
}
</style>