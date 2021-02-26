<template>
  <div>
    <div class="search-card">
      <el-row>
        <el-col :span="3">
          <el-select v-model="stockCode[1]" placeholder="股票1">
            <el-option
                v-for="item in Object.keys(stockList)"
                :key="item"
                :label="stockList[item]"
                :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <div style="color: black;font-size: large;text-align: center; line-height: 40px">
            VS
          </div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="stockCode[2]" placeholder="股票2">
            <el-option
                v-for="item in Object.keys(stockList)"
                :key="item"
                :label="stockList[item]"
                :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <div style="color: black;font-size: large;text-align: center; line-height: 40px">
            VS
          </div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="stockCode[3]" placeholder="股票3">
            <el-option
                v-for="item in Object.keys(stockList)"
                :key="item"
                :label="stockList[item]"
                :value="item">
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
      stockCode: {1: "", 2: "", 3: ""},
      stockList: {sz002463: "沪电股份", sz002916: "深南电路"},
      dateList: ['12年', '13年', '14年', '15年', '16年', '17年', '18年', '19年'],
      stockData: [],
      roe: {1: [], 2: [], 3: []},
      eps: {1: [], 2: [], 3: []},
      totalOperatingIncome: {1: [], 2: [], 3: []},
      deductionOfNonNetProfit: {1: [], 2: [], 3: []},
      grossProfit: {1: [], 2: [], 3: []},
      assetLiabilityRatio: {1: [], 2: [], 3: []},
    }
  },
  mounted() {
  },
  methods: {
    generateOption(chartName, data) {
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
          data: [this.stockList[this.stockCode[1]], this.stockList[this.stockCode[2]], this.stockList[this.stockCode[3]],]
        },
        color: ['#4359b9', '#81c462', '#aaaa62'],
        xAxis: {
          type: 'category',
          data: this.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.stockList[this.stockCode[1]],
            data: data[1].reverse(),
            type: 'bar',
          },
          {
            name: this.stockList[this.stockCode[1]],
            data: data[1].reverse(),
            type: 'line',
          },
          {
            name: this.stockList[this.stockCode[2]],
            data: data[2].reverse(),
            type: 'bar',
          },
          {
            name: this.stockList[this.stockCode[2]],
            data: data[2].reverse(),
            type: 'line',
          },
          {
            name: this.stockList[this.stockCode[3]],
            data: data[3].reverse(),
            type: 'bar',
          },
          {
            name: this.stockList[this.stockCode[3]],
            data: data[3].reverse(),
            type: 'line',
          },
        ]
      };
    },
    handleBattle() {
      this.$http({
        method: 'get',
        // url: 'http://localhost:7010/fr?stocks=' + this.stockLeft + ',' + this.stockRight
        url: 'http://81.68.206.52:7010/fr?stocks=' + this.stockCode[1] + ',' + this.stockCode[2] + ',' + this.stockCode[3]
      }).then(res => {
        console.log(res)
        const frData = res.data

        let stockFrDataList1 = frData[this.stockCode[1]]
        for (let item of stockFrDataList1) {
          this.roe[1].push(item.roe)
          this.eps[1].push(item.eps)
          this.grossProfit[1].push(item.gross_profit)
          this.assetLiabilityRatio[1].push(item.asset_liability_ratio)
          this.deductionOfNonNetProfit[1].push(item.deduction_of_non_net_profit)
          this.totalOperatingIncome[1].push(item.total_operating_income)
        }

        let stockFrDataList2 = frData[this.stockCode[2]]
        for (let item of stockFrDataList2) {
          this.roe[2].push(item.roe)
          this.eps[2].push(item.eps)
          this.grossProfit[2].push(item.gross_profit)
          this.assetLiabilityRatio[2].push(item.asset_liability_ratio)
          this.deductionOfNonNetProfit[2].push(item.deduction_of_non_net_profit)
          this.totalOperatingIncome[2].push(item.total_operating_income)
        }

        let stockFrDataList3 = frData[this.stockCode[3]]
        for (let item of stockFrDataList3) {
          this.roe[3].push(item.roe)
          this.eps[3].push(item.eps)
          this.grossProfit[3].push(item.gross_profit)
          this.assetLiabilityRatio[3].push(item.asset_liability_ratio)
          this.deductionOfNonNetProfit[3].push(item.deduction_of_non_net_profit)
          this.totalOperatingIncome[3].push(item.total_operating_income)
        }


        this.$echarts.init(document.getElementById('roe-cmp-chart')).setOption(this.generateOption('净资产收益率', this.roe));
        this.$echarts.init(document.getElementById('debt-ratio-chart')).setOption(this.generateOption('负债率', this.assetLiabilityRatio));
        this.$echarts.init(document.getElementById('eps-chart')).setOption(this.generateOption('每股收益', this.eps));
        this.$echarts.init(document.getElementById('gross-margin-chart')).setOption(this.generateOption('毛利率', this.grossProfit));
        this.$echarts.init(document.getElementById('kf-net-profit-chart')).setOption(this.generateOption('扣非净利润', this.deductionOfNonNetProfit));
        this.$echarts.init(document.getElementById('total-operating-income-chart')).setOption(this.generateOption('营业总收入', this.totalOperatingIncome));
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
