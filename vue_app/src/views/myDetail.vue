<template>
  <div>
    <van-nav-bar
      title="个人资料"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="infoContainer">
      <div style="margin-top:20px;margin-left:15px;font-size:13px;color:#808080">
        基础信息
      </div>
      <div
        class="cell"
        style="margin-top:20px;"
      >
        <van-cell
          @click="showPopup"
          clickable
          title="头像"
          size="large"
        >
          <template #right-icon>
            <van-image
              round
              width="3rem"
              height="3rem"
              fit="cover"
              :src="imageUrl"
            />
            <div style="color:#808080;font-size:20px;margin-top:5px;margin-left:10px;">
              <van-icon name="arrow" />
            </div>
          </template>
        </van-cell>
        <van-cell
          clickable
          title="用户名"
          size="large"
        >
          <div style="position:absolute;float:left;right:35px;margin-top:3px;">
            {{ userName }}
          </div>
          <div style="color:#808080;font-size:20px;margin-top:5px;margin-left:10px;">
            <van-icon name="arrow" />
          </div>
        </van-cell>
        <van-cell
          clickable
          title="收获地址"
          value="内容"
          size="large"
        >
          <div style="color:#808080;font-size:20px;margin-top:5px;margin-left:10px;">
            <van-icon name="arrow" />
          </div>
        </van-cell>
        <van-cell
          clickable
          size="large"
          @click="getout()"
        >
          <div style="color:#FF0000;font-size:20px;margin-top:5px;margin-left:40%;">
            退出登录
          </div>
        </van-cell>
        <van-divider />
      </div>
    </div>
    <van-popup
      v-model="show"
      style="padding:20px;width:70%;"
    >
      <div style="font-size:20px;">
        上传头像
      </div>
      <div>
        <van-uploader
          name="head"
          :after-read="afterRead"
        >
          <div style="margin-top:25px;color:#808080;">
            从手机相册选择
          </div>
        </van-uploader>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';

Vue.use(Popup);
export default {

  name: 'MyDetail',
  data() {
    return {
      imageUrl: '',
      userName: '',
      userId: '',
      show: false,
      isUpload: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    getout() {
      this.axios.get('api/users/logout').then((res) => console.log(res));
      const flag = false;
      this.$store.commit('login', flag);
      this.$store.commit('setUserName', null);
      this.$store.commit('setUserId', null);
      this.$router.push('/');
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
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.show = false;

      const upf = {
        imgData: file.content.replace(/^data:image\/\w+;base64,/, ''),
        imgName: file.file.name,
        id: this.userId,
      };
      this.axios.post('api/users/avatarUpload', upf).then((res) => {
        console.log(res);
        this.$router.go(0);
      });
    },
  },
  mounted() {
    this.getId();
  },
};
</script>

<style scoped>
[class*="van-hairline"]::after {
  border: white;
}
.van-divider{
    border-color:white;
}
.van-cell{
    line-height: 40px;
}
</style>
