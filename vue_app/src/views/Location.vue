<template>
  <div>
    <van-nav-bar
      title="选择收获地址"
      right-text="管理"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div
      class="select"
      @click="(()=>{
        $router.push('/addressSelect');
      })"
    >
      <van-row>
        <van-col span="7">
          <div class="city">
            {{ city }}
            <span style="color:grey;font-size:10px;">
              <van-icon name="arrow-down" />
            </span>
            <span style="color:rgb(156, 156, 156);font-size:15px;margin-left:10px;">|</span>
          </div>
        </van-col>
        <van-col span="17">
          <div class="block">
            <span style="color:grey;font-size:20px;margin-top:5px;position:relative;top:3px;">
              <van-icon name="search" />
            </span>
            <span style="position:relative;top:-1px;left:3px;">小区/写字楼/学校 等</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-divider />
    <!-- 当前定位 -->
    <div class="locationSelect">
      <span style="margin-left:15px;color:rgb(156, 156, 156);font-size:13px;">当前定位</span>
      <span
        style="position:fixed;right:15px;font-size:16px;color:rgb(1, 165, 254);"
        @click="geoLocation()"
      >重新定位</span>
      <br>
      <br>
      <div
        @click="(()=>{
          $store.commit('addressInfo', addressInfo);
          $router.push('/');
        })"
      >
        <van-row>
          <van-col span="2">
            <span
              style="margin-left:15px;
        color:rgb(1, 165, 254);font-size:20px;
        vertical-align: middle;"
            >
              <van-icon name="location" />
            </span>
          </van-col>
          <van-col span="20">
            <span style="margin-left:3px;font-size:15px;">{{ currentLocation }}</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="split" />
    <!-- 附近地址 -->
    <div
      class="near"
      style="margin-top:15px;"
      v-if="addressInfo!==''"
    >
      <span
        style="margin-top:200px;
            margin-left:15px;
            color:rgb(156, 156, 156);
            font-size:13px;"
      >附近地址</span>
      <div style="float:right;margin-right:15px;margin-top:1.5px;">
        <span style="color:rgb(156, 156, 156);font-size:13px;">
          <van-icon name="arrow" />
        </span>
      </div>
      <div style="float:right;">
        <span style="color:rgb(156, 156, 156);font-size:13px;">更多</span>
      </div>
    </div>
    <div class="nearContainer">
      <div
        class="nearDis"
        v-for="(item,i) in addressInfo.pois"
        :key="item.id"
      >
        <div
          class="nearFont"
          @click="(()=>{
            $store.commit('addressInfo', addressInfo.pois[i]);
            $router.push('/');
          })"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Location',
  components: {},
  data() {
    return {
      currentLocation: '定位失败，请点击重试',
      city: '定位中',
      addressInfo: '',
      addressDis: '',
      clickInfo: '',
    };
  },
  methods: {
    geoLocation() {
      this.currentLocation = '正在定位';
      this.city = '定位中';
      // eslint-disable-next-line no-undef
      const mapObj = new AMap.Map('iCenter');
      mapObj.plugin('AMap.Geolocation', () => {
        // eslint-disable-next-line no-undef
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 5000, // 超过5秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          extensions: 'all',
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          // alert(JSON.stringify(result));
          if (status === 'complete') {
            this.$store.commit('addressInfo', result);
            this.city = result.addressComponent.city;
            this.currentLocation = result.formattedAddress;
            this.addressInfo = result;
          }
          if (status === 'error') {
            // alert('error', JSON.stringify(result.formattedAddress));
            this.city = '定位中';
            this.currentLocation = '定位失败，请点击重试';
          }
        });
      });
    },
    onClickLeft() {
      this.$router.push('/');
    },
    onClickRight() {
      this.$router.push('/');
    },
  },
  //   created() {
  //     this.geoLocation();
  //   },
  mounted() {
    this.geoLocation();
  },
};
</script>>

<style scoped>
.select {
  background-color: rgb(243, 243, 243);
  height: 40px;
  border-radius: 50px;
  margin-left: 15px;
  margin-right: 15px;
}
.city {
  line-height: 40px;
  margin-left: 18px;
  font-size: 14px;
}
.block {
  line-height: 40px;
  margin-left: 15px;
  font-size: 15px;
  color: rgb(156, 156, 156);
}
[class*="van-hairline"]::after {
  border: white;
}
.split {
  height: 8px;
  background-color: rgb(243, 243, 243);
  margin-top: 10px;
}
.nearContainer {
  margin-left: 7%;
}
.nearDis {
  margin: 5px;
  background-color: rgb(243, 243, 243);
  width: auto;
  max-width: 86%;
  border-radius: 4px;
  display: inline-block;
}
.nearFont {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 8px 12px;
  font-size: 15px;
  color: rgb(121, 121, 121);
}
</style>
