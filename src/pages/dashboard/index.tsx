import React, { useEffect, useState } from 'react';

import { useDashboardStore } from '@/store';

import styles from './styles.module.less';

// 图书组件
interface BookProps {
  id: number;
  title: string;
  price: number;
  poster: string;
  author: string;
}

const BookCard: React.FC<BookProps> = ({ title, author, price, poster }) => (
  <div className={styles.bookCard}>
    <div className={styles.bookImageContainer}>
      <img
        src={poster}
        alt={title}
        className={styles.bookImage}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/150x200?text=No+Image';
        }}
      />
    </div>
    <div className={styles.bookInfo}>
      <h3 className={styles.bookTitle}>{title}</h3>
      <p className={styles.bookAuthor}>作者: {author}</p>
      <p className={styles.bookPrice}>¥{price.toFixed(2)}</p>
    </div>
  </div>
);

// 主仪表盘组件
const Dashboard: React.FC = () => {
  const { loading, books, fetchBooks } = useDashboardStore((state) => state);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // 过滤图书
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>图书馆藏</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="搜索书名或作者..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>加载中...</p>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className={styles.booksGrid}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>没有找到符合条件的图书</p>
          {searchTerm && (
            <button className={styles.clearButton} onClick={() => setSearchTerm('')}>
              清除搜索
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
