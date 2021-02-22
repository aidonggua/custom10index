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

    <el-card class="compare-card">
      <el-row>
        <el-col :span="8">
          <el-card>
            <div class="Echarts">
              <div id="roe-cmp-chart" style="width: 580px;height:300px;"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="Echarts">
              <div id="chart2" style="width: 580px;height:300px;"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="Echarts">
              <div id="chart3" style="width: 580px;height:300px;"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "FinancialReportBattle",
  data() {
    return {
      stockLeft: "",
      stockRight: "",
      stockList: [{name: "沪电股份", code: "abc"}, {name: "太阳纸业", code: "bcd"}]
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

.compare-card {
  width: 90%;
  margin: 0 auto 0 auto;
  height: 600px;
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
  background: red;
  -webkit-border-top-right-radius: 50px;
  -webkit-border-bottom-right-radius: 50px;
}
</style>
