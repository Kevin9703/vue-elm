<template>
  <div>
    <div
      class="closeIcon"
      @click="$router.push('/login')"
    >
      <van-icon name="arrow-left" />
    </div>
    <div class="title">
      用户注册
    </div>
    <div class="inputContainer">
      <van-field
        v-model="name"
        placeholder="用户名"
      />
      <van-field
        v-model="trueName"
        placeholder="真实姓名"
      />
      <van-field
        v-model="pass"
        type="password"
        placeholder="密码"
      />
      <van-field
        v-model="phone"
        placeholder="电话"
      />
      <van-field
        v-model="sex"
        placeholder="性别"
      />
      <van-divider />
    </div>
    <div style="margin-left:18px;margin-right:18px;">
      <van-button
        :loading="isLoading"
        type="info"
        @click="signUp()"
      >
        注册
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Input } from 'element-ui';
import { Dialog, Toast } from 'vant';


Vue.use(Toast);

Vue.use(Input);

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      pass: '',
      trueName: '',
      phone: '',
      sex: '',
      isLoading: false,
    };
  },
  methods: {
    signUp() {
      const aData = new Date();
      const value = `${aData.getFullYear()}-${aData.getMonth() + 1}-${aData.getDate()} ${aData.getHours()}:${aData.getMinutes()}:${aData.getSeconds()}`;
      this.isLoading = true;
      this.axios
        .post('api/users/signup', {
          userName: this.name,
          trueName: this.trueName,
          password: this.pass,
          phone: this.phone,
          sex: this.sex,
          add_time: value,
        })
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 1) {
            Dialog.alert({
              message: '注册成功，快去登陆吧！',
            }).then(() => {
              // on close
              this.$router.push('/login');
            });
          }
          if (res.data.code === 0) {
            Toast.fail('用户名已存在');
            this.isLoading = false;
          }
        });
    },
    time() {
      const aData = new Date();
      console.log(aData);
      const value = `${aData.getFullYear()}-${aData.getMonth() + 1}-${aData.getDate()} ${aData.getHours()}:${aData.getMinutes()}:${aData.getSeconds()}`;
      console.log(value);
    },
  },
};
</script>

<style scoped>
.closeIcon {
  margin-top: 45px;
  margin-left: 15px;
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
