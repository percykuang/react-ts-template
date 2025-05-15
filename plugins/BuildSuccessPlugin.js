const chalk = require('chalk');
const WebpackBar = require('webpackbar');

/**
 * 构建成功插件
 * 集成 WebpackBar 显示构建进度，并在生产构建完成后显示成功信息
 */
class BuildSuccessPlugin {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        name: 'React TypeScript',
        color: '#61dafb', // React 蓝色
      },
      options
    );

    // 创建 WebpackBar 实例
    this.webpackBar = new WebpackBar({
      name: this.options.name,
      color: this.options.color,
      reporters: ['fancy'],
      profile: this.options.profile,
    });
  }

  apply(compiler) {
    // 应用 WebpackBar
    this.webpackBar.apply(compiler);

    // 构建完成后显示成功信息
    compiler.hooks.done.tap('BuildSuccessPlugin', (stats) => {
      if (stats.hasErrors()) {
        return;
      }

      const time = stats.endTime - stats.startTime;
      const outputPath = stats.compilation.outputOptions.path;

      console.log('\n');
      console.log(chalk.green.bold('✅ 构建成功!'));
      console.log(`📦 ${chalk.cyan(this.options.name)} 已构建完成`);
      console.log(`⏱️  耗时: ${chalk.yellow(time)} ms`);
      console.log(`📂 输出目录: ${chalk.yellow(outputPath)}`);
      console.log('\n');
      console.log(chalk.gray('提示: 构建的文件可以部署到任何静态文件服务器'));
      console.log('\n');
    });
  }
}

module.exports = BuildSuccessPlugin;
