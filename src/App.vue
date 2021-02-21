<template>
  <div id="app">
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#CC3300"
               text-color="white"
               active-text-color="yellow">
        <el-menu-item index="1">
          <router-link to='/index-battle'>
            指数battle
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to='/financial-report-battle'>
            财报battle
          </router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from "vue-router"
import IndexBattle from "@/components/IndexBattle";
import FinancialReportBattle from "@/components/FinancialReportBattle";

const router = new VueRouter({
  routes: [
    {path: '/index-battle', component: IndexBattle},
    {path: '/financial-report-battle', component: FinancialReportBattle}
  ]
})

export default {
  name: 'App',
  router,
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto auto;
}

body {
  margin: 0;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>
