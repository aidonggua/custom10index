<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-col :span="22" :offset="1">
          <el-card class="cfg">
<!--            <h2>m10成分股</h2>-->
            <table>
              <thead>
              <tr>
                <th>代码</th>
                <th>名称</th>
                <th>股价</th>
                <th>涨幅</th>
                <th>指数影响</th>
                <th>日期</th>
              </tr>
              </thead>
              <tr v-for="(item) in m10_index_composition" :key="item.stock_code">
<!--                <td>{{ index }}</td>-->
                <td>{{ item.stock_code }}</td>
                <td>{{ item.stock_name }}</td>
                <td>{{ item.stock_price }}</td>
                <td v-if="item.stock_increase > 0" class="red">
                  {{ item.stock_increase }}%
                </td>
                <td v-if="item.stock_increase < 0" class="green">
                  {{ item.stock_increase }}%
                </td>
                <!--              <td>{{ item.index_weight_ratio }}%</td>-->
                <td>{{ item.index_influence }}</td>
                <td>{{ item.data_date }}</td>
              </tr>
            </table>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="22" :offset="1">
          <el-card class="cfg">
<!--            <h2>l5成分股</h2>-->
            <table>
              <thead>
              <tr>
<!--                <th></th>-->
                <th>代码</th>
                <th>名称</th>
                <th>股价</th>
                <th>涨幅</th>
                <th>指数影响</th>
                <th>日期</th>
              </tr>
              </thead>
              <tr v-for="(item) in l5_index_composition" :key="item.stock_code">
<!--                <td>{{ index }}</td>-->
                <td>{{ item.stock_code }}</td>
                <td>{{ item.stock_name }}</td>
                <td>{{ item.stock_price }}</td>
                <td v-if="item.stock_increase > 0" class="red">
                  {{ item.stock_increase }}%
                </td>
                <td v-if="item.stock_increase < 0" class="green">
                  {{ item.stock_increase }}%
                </td>
                <!--              <td>{{ item.index_weight_ratio }}%</td>-->
                <td>{{ item.index_influence }}</td>
                <td>{{ item.data_date }}</td>
              </tr>
            </table>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StockCompositionTable",
  data() {
    return {
      m10_index_composition: [],
      l5_index_composition: []
    }
  },
  methods: {
    getM10IndexComposition() {
      this.$http({
        method: 'get',
        // url: 'http://81.68.206.52:7010/daily-stock?index_code=m10'
        url: 'http://localhost:7010/daily-stock?index_code=m10'
      }).then(res => {
        console.log(res)
        this.m10_index_composition = res.data
      })
    },
    getL5IndexComposition() {
      this.$http({
        method: 'get',
        // url: 'http://81.68.206.52:7010/daily-stock?index_code=l5'
        url: 'http://localhost:7010/daily-stock?index_code=l5'
      }).then(res => {
        console.log(res)
        this.l5_index_composition = res.data
      })
    }
  },
  created() {
    this.getM10IndexComposition()
    this.getL5IndexComposition()
  }
}
</script>

<style scoped>

table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}

table td, table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}

table thead th {
  background-color: #CCE8EB;
  width: 100px;
}

table tr:nth-child(odd) {
  background: #fff;
}

table tr:nth-child(even) {
  background: #F5FAFA;
}


.red {
  color: red;
}

.green {
  color: green;
}

.el-row {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.cfg {
  height: 400px;
}
</style>
