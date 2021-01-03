<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
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
        url: 'http://localhost:9999/index-value-data'
      }).then(res => {
        console.log(res)
        this.index_data = res.data

        this.myCharts()
      })
    },
    myCharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'm10指数',
          left: 0
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['上证指数', '深圳成指', '创业板指', '沪深300', 'm10指数']
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
            data: this.index_data.sh
          },
          {
            name: '深圳成指',
            type: 'line',
            data: this.index_data.sz
          },
          {
            name: '创业板指',
            type: 'line',
            data: this.index_data.cy
          },
          {
            name: '沪深300',
            type: 'line',
            data: [5211.29, 5211.29, 5211.29]
          },
          {
            name: 'm10指数',
            type: 'line',
            data: this.index_data['m10']
          }
        ]
      };


      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getIndexData()
  }
}

</script>

<style scoped>

#main {
  margin: auto auto;
}

</style>