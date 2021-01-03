<template>
  <div id="app">
    <index-line-chart/>

    <stock-composition-table/>
  </div>
</template>

<script>
import IndexLineChart from './components/IndexLineChart'
import StockCompositionTable from './components/StockCompositionTable'

export default {
  name: 'App',
  components: {
    IndexLineChart, StockCompositionTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
