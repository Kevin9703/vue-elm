<template>
  <div>
    <van-nav-bar
      title="选择收获地址"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="select">
      <van-row>
        <van-col span="7">
          <div
            class="city"
            @click="(()=>{
              $router.push('/selectCity');
            })"
          >
            {{ city }}
            <span style="color:grey;font-size:10px;">
              <van-icon name="arrow-down" />
            </span>
            <span style="color:rgb(156, 156, 156);font-size:15px;margin-left:10px;">|</span>
          </div>
        </van-col>
        <van-col span="17">
          <div class="block">
            <van-field
              v-model="value"
              placeholder="小区/写字楼/学校 等"
              :border="false"
              bind:change="onChange"
              left-icon="search"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div
      style="margin-top:15px;margin-left:15px;font-size:15px;"
      v-for="(item,i) in info"
      :key="item.id"
      @click="(()=>{
        $store.commit('addressInfo', info[i]);
        $router.push('/');
      })"
    >
      {{ item.name }}
      <van-divider />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'AddressSelect',
  data() {
    return {
      currentLocation: '定位失败，请点击重试',
      city: '定位中',
      addressInfo: '',
      addressDis: '',
      clickInfo: '',
      value: '',
      info: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push('/location');
    },
    getCity() {
      if (this.$store.getters.City !== '') {
        this.city = this.$store.getters.City;
      } else if (JSON.parse(localStorage.getItem('address'))) {
        const addInfo = JSON.parse(localStorage.getItem('address'));
        if (addInfo.addressComponent.city !== undefined) {
          this.city = addInfo.addressComponent.city;
        }
      }
    },
    getAddressDetail() {
      this.info.splice(0, this.info.length);
      if (this.value === '') {
        this.info.splice(0, this.info.length);
      }
      if (this.value !== '') {
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          AMap.plugin('AMap.Autocomplete', () => {
            // 实例化Autocomplete
            const autoOptions = {
              // city 限定城市，默认全国
              city: this.city,
            };
            // eslint-disable-next-line no-undef
            const autoComplete = new AMap.Autocomplete(autoOptions);
            autoComplete.search(this.value, (status, result) => {
              console.log(result);
              if (result !== 'NO_PARAMS') {
                for (let i = 0; i < result.tips.length; i += 1) {
                // console.log(res.data.cityInfo[i].city_name);
                  this.info.push(result.tips[i]);
                }
              }
            });
          });
        }, 500);
      }
    },
  },
  mounted() {
    this.getCity();
  },
  computed: {},
  watch: {
    value() {
      this.getAddressDetail();
    },
  },
};
</script>

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
.van-cell {
  background-color: rgb(243, 243, 243);
  height: 40px;
  border-radius: 50px;
  line-height: 20px;
}
.van-cell {
  color: rgb(156, 156, 156);
}
</style>
