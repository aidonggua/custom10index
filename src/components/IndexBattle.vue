<template>
  <div>
    <index-line-chart/>
    <stock-composition-table/>
  </div>
</template>

<script>
import IndexLineChart from "@/components/IndexLineChart";
import StockCompositionTable from "@/components/StockCompositionTable";

export default {
  name: "IndexBattle",
  components: {StockCompositionTable, IndexLineChart},
  comments: {
    IndexLineChart, StockCompositionTable
  },
  mounted() {
    console.log("加载index-battle")
  }
}
</script>

<style scoped>

</style>