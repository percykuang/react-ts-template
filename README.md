# React TypeScript Template

这是一个使用 React 和 TypeScript 的 Web 应用模板工程，使用 webpack 作为构建工具。

## 特性

- 🚀 React 与 TypeScript
- 📦 Webpack 构建
- 🎨 Less 支持（包括 CSS Module）
- 🔄 热更新
- 📂 绝对导入路径支持
- 💅 Prettier 格式化
- 🧹 ESLint 代码检查
- 🧩 组件化路由系统
- 🔌 API 接口系统
- 📊 Zustand 状态管理
- 🔄 Mock 数据支持
- 📱 响应式设计

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm start
```

这将启动开发服务器，并在浏览器中打开应用。

### 构建生产版本

```bash
pnpm build
```

这将在 `dist` 目录中生成生产版本的应用。构建完成后，控制台会显示构建成功的信息，包括构建时间和输出目录。生成的文件可以部署到任何静态文件服务器上。

### 预览生产版本

```bash
pnpm preview
```

这将启动一个静态文件服务器，用于预览打包后的文件。服务器会在 [http://localhost:9000](http://localhost:9000) 上运行，与开发服务器的端口 3000 进行区分。

> **注意**：在运行 `pnpm preview` 之前，请确保已经运行过 `pnpm build` 命令生成了 `dist` 目录。

### 代码检查

```bash
pnpm lint
```

### 修复代码风格问题

```bash
pnpm lint:fix
```

### 格式化代码

```bash
pnpm format
```

## 项目结构

```
react-typescript-template/
├── public/                 # 静态资源
│   ├── index.html          # HTML 模板
│   └── favicon.ico         # 网站图标
├── src/                    # 源代码
│   ├── apis/               # API 接口定义
│   │   ├── modules/        # API 模块
│   │   ├── createApis.ts   # API 创建工具
│   │   └── types.ts        # API 类型定义
│   ├── components/         # 公共组件
│   │   └── navigation/     # 导航组件
│   ├── http/               # HTTP 请求相关
│   │   ├── axiosInstance.ts # Axios 实例
│   │   └── request.ts      # 请求工具函数
│   ├── mock/               # 模拟数据
│   ├── pages/              # 页面组件
│   │   ├── dashboard/      # 仪表盘页面
│   │   └── home/           # 首页
│   ├── routes/             # 路由配置
│   │   ├── types.ts        # 路由类型定义
│   │   └── utils.tsx       # 路由工具函数
│   ├── store/              # 状态管理
│   ├── styles/             # 全局样式
│   ├── types/              # 类型定义
│   ├── App.tsx             # 主应用组件
│   └── index.tsx           # 入口文件
├── plugins/                # 自定义 Webpack 插件
├── eslint.config.js        # ESLint 配置
├── .gitignore              # Git 忽略文件
├── .prettierrc             # Prettier 配置
├── package.json            # 项目依赖和脚本
├── tsconfig.json           # TypeScript 配置
└── webpack.config.js       # Webpack 配置
```

## 绝对导入路径

项目配置了绝对导入路径，可以使用 `@` 作为 `src` 目录的别名：

```typescript
// 使用绝对路径导入
import HelloWorld from '@/components/HelloWorld';

// 而不是相对路径
import HelloWorld from '../components/HelloWorld';
```

## CSS Module 支持

项目支持 CSS Module，可以通过以下方式使用：

1. 创建一个名为 `*.module.less` 或 `*.module.css` 的样式文件，例如 `Button.module.less`
2. 在组件中导入并使用这些样式

```typescript
// 导入 CSS Module
import styles from './Button.module.less';

// 在组件中使用
const Button = () => (
  <button className={styles.button}>
    点击我
  </button>
);
```

CSS Module 的优势：

- 样式作用域局部化，避免全局样式冲突
- 可以使用熟悉的 CSS 语法
- 支持组合和继承
- 支持 TypeScript 类型检查

## 路由系统

项目使用 React Router 实现路由功能，并采用了组件化的路由配置方式。

### 路由配置

路由配置位于 `src/routes` 目录下，每个路由模块都是一个独立的文件，包含路由的名称、路径、组件和元数据等信息。

```typescript
// src/routes/home.ts
import { lazy } from 'react';

