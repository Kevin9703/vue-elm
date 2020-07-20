<template>
  <div>
    <div
      class="closeIcon"
      @click="$router.go(-1)"
    >
      <van-icon name="cross" />
    </div>
    <div class="title">
      用户登录
    </div>
    <div class="inputContainer">
      <van-field
        v-model="name"
        placeholder="用户名"
      />
      <van-field
        v-model="pass"
        type="password"
        placeholder="密码"
      />
      <van-divider />
    </div>
    <div style="margin-left:18px;margin-right:18px;">
      <van-button
        type="info"
        @click="login()"
        :loading="isLoading"
      >
        登录
      </van-button>
    </div>
    <div
      class="forget"
      @click="$router.push('/signUp')"
    >
      马上注册
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Input } from 'element-ui';
import { Toast } from 'vant';

Vue.use(Toast);

Vue.use(Input);

export default {
  name: 'Login',
  data() {
    return {
      name: '',
      pass: '',
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.axios
        .post('api/users/login', {
          first_name: this.name,
          last_name: this.pass,
        })
        .then((res) => {
          if (res.data.code === 2) {
            const flag = true;
            this.$store.commit('login', flag);
            this.$store.commit('setUserName', this.name);
            this.$store.commit('setUserId', res.data.id);
            this.isLoading = false;
            this.$router.push('/');
          }
          if (res.data.code === 1) {
            Toast.fail('密码错误');
            this.isLoading = false;
          }
          if (res.data.code === 0) {
            Toast.fail('用户名不存在');
            this.isLoading = false;
          }
        });
    },
  },
};
</script>

<style scoped>
.closeIcon {
  margin-top: 45px;
  margin-left: 20px;
  font-size: 25px;
  font-weight: 20;
}
.title{
    font-size:35px;
    margin-left:20px;
    letter-spacing:1px;
}
.inputContainer{
    margin-top:50px;
    margin-right:20px;
    margin-left:5px;
}
.van-divider {
    border-color: #FFFFFF;
}
.van-cell{
    line-height:50px;
    font-size:18px;
}
.van-button--normal{
    width: 100%;
}
.forget{
    color:#1989fa;
    position: absolute;
    right:20px;
    margin-top:20px;
}
.van-button--info{

}
</style>
