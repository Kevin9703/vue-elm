<template>
  <div id="app">
    <router-view />
    <div
      class="nav"
      v-if="$route.meta.keepAlive"
    >
      <van-tabbar v-model="active">
        <van-tabbar-item
          replace
          to="/"
        >
          <span>外卖</span>
          <template #icon="props">
            <img :src="props.active ? icon.active1 : icon.inactive1">
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/find"
        >
          <span>发现</span>
          <template #icon="props">
            <img :src="props.active ? icon.active2 : icon.inactive2">
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/order"
        >
          <span>订单</span>
          <template #icon="props">
            <img :src="props.active ? icon.active3 : icon.inactive3">
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/my"
        >
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ? icon.active4 : icon.inactive4">
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      active: 0,
      icon: {
        active1: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/未标题3.png',
        inactive1: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/未标题-3.png',
        active2: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/find2.png',
        inactive2: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/find.png',
        active3: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/订单2.png',
        inactive3: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/订单.png',
        active4: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/我的2.png',
        inactive4: 'https://www.kevin0825.xyz/wp-content/uploads/2020/06/我的.png',
      },
    };
  },
  methods: {
  },
  watch: {
    $route: {
      handler(newRouter) {
        if (newRouter.name === 'Home') {
          this.active = 0;
        }
        if (newRouter.name === 'Find') {
          this.active = 1;
        }
        if (newRouter.name === 'Order') {
          this.active = 2;
        }
        if (newRouter.name === 'My') {
          this.active = 3;
        }
      },
    },
  },
};
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.van-tabbar-item--active {
    color:rgb(1,165,254) !important;
}
.van-tabbar-item__icon img {
    display: block;
    height: 23px !important;
}
.van-tabbar{
  background-color: rgb(245,245,245) !important;
  z-index: 2 !important;
}
</style>
