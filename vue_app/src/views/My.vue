<template>
  <div>
    <div class="avatar">
      <van-row
        tyle="flex"
        align="center"
        gutter="13"
      >
        <van-col>
          <van-image
            round
            width="4rem"
            height="4rem"
            fit="cover"
            :src="imageUrl"
          />
        </van-col>
        <van-col>
          <div
            style="margin-top:10px;"
            @click="$router.push('/login')"
            v-show="!isLogin"
          >
            <van-row>
              <span style="font-size:18px;">{{ userName }}</span>
            </van-row>
            <van-row>
              <span style="font-size:12px;color:#C0C0C0">再忙也要好好吃饭~</span>
            </van-row>
          </div>
          <div
            style="margin-top:10px;"
            @click="$router.push('/myDetail')"
            v-show="isLogin"
          >
            <van-row>
              <span style="font-size:18px;">{{ userName }}</span>
            </van-row>
            <van-row>
              <span style="font-size:12px;color:#C0C0C0">再忙也要好好吃饭~</span>
            </van-row>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-row
      type="flex"
      justify="center"
      gutter="5"
    >
      <van-col span="24">
        <div class="fun">
          <div style="font-size:15px;">
            常用功能
          </div>
          <div class="ic">
            <van-row
              gutter="50"
              justify="center"
              type="flex"
            >
              <van-col>
                <div style="line-height:0.5px;">
                  <p>
                    <span style="font-size:35px;color:rgb(1, 165, 254)">
                      <van-icon name="cart" />
                    </span>
                  </p>
                  <p><span style="font-size:12px;">购物车</span></p>
                </div>
              </van-col>
              <van-col>
                <div style="line-height:0.5px;">
                  <p>
                    <span style="font-size:35px;color:rgb(1, 165, 254)">
                      <van-icon name="star" />
                    </span>
                  </p>
                  <p><span style="font-size:12px;margin-left:5px;">收藏</span></p>
                </div>
              </van-col>
              <van-col>
                <div style="line-height:0.5px;">
                  <p>
                    <span style="font-size:35px;color:rgb(1, 165, 254)">
                      <van-icon name="location" />
                    </span>
                  </p>
                  <p><span style="font-size:12px;margin-left:5px;">地址</span></p>
                </div>
              </van-col>
              <van-col>
                <div style="line-height:0.5px;">
                  <p>
                    <span style="font-size:35px;color:rgb(1, 165, 254)">
                      <van-icon name="service" />
                    </span>
                  </p>
                  <p><span style="font-size:12px;margin-left:5px;">客服</span></p>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue';
import { Upload } from 'element-ui';

Vue.use(Upload);
export default {
  name: 'My',
  data() {
    return {
      userName: '',
      imgUrl: '',
      imageUrl: '',
      userId: '',
      click: '',
      isLogin: '',
    };
  },
  methods: {
    imghandle() {
      // eslint-disable-next-line global-require
      this.imgUrl = require('../assets/profile_photo/2.png');
    },
    getId() {
      this.userId = JSON.parse(window.localStorage.getItem('userId') || null);
      this.userName = JSON.parse(
        window.localStorage.getItem('userName') || null,
      );
      if (this.userId === null) {
        this.isLogin = false;
        this.userName = '立即登录';
      }
      if (this.userId !== null) {
        this.isLogin = true;
        console.log(this.userId);
        this.imageUrl = `http://192.168.1.105:3000/users/avatar?userId=${this.userId}`;
      }
      if (this.userId === null) {
        console.log(this.userId);
        this.imageUrl = 'https://www.kevin0825.xyz/wp-content/uploads/2020/07/吃豆人2.png';
      }
    },
  },
  mounted() {
    this.getId();
  },
};
</script>

<style>
.avatar {
  margin-top: 20px;
  margin-left: 10px;
}
.fun {
  background-color: rgb(250, 250, 250);
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px 10px;
}
.ic{
  margin-top:5px;
}
</style>
