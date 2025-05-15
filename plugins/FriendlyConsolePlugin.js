const os = require('os');
const chalk = require('chalk');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

// 获取所有可用的局域网 IP 地址
function getAllLocalIPs() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          name: name,
          address: iface.address,
        });
      }
    }
  }

  return addresses;
}

/**
 * 增强的进度插件，结合了 WebpackBar 和 FriendlyErrorsWebpackPlugin
 */
class EnhancedProgressPlugin {
  /**
   * @param {Object} options - 插件选项
   * @param {string} options.name - 项目名称
   * @param {string} options.color - 进度条颜色
   * @param {number} options.port - 开发服务器端口
   * @param {boolean} options.profile - 是否显示详细性能信息
   * @param {boolean} options.clearConsole - 是否清空控制台
   */
  constructor(options = {}) {
    this.options = Object.assign(
      {
        name: 'React TypeScript',
        color: '#61dafb', // React 蓝色
        port: 3000,
        profile: false,
        clearConsole: false,
      },
      options
    );

    // 创建内部插件实例
    this.webpackBar = new WebpackBar({
      name: this.options.name,
      color: this.options.color,
      reporters: ['fancy'],
      profile: this.options.profile,
    });

    // 获取 IP 地址
    this.localIPs = getAllLocalIPs();

    // 构建消息
    const messages = this.buildMessages();

    this.friendlyErrors = new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: messages,
        notes: [
          chalk.gray('提示: 在移动设备上访问时，确保设备与电脑在同一网络中'),
          chalk.gray('按 Ctrl+C 停止服务器'),
        ],
      },
      clearConsole: this.options.clearConsole,
      quiet: true,
      logLevel: 'warn',
    });
  }

  /**
   * 构建带颜色的消息数组
   * @returns {string[]} 消息数组
   */
  buildMessages() {
    const { port } = this.options;

    // 构建带颜色的消息数组
    const messages = [
      chalk.green.bold('✅ 服务运行成功!'),
      `🖥  ${chalk.cyan.underline(`http://localhost:${port}`)}`,
    ];

    // 添加所有局域网 IP 地址
    this.localIPs.forEach((ip) => {
      messages.push(`🌐 ${chalk.cyan.underline(`http://${ip.address}:${port}`)}`);
    });

    return messages;
  }

  /**
   * 应用插件
   * @param {Object} compiler - Webpack 编译器实例
   */
  apply(compiler) {
    // 应用内部插件
    this.webpackBar.apply(compiler);
    this.friendlyErrors.apply(compiler);
  }
}

module.exports = EnhancedProgressPlugin;
