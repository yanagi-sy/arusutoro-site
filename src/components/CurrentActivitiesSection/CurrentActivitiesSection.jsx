/**
 * CurrentActivitiesSection（現在の公演・イベントセクション）
 *
 * トップページの公演スライダーを表示します。
 * データ取得は useActivities、表示はスライド状態のみコンポーネントで保持します。
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActivities } from '../../hooks/useActivities'
import styles from './CurrentActivitiesSection.module.css'

function CurrentActivitiesSection() {
  const navigate = useNavigate()
  const allActivities = useActivities()
  const currentActivities = allActivities
    .filter((activity) => activity.status === 'active')
    .map((activity) => ({
      id: activity.id,
      imageUrl: activity.image ?? 'https://via.placeholder.com/800x500?text=公演画像',
      title: activity.title,
      date: activity.period,
      link: `/activities/${activity.id}`
    }))

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === currentActivities.length - 1 ? 0 : prev + 1
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [currentActivities.length])

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? currentActivities.length - 1 : prev - 1
    )
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === currentActivities.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section className={styles.currentActivities}>
      <div className={styles.currentActivitiesSlider}>
        <button
          className={`${styles.currentActivitiesArrow} ${styles.currentActivitiesArrowLeft}`}
          onClick={goToPreviousSlide}
          aria-label="前のスライド"
        >
          ‹
        </button>

        <div className={styles.currentActivitiesSlidesContainer}>
          {currentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`${styles.currentActivitySlide} ${index === currentSlide ? styles.active : ''}`}
            >
              <div className={styles.currentActivityVisual}>
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className={styles.currentActivityImg}
                />
              </div>

              <div className={styles.currentActivityInfo}>
                <h3 className={styles.currentActivityTitle}>{activity.title}</h3>
                <p className={styles.currentActivityDate}>{activity.date}</p>

                <div className={styles.currentActivityButtons}>
                  <button
                    type="button"
                    className={styles.currentActivityDetailBtn}
                    onClick={() => navigate(activity.link)}
                  >
                    詳細
                  </button>
                  <button
                    type="button"
                    className={styles.currentActivityReserveBtn}
                    onClick={() => navigate(`/reserve/${activity.id}`)}
                  >
                    予約
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.currentActivitiesArrow} ${styles.currentActivitiesArrowRight}`}
          onClick={goToNextSlide}
          aria-label="次のスライド"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default CurrentActivitiesSection
