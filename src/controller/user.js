const Base = require('./base.js');
const md5 = require('js-md5');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async loginAction() {
    // 如果是POST过来登录信息
    if (this.isPost) {
      const name = this.post('name');
      const password = md5(this.post('password'));

      const data = await this.model('user').where({ name: name, password: password }).find();
      // 用户名、密码不正确，返回错误信息
      if (think.isEmpty(data)) {
        this.assign('error', '用户名或密码错误');
        return this.display();
      } else { // 用户名、密码正确，设置session，跳转到index页面
        await this.session('userinfo', data);
        return this.redirect('/index/index');
      }
    }
    return this.display();
  }
};
