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
          <el-button @click="handleBattle">Battle</el-button>
        </el-col>

        <el-col :span="10" style="padding: 0">
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
      stockList: [{name: "沪电股份", code: "sz002463"}, {name: "深南电路", code: "sz002916"}],
      dateList: ['12年', '13年', '14年', '15年', '16年', '17年', '18年', '19年'],
      stockData: [],
      roe1: [],
      roe2: [],
      eps1: [],
      eps2: [],
      totalOperatingIncome1: [],
      totalOperatingIncome2: [],
      deductionOfNonNetProfit1: [],
      deductionOfNonNetProfit2: [],
      grossProfit1: [],
      grossProfit2: [],
      assetLiabilityRatio1: [],
      assetLiabilityRatio2: [],
      roeList1: [5, 10, 20, 30, 40, 50],
      roeList2: [5, 20, 30, 40, 10, 40],
    }
  },
  mounted() {
  },
  methods: {
    generateOption(chartName, data1, data2) {
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
            data: data1,
            type: 'bar',
          },
          {
            name: this.stock2,
            data: data2,
            type: 'bar',
          },
        ]
      };
    },
    handleBattle() {
      this.$http({
        method: 'get',
        url: 'http://localhost:7010/fr?stocks=' + this.stockLeft + ',' + this.stockRight
      }).then(res => {
        console.log(res)
        const frData = res.data

        this.roe1 = []
        this.eps1 = []
        this.grossProfit1 = []
        this.assetLiabilityRatio1 = []
        this.deductionOfNonNetProfit1 = []
        this.totalOperatingIncome1 = []
        let stockLeftFrDataList = frData[this.stockLeft]
        for (let item of stockLeftFrDataList) {
          this.roe1.push(item.roe)
          this.eps1.push(item.eps)
          this.grossProfit1.push(item.gross_profit)
          this.assetLiabilityRatio1.push(item.asset_liability_ratio)
          this.deductionOfNonNetProfit1.push(item.deduction_of_non_net_profit)
          this.totalOperatingIncome1.push(item.total_operating_income)
        }

        this.roe2 = []
        this.eps2 = []
        this.grossProfit2 = []
        this.assetLiabilityRatio2 = []
        this.deductionOfNonNetProfit2 = []
        this.totalOperatingIncome2 = []
        stockLeftFrDataList = frData[this.stockRight]
        for (let item of stockLeftFrDataList) {
          this.roe2.push(item.roe)
          this.eps2.push(item.eps)
          this.grossProfit2.push(item.gross_profit)
          this.assetLiabilityRatio2.push(item.asset_liability_ratio)
          this.deductionOfNonNetProfit2.push(item.deduction_of_non_net_profit)
          this.totalOperatingIncome2.push(item.total_operating_income)
        }

        this.$echarts.init(document.getElementById('roe-cmp-chart')).setOption(this.generateOption('净资产收益率', this.roe1.reverse(), this.roe2.reverse()));
        this.$echarts.init(document.getElementById('debt-ratio-chart')).setOption(this.generateOption('负债率', this.assetLiabilityRatio2.reverse(), this.assetLiabilityRatio2.reverse()));
        this.$echarts.init(document.getElementById('eps-chart')).setOption(this.generateOption('每股收益', this.eps1.reverse(), this.eps2.reverse()));
        this.$echarts.init(document.getElementById('gross-margin-chart')).setOption(this.generateOption('毛利率', this.grossProfit1.reverse(), this.grossProfit2.reverse()));
        this.$echarts.init(document.getElementById('kf-net-profit-chart')).setOption(this.generateOption('扣非净利润', this.deductionOfNonNetProfit1.reverse(), this.deductionOfNonNetProfit2.reverse()));
        this.$echarts.init(document.getElementById('total-operating-income-chart')).setOption(this.generateOption('营业总收入', this.totalOperatingIncome1.reverse(), this.totalOperatingIncome2.reverse()));
      })
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
