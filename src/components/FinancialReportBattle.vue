<template>
  <div>
    <div class="search-card">
      <el-row>
        <el-col :span="3">
          <el-select v-model="stockLeft" placeholder="股票1">
            <el-option
                v-for="item in stockList"
                :key="item.value"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <div style="color: black;font-size: large;text-align: center; line-height: 40px">
            VS
          </div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="stockRight" placeholder="股票2">
            <el-option
                v-for="item in stockList"
                :key="item.value"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-button>Battle</el-button>
        </el-col>

        <el-col :span="13" style="padding: 0">
          <div id="battle-result-chart">
            <div class="stock-compare-blood left-stock-compare-blood">
              40分
            </div>
            <div class="stock-compare-blood right-stock-compare-blood">
              60分
            </div>
          </div>
        </el-col>
      </el-row>
    </div>


    <el-divider></el-divider>

    <el-row>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="roe-cmp-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="eps-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="debt-ratio-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="gross-margin-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="kf-net-profit-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="total-operating-income-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "FinancialReportBattle",
  data() {
    return {
      stock1: "沪电股份",
      stock2: "深南电路",
      stockLeft: "",
      stockRight: "",
      stockList: [{name: "沪电股份", code: "abc"}, {name: "深南电路", code: "bcd"}],
      dateList: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年'],
      roeList1: [5, 10, 20, 30, 40, 50],
      roeList2: [5, 20, 30, 40, 10, 40],
    }
  },
  mounted() {
    this.$echarts.init(document.getElementById('roe-cmp-chart')).setOption(this.generateOption('净资产收益率'));
    this.$echarts.init(document.getElementById('debt-ratio-chart')).setOption(this.generateOption('负债率'));
    this.$echarts.init(document.getElementById('eps-chart')).setOption(this.generateOption('每股收益'));
    this.$echarts.init(document.getElementById('gross-margin-chart')).setOption(this.generateOption('毛利率'));
    this.$echarts.init(document.getElementById('kf-net-profit-chart')).setOption(this.generateOption('扣非净利润'));
    this.$echarts.init(document.getElementById('total-operating-income-chart')).setOption(this.generateOption('营业总收入'));
  },
  methods: {
    generateOption(chartName) {
      // 指定图表的配置项和数据
      return {
        title: {
          text: chartName,
          top: 20
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
          }
        },
        legend: {
          data: [this.stock1, this.stock2]
        },
        color: ['#4359b9', '#81c462'],
        xAxis: {
          type: 'category',
          data: this.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.stock1,
            data: this.roeList1,
            type: 'bar',
          },
          {
            name: this.stock2,
            data: this.roeList2,
            type: 'bar',
          },
        ]
      };
    }
  }
}
</script>

<style scoped>
.search-card {
  margin: 20px auto 0 auto;
  width: 80%;
  height: 40px;
}

.stock-compare-blood {
  width: 40%;
  height: 40px;
  color: white;
  display: inline-block;
  text-align: center;
  line-height: 40px
}

.left-stock-compare-blood {
  width: 40%;
  background: green;
  -webkit-border-top-left-radius: 50px;
  -webkit-border-bottom-left-radius: 50px;
}

.right-stock-compare-blood {
  width: 60%;
  background: #CC3300;
  -webkit-border-top-right-radius: 50px;
  -webkit-border-bottom-right-radius: 50px;
}
</style>
