<template>
  <div>
    <div class="search-card">
      <el-row>
        <el-col :span="3">
          <el-select v-model="stockCode[1]" placeholder="股票1">
            <el-option
                v-for="item in stockList"
                :key="item.code"
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
          <el-select v-model="stockCode[2]" placeholder="股票2">
            <el-option
                v-for="item in stockList"
                :key="item.code"
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
          <el-select v-model="stockCode[3]" placeholder="股票3">
            <el-option
                v-for="item in stockList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-button @click="handleBattle">Battle</el-button>
        </el-col>

        <!--        <el-col :span="10" style="padding: 0">-->
        <!--          <div id="battle-result-chart">-->
        <!--            <div class="stock-compare-blood left-stock-compare-blood">-->
        <!--              40分-->
        <!--            </div>-->
        <!--            <div class="stock-compare-blood right-stock-compare-blood">-->
        <!--              60分-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </el-col>-->
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
            <div id="gross-margin-chart" style="width: 90%;height:300px;"></div>
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
            <div id="currency-chart" style="width: 90%;height:300px;"></div>
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
            <div id="current-liabilities-ratio-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="short-term-loan-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="accounts-bills-payable-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="accounts-bills-receivable-chart" style="width: 90%;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="Echarts">
            <div id="goodwill-chart" style="width: 90%;height:300px;"></div>
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
      stockMap: {},
      stockCode: {1: "", 2: "", 3: ""},
      stockList: [{code: "000000", name: "请选择"}],
      dateList: ['12年', '13年', '14年', '15年', '16年', '17年', '18年', '19年'],
      stockData: [],
      roe: {1: [], 2: [], 3: []},
      eps: {1: [], 2: [], 3: []},
      totalOperatingIncome: {1: [], 2: [], 3: []},
      deductionOfNonNetProfit: {1: [], 2: [], 3: []},
      grossProfitRate: {1: [], 2: [], 3: []},
      assetLiabilityRatio: {1: [], 2: [], 3: []},
      currentLiabilitiesRatio: {1: [], 2: [], 3: []},
      currency: {1: [], 2: [], 3: []},
      goodwill: {1: [], 2: [], 3: []},
      shortTermLoan: {1: [], 2: [], 3: []},
      accountsBillsPayable: {1: [], 2: [], 3: []},
      accountsBillsReceivable: {1: [], 2: [], 3: []},
      roeCmpChart: {},
      debtRatioChart: {},
      epsChart: {},
      grossMarginChart: {},
      kfNetProfitChart: {},
      totalOperatingIncomeChart: {},
      currentLiabilitiesRatioChart: {},
      currencyChart: {},
      goodwillChart: {},
      shortTermLoanChart: {},
      accountsBillsPayableChart: {},
      accountsBillsReceivableChart: {}
    }
  },
  mounted() {
    this.roeCmpChart = this.$echarts.init(document.getElementById('roe-cmp-chart'))
    this.debtRatioChart = this.$echarts.init(document.getElementById('debt-ratio-chart'))
    this.epsChart = this.$echarts.init(document.getElementById('eps-chart'))
    this.grossMarginChart = this.$echarts.init(document.getElementById('gross-margin-chart'))
    this.kfNetProfitChart = this.$echarts.init(document.getElementById('kf-net-profit-chart'))
    this.totalOperatingIncomeChart = this.$echarts.init(document.getElementById('total-operating-income-chart'))
    this.currentLiabilitiesRatioChart = this.$echarts.init(document.getElementById('current-liabilities-ratio-chart'))
    this.currencyChart = this.$echarts.init(document.getElementById('currency-chart'))
    this.goodwillChart = this.$echarts.init(document.getElementById('goodwill-chart'))
    this.shortTermLoanChart = this.$echarts.init(document.getElementById('short-term-loan-chart'))
    this.accountsBillsPayableChart = this.$echarts.init(document.getElementById('accounts-bills-payable-chart'))
    this.accountsBillsReceivableChart = this.$echarts.init(document.getElementById('accounts-bills-receivable-chart'))

    this.$http({
      method: 'get',
      url: 'http://81.68.206.52:7010/fr/stocks',
    }).then(res => {
      for (let data of res.data) {
        this.stockList.push(data)
        this.stockMap[data.code] = data.name
      }

      console.log(this.stockMap)
    })
  },
  methods: {
    generateOption(chartName, data) {
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: chartName,
          top: 20
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          feature: {
            magicType: {show: true, type: ['line', 'bar']},
          }
        },
        legend: {
          data: []
        },
        color: ['#4359b9', '#81c462', '#ecec4d'],
        xAxis: {
          type: 'category',
          data: this.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: []
      };

      if (this.stockCode[1] !== undefined && this.stockCode[1] !== '000000') {
        option.legend.data.push(this.stockMap[this.stockCode[1]])
        option.series.push({
          name: this.stockMap[this.stockCode[1]],
          data: data[1],
          type: 'bar',
        })

        option.series.push({
          name: this.stockMap[this.stockCode[1]],
          data: data[1],
          type: 'line',
        })
      }
      if (this.stockCode[2] !== undefined && this.stockCode[2] !== '000000') {
        option.legend.data.push(this.stockMap[this.stockCode[2]])
        option.series.push({
          name: this.stockMap[this.stockCode[2]],
          data: data[2],
          type: 'bar',
        })

        option.series.push({
          name: this.stockMap[this.stockCode[2]],
          data: data[2],
          type: 'line',
        })
      }
      if (this.stockCode[3] !== undefined && this.stockCode[3] !== '000000') {
        option.legend.data.push(this.stockMap[this.stockCode[3]])
        option.series.push({
          name: this.stockMap[this.stockCode[3]],
          data: data[3],
          type: 'bar',
        })

        option.series.push({
          name: this.stockMap[this.stockCode[3]],
          data: data[3],
          type: 'line',
        })
      }
      return option
    },
    handleBattle() {
      let param = '';
      if (this.stockCode[1] !== undefined && this.stockCode[1] !== 'unknown' && this.stockCode[1] !== '') {
        param += ("," + this.stockCode[1])
      }
      if (this.stockCode[2] !== undefined && this.stockCode[2] !== 'unknown' && this.stockCode[2] !== '') {
        param += ("," + this.stockCode[2])
      }
      if (this.stockCode[3] !== undefined && this.stockCode[3] !== 'unknown' && this.stockCode[3] !== '') {
        param += ("," + this.stockCode[3])
      }
      if (param === '') {
        return
      }

      this.$http({
        method: 'get',
        url: 'http://81.68.206.52:7010/fr?stocks=' + param
        // url: 'http://localhost:7010/fr?stocks=' + param
      }).then(res => {
        const frData = res.data
        this.clearData()

        let stockFrDataList1 = frData[this.stockCode[1]]
        if (stockFrDataList1 !== undefined && stockFrDataList1.length !== 0) {
          this.appendData(stockFrDataList1)
          for (let item of stockFrDataList1.reverse()) {
            this.roe[1].push(item.roe)
            this.eps[1].push(item.eps)
            this.grossProfitRate[1].push(item.gross_profit_rate)
            this.assetLiabilityRatio[1].push(item.asset_liability_ratio)
            this.deductionOfNonNetProfit[1].push(item.deduction_of_non_net_profit)
            this.totalOperatingIncome[1].push(item.total_operating_income)
            this.currentLiabilitiesRatio[1].push(item.current_liabilities_ratio)
            this.currency[1].push(item.currency)
            this.goodwill[1].push(item.goodwill)
            this.shortTermLoan[1].push(item.short_term_loan)
            this.accountsBillsPayable[1].push(item.accounts_bills_payable)
            this.accountsBillsReceivable[1].push(item.accounts_bills_receivable)
          }
        }

        let stockFrDataList2 = frData[this.stockCode[2]]
        if (stockFrDataList2 !== undefined && stockFrDataList2.length !== 0 && this.stockCode[2] !== this.stockCode[1]) {
          this.appendData(stockFrDataList2)
          for (let item of stockFrDataList2.reverse()) {
            this.roe[2].push(item.roe)
            this.eps[2].push(item.eps)
            this.grossProfitRate[2].push(item.gross_profit_rate)
            this.assetLiabilityRatio[2].push(item.asset_liability_ratio)
            this.deductionOfNonNetProfit[2].push(item.deduction_of_non_net_profit)
            this.totalOperatingIncome[2].push(item.total_operating_income)
            this.currentLiabilitiesRatio[2].push(item.current_liabilities_ratio)
            this.currency[2].push(item.currency)
            this.goodwill[2].push(item.goodwill)
            this.shortTermLoan[2].push(item.short_term_loan)
            this.accountsBillsPayable[2].push(item.accounts_bills_payable)
            this.accountsBillsReceivable[2].push(item.accounts_bills_receivable)
          }
        }

        let stockFrDataList3 = frData[this.stockCode[3]]
        if (stockFrDataList3 !== undefined && stockFrDataList3.length !== 0 && this.stockCode[3] !== this.stockCode[1] && this.stockCode[3] !== this.stockCode[2]) {
          this.appendData(stockFrDataList3)
          for (let item of stockFrDataList3.reverse()) {
            this.roe[3].push(item.roe)
            this.eps[3].push(item.eps)
            this.grossProfitRate[3].push(item.gross_profit_rate)
            this.assetLiabilityRatio[3].push(item.asset_liability_ratio)
            this.deductionOfNonNetProfit[3].push(item.deduction_of_non_net_profit)
            this.totalOperatingIncome[3].push(item.total_operating_income)
            this.currentLiabilitiesRatio[3].push(item.current_liabilities_ratio)
            this.currency[3].push(item.currency)
            this.goodwill[3].push(item.goodwill)
            this.shortTermLoan[3].push(item.short_term_loan)
            this.accountsBillsPayable[3].push(item.accounts_bills_payable)
            this.accountsBillsReceivable[3].push(item.accounts_bills_receivable)
          }
        }

        this.roeCmpChart.setOption(this.generateOption('净资产收益率', this.roe))
        this.debtRatioChart.setOption(this.generateOption('负债率', this.assetLiabilityRatio))
        this.epsChart.setOption(this.generateOption('每股收益', this.eps))
        this.grossMarginChart.setOption(this.generateOption('毛利率', this.grossProfitRate))
        this.kfNetProfitChart.setOption(this.generateOption('扣非净利润', this.deductionOfNonNetProfit))
        this.totalOperatingIncomeChart.setOption(this.generateOption('营业总收入', this.totalOperatingIncome))
        this.currentLiabilitiesRatioChart.setOption(this.generateOption('流动负债/总负责', this.currentLiabilitiesRatio))
        this.currencyChart.setOption(this.generateOption('货币资金', this.currency))
        this.goodwillChart.setOption(this.generateOption('商誉', this.goodwill))
        this.shortTermLoanChart.setOption(this.generateOption('短期借款', this.shortTermLoan))
        this.accountsBillsPayableChart.setOption(this.generateOption('应付账款和票据', this.accountsBillsPayable))
        this.accountsBillsReceivableChart.setOption(this.generateOption('应收账款和票据', this.accountsBillsReceivable))
      });
    },
    appendData(array) {
      while (array.length < 8) {
        array.push({
          roe: 0,
          eps: 0,
          gross_profit_rate: 0,
          asset_liability_ratio: 0,
          deduction_of_non_net_profit: 0,
          total_operating_income: 0,
          current_liabilities_ratio: 0,
          currency: 0,
          goodwill: 0,
          short_term_loan: 0,
          accounts_bills_payable: 0,
          accounts_bills_receivable: 0
        })
      }
    },
    clearData() {
      this.roe = {1: [], 2: [], 3: []}
      this.eps = {1: [], 2: [], 3: []}
      this.grossProfitRate = {1: [], 2: [], 3: []}
      this.assetLiabilityRatio = {1: [], 2: [], 3: []}
      this.deductionOfNonNetProfit = {1: [], 2: [], 3: []}
      this.totalOperatingIncome = {1: [], 2: [], 3: []}
      this.currentLiabilitiesRatio = {1: [], 2: [], 3: []}
      this.currency = {1: [], 2: [], 3: []}
      this.goodwill = {1: [], 2: [], 3: []}
      this.shortTermLoan = {1: [], 2: [], 3: []}
      this.accountsBillsPayable = {1: [], 2: [], 3: []}
      this.accountsBillsReceivable = {1: [], 2: [], 3: []}
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
