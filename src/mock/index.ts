import MockAdapter from 'axios-mock-adapter';

import { axiosInstance } from '@/http';

// 创建一个MockAdapter实例，any 是为了解决类型不兼容
const mock = new MockAdapter(axiosInstance as any, { delayResponse: 1000 });

mock.onGet('/api/dashboard/books').reply(() => [
  200,
  {
    code: 0,
    data: {
      books: [
        {
          id: 1,
          title: 'JavaScript 指南',
          price: 19.99,
          poster:
            'https://m.360buyimg.com/babel/jfs/t1/127037/30/30612/107697/641acd08Fa3c618e6/0d15ec32cd733c65.jpg.webp',
          author: 'F. Scott Fitzgerald',
        },
        {
          id: 2,
          title: '架构师修炼之道',
          price: 14.99,
          poster:
            'https://m.360buyimg.com/babel/jfs/t1/54265/20/7589/421571/5d5372a3E845cb56e/e6c86e2616d0c427.jpg.webp',
          author: 'Harper Lee',
        },
        {
          id: 3,
          title: '剑指Offer',
          price: 12.99,
          poster:
            'https://m.360buyimg.com/babel/jfs/t1/156843/7/8531/131050/6018a703Eea9248f1/8812b420a79738e8.jpg.webp',
          author: 'George Orwell',
        },
        {
          id: 4,
          title: '编程规范',
          price: 19.99,
          poster:
            'https://m.360buyimg.com/babel/jfs/t1/279040/24/14531/36867/67ecb2caFef8caf7c/b416864aba929486.jpg',
          author: 'John Doe',
        },
      ],
    },
    message: 'success',
  },
]);
