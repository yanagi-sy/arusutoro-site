// PerformancesSectionコンポーネント
// 演目（公演一覧）セクション（カード形式のグリッドレイアウト）
// 将来、配列データやDBに差し替えやすい構造にする
import { useEffect, useMemo, useState } from 'react'
// React RouterのuseNavigateをインポート（画面遷移用）
import { useNavigate } from 'react-router-dom'
import styles from './PerformancesSection.module.css'

// 画像ファイルをインポート（src/assets/images 配下の実在する画像を使用）
import headerImage from '../../assets/images/header.jpg'
import bunkouImage1 from '../../assets/images/bunkoujidai-1.png'
import bunkouImage2 from '../../assets/images/bunkoujidai-2.png'

/**
 * 公演 / イベント セクション
 * - 1件: 固定カード（自動切替なし、矢印なし）
 * - 2件以上: 3秒ごとに自動スライド、矢印あり、最後→最初へループ
 * - データは配列で管理し、差し替えやすい構造
 */
function PerformancesSection() {
  // useNavigateフックを使用して画面遷移機能を取得
  const navigate = useNavigate()
  
  /**
   * 詳細ボタンのクリックハンドラ
   * /activities/:activityId に遷移する
   */
  const handleDetailClick = (activityId) => {
    navigate(`/activities/${activityId}`)
  }
  
  /**
   * 予約ボタンのクリックハンドラ
   * /reserve/:activityId に遷移する
   */
  const handleReserveClick = (activityId) => {
    navigate(`/reserve/${activityId}`)
  }
  
  /**
   * 公演データ（差し替えやすいよう配列で管理）
   * 初心者向けコメント：
   * - ここにオブジェクトを追加・削除するだけでカードが増減します
   * - imageSrc は宣伝画像のパス（実在する画像ファイルをimportで読み込む）
   */
  const performances = useMemo(
    () => [
      {
        id: 1,
        title: '月下の舞',
        date: '2025年4月15日〜20日',
        synopsis:
          '静寂の中に響く言葉の断片。月明かりに浮かぶ身体の軌跡が、時間を超えた物語を紡ぐ。',
        detailUrl: '#performance-1',
        reserveUrl: '#reserve-1',
        imageSrc: headerImage
      },
      {
        id: 2,
        title: '風の記憶',
        date: '2025年6月10日〜15日',
        synopsis:
          '失われた記憶の断片を拾い集めながら、身体と声が織りなす瞬間の詩。',
        detailUrl: '#performance-2',
        reserveUrl: '#reserve-2',
        imageSrc: bunkouImage1
      },
      {
        id: 3,
        title: '沈黙の向こう',
        date: '2025年8月5日〜10日',
        synopsis:
          '言葉にならない想いが、空間に刻まれる。静寂と緊張のあわいに生まれる刹那の像。',
        detailUrl: '#performance-3',
        reserveUrl: '#reserve-3',
        imageSrc: bunkouImage2
      }
    ],
    []
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const hasMultiple = performances.length > 1

  // 3秒ごとに自動切替（2件以上のみ）
  useEffect(() => {
    if (!hasMultiple) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % performances.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [hasMultiple, performances.length])

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? performances.length - 1 : prev - 1
    )
  }

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % performances.length)
  }

  const current = performances[currentIndex]

  return (
    <section className={styles.performances}>
      <div className={styles.performancesContainer}>
        <h2 className={styles.performancesTitle}>演目 - Performances -</h2>

        {/* スライダー外枠：1画面1カード */}
        <div className={styles.performancesSlider}>
          {/* 画像部分 */}
          <div className={styles.performanceImageFrame}>
            <div className={styles.performanceImageCover}>
              <img
                src={current.imageSrc}
                alt={`${current.title} の宣伝画像`}
                className={styles.performanceImage}
              />
            </div>
          </div>

          {/* テキストカード部分 */}
          <div className={styles.performanceCard}>
            <h3 className={styles.cardTitle}>{current.title}</h3>
            <div className={styles.cardDate}>{current.date}</div>
            <p className={styles.cardSynopsis}>{current.synopsis}</p>

            <div className={styles.cardActions}>
              <button 
                type="button"
                className={`${styles.cardBtn} ${styles.detailBtn}`}
                onClick={() => handleDetailClick(current.id)}
              >
                詳細
              </button>
              <button 
                type="button"
                className={`${styles.cardBtn} ${styles.reserveBtn}`}
                onClick={() => handleReserveClick(current.id)}
              >
                予約
              </button>
            </div>
          </div>

          {/* 矢印（2件以上のみ表示） */}
          {hasMultiple && (
            <>
              <button
                className={`${styles.navArrow} ${styles.navArrowLeft}`}
                onClick={showPrev}
                aria-label="前の公演へ"
              >
                ‹
              </button>
              <button
                className={`${styles.navArrow} ${styles.navArrowRight}`}
                onClick={showNext}
                aria-label="次の公演へ"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* インジケータ（2件以上のみ） */}
        {hasMultiple && (
          <div className={styles.sliderDots}>
            {performances.map((item, index) => (
              <button
                key={item.id}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`${item.title} に移動`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PerformancesSection

