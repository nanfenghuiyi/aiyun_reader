<template>
  <div class="container">
    <van-tabs v-model="active" type="card" sticky>
      <van-tab title="文案式">
        <Copywriting></Copywriting>
      </van-tab>
      <van-tab title="表格式">
        <TableFormat></TableFormat>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TableFormat from "../common/TableFormat";
import Copywriting from "../common/Copywriting";

export default {
  data () {
    return {
      active: 0
    }
  },
  components: {TableFormat,Copywriting},
  props: {},
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style scoped>
.container{}

</style>

<style>
.van-tabs__nav--card{
  border: none;
  margin: 0;
}
.van-tabs__nav--card .van-tab{
  color: #664237;
}
.van-tabs__nav--card .van-tab.van-tab--active{
  color: #664237;
  background: #F8E3AB;
}
.van-tabs__nav--card .van-tab{
  border-right: none;
}
</style>