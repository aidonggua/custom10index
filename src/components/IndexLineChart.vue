<template>
  <el-row>
    <el-col :span="12">
      <el-col :span="22" :offset="1">
        <el-card class="box-card">
          <div class="Echarts">
            <div id="m10-value-chart" style="width: 580px;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-col>
    <el-col :span="12">
      <el-col :span="22" :offset="1">
        <el-card class="box-card">
          <div class="Echarts">
            <div id="m10-increase-chart" style="width: 580px;height:300px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "IndexLineChart",
  data() {
    return {
      index_data: []
    }
  },
  methods: {
    getIndexData() {
      this.$http({
        method: 'get',
        url: 'http://81.68.206.52:7010/index-data'
        // url: 'http://localhost:7010/index-data'
      }).then(res => {
        console.log(res)
        this.index_data = res.data

        this.myCharts()
      })
    },
    myCharts() {
      // 基于准备好的dom，初始化echarts实例
      const m10ValueChart = this.$echarts.init(document.getElementById('m10-value-chart'));
      const m10IncreaseChart = this.$echarts.init(document.getElementById('m10-increase-chart'));
      // 指定图表的配置项和数据
      const m10ValueChartOption = {
        title: {
          text: '指数走势',
          top: '20px'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['上证指数', '深圳成指', '创业板指', '沪深300', 'm10指数', 'l5指数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.index_data['date']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '上证指数',
            type: 'line',
            data: this.index_data['sh']
          },
          {
            name: '深圳成指',
            type: 'line',
            data: this.index_data['sz']
          },
          {
            name: '创业板指',
            type: 'line',
            data: this.index_data['cy']
          },
          {
            name: '沪深300',
            type: 'line',
            data: this.index_data['hs300']
          },
          {
            name: 'm10指数',
            type: 'line',
            data: this.index_data['m10']
          },
          {
            name: 'l5指数',
            type: 'line',
            data: this.index_data['l5']
          }
        ]
      };

      const m10IncreaseChartOption = {
        title: {
          text: '指数涨幅走势',
          top: '20px'
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['上证指数', '深圳成指', '创业板指', '沪深300', 'm10指数', 'l5指数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.index_data['date']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '上证指数',
            type: 'line',
            data: this.index_data['sh_increase']
          },
          {
            name: '深圳成指',
            type: 'line',
            data: this.index_data['sz_increase']
          },
          {
            name: '创业板指',
            type: 'line',
            data: this.index_data['cy_increase']
          },
          {
            name: '沪深300',
            type: 'line',
            data: this.index_data['hs300_increase']
          },
          {
            name: 'm10指数',
            type: 'line',
            data: this.index_data['m10_increase']
          },
          {
            name: 'l5指数',
            type: 'line',
            data: this.index_data['l5_increase']
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      m10ValueChart.setOption(m10ValueChartOption);
      m10IncreaseChart.setOption(m10IncreaseChartOption);
    }
  },
  mounted() {
    this.getIndexData()
  }
}

</script>

<style scoped>
.el-row {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
