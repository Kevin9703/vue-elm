<template>
  <div class="home">
    <div class="head">
      <van-row>
        <van-col span="19">
          <div
            class="headFont"
            @click="$router.push('location')"
          >
            <van-icon name="location" />
            {{ currentAddress }}
          </div>
        </van-col>
        <van-col span="">
          <span style="color:#FFFFFF;font-size:25px;position: absolute;right:55px;">
            <van-icon
              name="scan"
            /></span>
        </van-col>
        <van-col>
          <span
            style="color:#FFFFFF;font-size:25px;position: absolute;
  right:20px;"
          >
            <van-icon
              name="envelop-o"
            /></span>
        </van-col>
      </van-row>
    </div>
    <div
      class="isLocation"
      v-show="!isAddress"
    >
      <div class="container">
        <van-row
          type="flex"
          justify="center"
        >
          <van-col>
            <span style="letter-spacing:0.5px;color:grey;font-size:16px;">无法获取位置信息</span>
          </van-col>
        </van-row>
        <van-row
          type="flex"
          justify="center"
        >
          <van-col>
            <div style="margin-top:5px;">
              <span
                style="letter-spacing:0.5px;
                color:#C0C0C0;
                margin-left:6px;
                font-size:12px;"
              >我在哪，我是谁？</span>
            </div>
          </van-col>
        </van-row>
        <van-row
          type="flex"
          justify="center"
        >
          <van-col>
            <div style="margin-top:10px;">
              <button
                type="button"
                class="locationButton"
                @click="$router.push('/location')"
              >
                手动定位
              </button>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="main">
      <div class="mainContainer">
        <van-row
          type="flex"
          justify="center"
        >
          <van-col span="24">
            <div
              class="search"
              :style="style"
            >
              <van-row>
                <van-col span="20">
                  <div style="margin-top:8px;margin-left:20px;color:#A9A9A9;font-size:20px;">
                    <van-icon name="search" />
                  </div>
                </van-col>
                <van-col>
                  <div class="searchButton">
                    <div style="margin-left:14px;font-size:15px;margin-top:1px;">
                      搜索
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>

        <br>
      </div>
    </div>

    <div
      class="loginPrompt"
      v-show="!isLogin"
    >
      <van-row>
        <van-col span="19">
          <span class="footer-font">登陆可领取海量权益哦</span>
        </van-col>
        <van-col>
          <van-button
            type="info"
            size="small"
            color="rgb(1,165,254)"
            @click="$router.push('/login')"
          >
            马上登录
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      name: '',
      pass: '',
      active: 0,
      isLogin: true,
      isAddress: true,
      style: '',
      currentAddress: '',
    };
  },
  methods: {
    getin() {
      this.axios
        .post('api/users/login', {
          first_name: this.name,
          last_name: this.pass,
        })
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 2) {
            const flag = true;
            this.$store.commit('login', flag);
            this.$store.commit('setUserId', this.name);
            this.$router.push('/about');
          }
        });
    },
    setSearchWidth() {
      // console.log(document.body.clientWidth);
      this.style = `width:${document.body.clientWidth - 20}px`;
      // setAttribute('style', `width:${document.body.clientWidth}px`)
    },
    clear() {
      this.$store.commit('addressInfo', null);
    },
    checkLogin() {
      if (JSON.parse(localStorage.getItem('islogin'))) {
        setTimeout(() => {
          this.isLogin = true;
        }, 0);
      }
      if (!JSON.parse(localStorage.getItem('islogin'))) {
        this.isLogin = false;
      }
    },
    checkLocation() {
      if (JSON.parse(localStorage.getItem('address'))) {
        const addInfo = JSON.parse(localStorage.getItem('address'));
        if (addInfo.formattedAddress !== undefined) {
          this.currentAddress = addInfo.formattedAddress;
        }
        if (addInfo.name !== undefined) {
          this.currentAddress = addInfo.name;
        }
        setTimeout(() => {
          this.isAddress = true;
        }, 0);
      }
      if (!JSON.parse(localStorage.getItem('address'))) {
        this.isAddress = false;
      }
    },
  },

  created() {
    this.setSearchWidth();
    this.checkLogin();
    this.checkLocation();
  },
  computed: {
    ...mapGetters(['userName', 'userId']),
  },
};
</script>
<style>
.loginPrompt {
  background-color: rgb(53, 65, 79);
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 50px;
  line-height: 50px;
  z-index: 2;
}
.footer-font {
  color: white;
  font-size: 15px;
  margin-left: 15px;
}
.isLocation {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: white;
}
.container {
  top: 35%;
  position: relative;
}

.locationButton {
  width: 90px;
  height: 35px;
  text-align: center;
  line-height: 100%;
  margin: 2px;
  zoom: 1;
  font-size: 15px;
  border-radius: 50px;
  color: #fefee9;
  border: 0px solid rgb(1, 165, 254);
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: padding-box;
  background-color: rgb(1, 165, 254);
}
.head {
  background-color: rgb(1, 165, 254);
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  position: absolute;
  z-index: 1;
}
.main {
  padding: 10px 10px;
  background-color: #ffffff;
  border-radius: 25px;
  margin-top: 80px;
  position: absolute;
  z-index: 2;
  margin-bottom:50px;
}
.headFont {
  color: #ffffff;
  font-size: 18px;
  width: 35%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 10px;
}
.search {
  background-color: rgb(243, 243, 243);
  height: 35px;
  border-radius: 50px;
  width: 200px;
}
.searchButton{
  color: white;
  background-color: rgb(1, 165, 254);
  border-radius: 50px;
  height: 25px;
  width: 60px;
  margin-top:3.5px;
  padding-top: 2px;
  position: absolute;
  right:15px;
}
</style>
