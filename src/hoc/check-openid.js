import {mapActions, mapGetters} from 'vuex';

import {Util, getWXUserInfo} from '../utils';

/**
 * 校验 openId 是否为 null
 */
export default (component) => ({
  computed: {
    ...mapGetters(['openId'])
  },
  props: component.props,
  render(h) {
    return h(component, {
      on: this.$listeners,
      attrs: this.$attrs,
      props: this.$props
    });
  },
  mounted() {
    this.requestOpenId();
  },
  beforeDestroy() {
    this.clearOpenIdTimer();
  },
  methods: {
    ...mapActions(['setLoading']),
    fetchUserInfo() {
      if (this.openId || this.intervalTimer != null) {
        this.clearOpenIdTimer();
        return;
      }
      getWXUserInfo({routePath: location.hash});
    },
    requestOpenId() {
      if (this.openId) {return;}
      this.$toast('获取信息中···');
      this.fetchUserInfo();
      this.intervalTimer = setInterval(this.fetchUserInfo, 5000);
    },
    clearOpenIdTimer() {
      this.intervalTimer != null && clearInterval(this.intervalTimer);
    }
  }
});
