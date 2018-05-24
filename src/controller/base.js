module.exports = class extends think.Controller {
  async __before() {
    // 如果是登陆页面（user_login），直接返回。
    if (this.ctx.controller === 'user' && this.ctx.action === 'login') {
      return;
    }

    // 获取session中的用户信息
    const userinfo = await this.session('userinfo');
    // 用户信息不为空，继续
    if (!think.isEmpty(userinfo)) {
      this.assign('userinfo', userinfo);
    } else { // 用户信息为空，跳转到登陆页面
      return this.redirect('/user/login');
    }
  }
};
