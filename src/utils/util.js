/**
 * 常用工具类封装
 */
export default class Util {
  /**
   * 生成唯一的 key
   */
  static generateRandomKey(len = 6, radix = 36) {
    len = Object.prototype.toString.call(len) === '[object Number]' ? len : 2;
    len = Math.abs(len) || 6;
    radix = radix < 2 ? 2 : radix;
    radix = radix > 36 ? 35 : radix;
    return Math.random().toString(radix).substr(-len);
  }

  /**
   * 校验用户名 只能输入5-20个以字母开头包括字母数字下划线的字符串
   */
  static validateName(name) {
    return name && name.match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/);
  }

  /**
   * 校验密码 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在6-18之间
   */
  static validatePassword(password) {
    return password && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/);
  }

  /**
   * 校验邮箱
   */
  static validateEmail() {
    return email && email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  }

  /**
   * 返回兼容的浏览器
   * @returns {string}
   */
  static browser() {
    let tem;
    const ua = navigator.userAgent;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem) {
        return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem) {
      M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
  }

  /**
   * 生成模拟的 uuid
   */
  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * 设置 document title
   * @param title
   */
  static setDocumentTitle(title) {
    document.title = title && Object.prototype.toString.call(title) === '[object String]' ? title : '';
  }

  /**
   * 返回 兼容的frame
   * @name animationFrame
   * @return {Function}
   */
  static requestAnimationFrame() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) { return setTimeout(callback, 1000 / 60); };
  }

  static cancelAnimationFrame() {
    return window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      clearTimeout;
  }
}
