<template>
  <div>
    <div style="margin-left:10px;margin-top:20px;">
      <van-row
        type="flex"
        align="center"
        gutter="5"
      >
        <van-col span="20">
          <van-field
            v-model="value"
            placeholder="输入城市名"
            :border="false"
            bind:change="onChange"
            left-icon="search"
          />
        </van-col>
        <van-col span="4">
          <div
            style="color:rgb(1, 165, 254);margin-left:10px;"
            @click="(()=>{
              $router.push('/addressSelect');
            })"
          >
            取消
          </div>
        </van-col>
      </van-row>
    </div>
    <van-divider />
    <div
      class="locationSelect"
    >
      <span style="margin-left:15px;color:rgb(156, 156, 156);font-size:13px;">
        当前定位
      </span>
      <span
        style="position:fixed;right:15px;font-size:13px;color:rgb(1, 165, 254);"
        @click="searchCity()"
      >重新定位</span>
      <br>
      <br>
      <div
        @click="(()=>{
          $store.commit('currentCity', city);
          $router.push('/addressSelect');
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
            <span style="margin-left:10px;font-size:15px;">{{ city }}</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="split" />
    <div
      style="margin-top:15px;margin-left:10px;font-size:15px;"
      v-for="(item) in result"
      :key="item.id"
      @click="(()=>{
        $store.commit('currentCity', item);
        $router.push('/addressSelect');
      })"
    >
      {{ item }}
      <van-divider />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCity',
  data() {
    return {
      city: '定位中',
      value: '',
      cityList: [],
      result: [],
    };
  },
  methods: {
    getLocation() {
      this.currentLocation = '正在定位';
      this.city = '定位中';
      // eslint-disable-next-line no-undef
      const mapObj = new AMap.Map('iCenter');
      mapObj.plugin('AMap.Geolocation', () => {
        // eslint-disable-next-line no-undef
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          extensions: 'all',
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            this.city = result.addressComponent.city;
          }
          if (status === 'error') {
            // alert(JSON.stringify(result.formattedAddress));
            this.city = '定位中';
            this.currentLocation = '定位失败，请点击重试';
          }
        });
      });
    },
    getCity() {
      const provinceList = [
        '北京市',
        '天津市',
        '上海市',
        '重庆市',
        '河北省',
        '山西省',
        '辽宁省',
        '吉林省',
        '黑龙江省',
        '江苏省',
        '浙江省',
        '安徽省',
        '福建省',
        '江西省',
        '山东省',
        '河南省',
        '湖北省',
        '湖南省',
        '广东',
        '海南',
        '四川',
        '贵州',
        '云南',
        '陕西',
        '甘肃',
        '青海',
        '台湾',
        '内蒙古',
        '广西',
        '西藏',
        '宁夏',
        '新疆',
        '香港特别行政区',
        '澳门特别行政区',
      ];
      provinceList.forEach((province) => {
        setTimeout(() => {
          this.axios
            .get(
              `https://restapi.amap.com/v3/config/district?keywords=${province}&subdistrict=2&key=9774738ac1dd720c28b3c36859134b6d`,
            )
            .then((res) => {
              console.log(res.data);
              for (
                let i = 0;
                i < res.data.districts[0].districts.length;
                i += 1
              ) {
                // console.log(res.data.districts[0].districts[i].name);
                this.cityList.push(res.data.districts[0].districts[i].name);
              }
            });
        });
      }, 1000);
      console.log(this.cityList);
    },
    cityinsert() {
      console.log(this.cityList);
      this.cityList.forEach((i) => {
        console.log(i);
        this.axios
          .get(`http://127.0.0.1:3000/users/insert?city_name=${i}`)
          .then((res) => {
            console.log(res);
          });
      });
    },
    getCityList() {
      this.axios.get('api/users/getCity').then((res) => {
        //   console.log(res.data.cityInfo);
        for (let i = 0; i < res.data.cityInfo.length; i += 1) {
          // console.log(res.data.cityInfo[i].city_name);
          this.cityList.push(res.data.cityInfo[i].city_name);
        }
      });
      //   console.log('>>>>>>>>', this.cityList);
    },
    searchCity() {
      this.result.splice(0, this.result.length);
      if (this.value === '') {
        this.result.splice(0, this.result.length);
      }
      if (this.value !== '') {
        this.axios
          .get('api/users/citySearch', { params: { city_name: this.value } })
          .then((res) => {
            for (let i = 0; i < res.data.cityInfo.length; i += 1) {
              if (res.data.cityInfo[i].city_name !== undefined) {
                this.result.push(res.data.cityInfo[i].city_name);
              }
            }
          });
      }
    },
  },
  mounted() {
    this.getLocation();
    // this.getCityList();
  },
  watch: {
    value() {
      this.searchCity();
    },
  },
};
</script>

<style scoped>
.van-cell {
  background-color: rgb(243, 243, 243);
  height: 40px;
  border-radius: 50px;
  line-height: 20px;
}
.van-cell {
  color: rgb(156, 156, 156);
}
.split {
  height: 8px;
  background-color: rgb(243, 243, 243);
  margin-top: 10px;
}
</style>