import type { RouteConfig } from './types';

// 使用React.lazy进行代码分割
const Home = lazy(() => import('@/pages/home'));

export default {
  name: '首页',
  path: '/',
  component: Home,
  meta: {
    title: '首页 - React TypeScript模板',
  },
} as RouteConfig;
```

### 路由渲染

路由通过 `RouterConfig` 组件进行渲染，支持嵌套路由和路由元数据。

```typescript
// 在App.tsx中使用
import { RouterConfig } from '@/routes';

const App: React.FC = () => (
  <Router>
    <div>
      <Navigation />
      <main>
        <RouterConfig />
      </main>
    </div>
  </Router>
);
```

## API 接口系统

项目实现了一套类型安全的 API 接口系统，支持模块化管理和类型提示。

### API 模块定义

API 接口按模块组织，每个模块包含多个方法，定义在 `src/apis/modules` 目录下。

```typescript
// src/apis/modules/dashboard/index.ts
import type { ApiModuleConfig } from '@/apis/createApis';
import type { ApiMethod } from '@/apis/types';

import type { BookInfo } from './interface';

export interface DashboardApi {
  // 获取仪表盘数据
  getBooks: ApiMethod<never, never, { books: BookInfo[] }>;
}

const dashboard: ApiModuleConfig<DashboardApi> = {
  getBooks: {
    url: '/dashboard/books',
    method: 'get',
  },
};

export default dashboard;
```

### API 调用方式

API 可以通过 `apis.模块.方法()` 的方式调用，并且提供完整的类型提示。

```typescript
import apis from '@/apis';

// 调用API获取图书列表
const { books } = await apis.dashboard.getBooks();
```

## 状态管理

项目使用 Zustand 作为状态管理库，简单轻量且类型安全。

```typescript
// src/store/dashboard.ts
import { create } from 'zustand';

import apis from '@/apis';

interface DashboardStore {
  loading: boolean;
  books: Book[];
  fetchBooks: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  loading: false,
  books: [],
  fetchBooks: async () => {
    set({ loading: true });
    const { books } = await apis.dashboard.getBooks();
    set({ books, loading: false });
  },
}));
```

## Mock 数据

项目集成了 axios-mock-adapter 用于模拟 API 响应，便于前端开发和测试。

```typescript
// src/mock/index.ts
import MockAdapter from 'axios-mock-adapter';

import { axiosInstance } from '@/http';

const mock = new MockAdapter(axiosInstance as any, { delayResponse: 1000 });

mock.onGet('/api/dashboard/books').reply(() => [
  200,
  {
    code: 0,
    data: {
      books: [
        // 模拟数据
      ],
    },
    message: 'success',
  },
]);
```

> **注意**：Mock 路径必须包含 axios 实例中配置的 baseURL。例如，如果 axios 实例的 baseURL 是 `/api`，那么 mock 路径应该是 `/api/dashboard/books` 而不是 `/dashboard/books`。

## 导入排序

项目使用 @trivago/prettier-plugin-sort-imports 插件自动对导入语句进行排序，遵循以下顺序：

1. 外部库导入
2. 绝对路径导入（@/）
3. 相对路径导入（./）

每组导入之间会自动添加空行，使代码更加整洁。

## 编辑器集成

本项目已配置为与常见的代码编辑器集成，以提供实时的ESLint错误检测和自动格式化功能。

### VS Code

如果您使用VS Code，项目已包含`.vscode/settings.json`文件，配置了以下功能：

1. 保存时自动格式化代码
2. 保存时自动修复ESLint错误
3. 实时显示ESLint错误和警告

要充分利用这些功能，请安装以下VS Code扩展：

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)

### 其他编辑器

对于其他编辑器（如WebStorm、Sublime Text等），请参考各自的文档来配置ESLint和Prettier集成。大多数现代编辑器都支持这些工具的插件或扩展。

### 实时检查

您可以使用以下命令在终端中启动ESLint的实时检查模式：

```bash
pnpm lint:watch
```

这将在您修改文件时自动运行ESLint检查。
