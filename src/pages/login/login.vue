<template>
  <!--404页面-->
  <div :style="{backgroundColor: backgroundColor}" class="flex-column-start container">
    <div class="title">FaceWall</div>
    <div class="flex-row-center account">
      <span class="flex-row-center icon">账号</span>
      <input type="text" placeholder="account" v-model.lazy="account">
      <span v-if="showAccountTip" class="tip">用户名必须是5-20个以字母开头包括字母数字下划线的字符串</span>
    </div>
    <div class="flex-row-center password">
      <span class="flex-row-center icon">密码</span>
      <input type="password" placeholder="password" v-model.lazy="password">
      <span v-if="showPasswordTip" class="tip">密码必须是6-18大小写字母和数字的组合</span>
    </div>
    <div class="submit" @click.stop="handleSubmit">登录</div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  import config from '../../config';
  import {Util} from '../../utils';

  export default {
    name: 'login',
    data() {
      return {
        backgroundColor: config.style.background,
        showAccountTip: false,
        showPasswordTip: false,
        account: '',
        password: ''
      };
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
      ...mapActions(['setLoginStatus']),
      handleSubmit() {
        this.showAccountTip = !Util.validateName(this.account);
        this.showPasswordTip = !Util.validatePassword(this.password);
        if (this.showAccountTip || this.showPasswordTip) {return;}
        this.setLoginStatus(true);
        this.$router.push({
          path: this.$route.query.targetUrl || '/'
        });
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../style/_variable";
  .container {
    height: 100vh;
    overflow: hidden;
    color: #fff;
    padding-top: 2rem;
    .title {
      font-size: 2rem;
      margin-bottom: 40px;
      color: #333;
      font-weight: bold;
    }
    .account, .password, .submit {
      width: 7rem;
      height: .8rem;
      border-radius: 5px;
    }
    .account, .password {
      margin-bottom: .7rem;
      position: relative;
      .tip {
        position: absolute;
        bottom: -20px;
        left: 0;
        color: #f00;
        font-size: 12px;
      }
    }
    .account input, .password input {
      display: block;
      flex: auto;
      height: .8rem;
      border: none;
      font-size: .25rem;
      position: relative;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      outline: none;
      text-indent: 5px;
    }
    .flex-row-center {
      .icon {
        display: inline-flex;
        height: 100%;
        width: 60px;
        background-color: rgb(250, 255, 189) !important;;
        font-size: .3rem;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        color: #333;
      }
    }
    .submit {
      font-size: .3rem;
      text-align: center;
      line-height: .8rem;
      background-color: #333;
    }
  }
</style>
