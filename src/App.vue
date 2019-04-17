<style lang="less">
  @import "./style/reset.css";
  @import "./style/base";
</style>
<template>
  <div id="facewall_app">
    <div id="facewall-loader">f</div>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"></router-view>
    <loading></loading>
  </div>
</template>

<script>
  import {Util, Url} from './utils';
  import loading from './components/loading/loading';

  export default {
    name: 'facewall',
    computed: {
    },
    mounted() {
    },
    created() {
    },
    components: {
      loading
    },
    data() {
      return {};
    },
    methods: {
    }
  };
</script>
