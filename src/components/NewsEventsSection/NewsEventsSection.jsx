/**
 * NewsEventsSection（お知らせセクション）
 *
 * トップページのお知らせ一覧を表示します。
 * データ取得は useNews に委譲しています。
 */

import { Link } from 'react-router-dom'
import { useNews } from '../../hooks/useNews'
import styles from './NewsEventsSection.module.css'

function NewsEventsSection() {
  const newsEvents = useNews()

  return (
    <section className={styles.newsEvents}>
      <div className={styles.newsEventsContainer}>
        <div className={styles.newsEventsLabel}>NEWS</div>
        <h2 className={styles.newsEventsTitle}>お知らせ</h2>

        <div className={styles.newsEventsList}>
          {newsEvents.map((item, index) => (
            <div key={item.id}>
              <Link to={item.link} className={styles.newsEventsItem}>
                <span className={styles.newsEventsDate}>{item.date}</span>
                <span className={styles.newsEventsTag}>{item.tag}</span>
                <span className={styles.newsEventsItemTitle}>{item.title}</span>
              </Link>
              {index < newsEvents.length - 1 && (
                <div className={styles.newsEventsDivider} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsEventsSection
