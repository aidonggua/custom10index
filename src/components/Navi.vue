<template>
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
        <router-link to='/index-battle'>
          财报对比
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
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