/**
 * CurrentActivitiesSectionコンポーネント（現在の公演・イベントセクション）
 * 
 * トップページに表示される、現在の公演・イベントを紹介するセクションです。
 * 広告スライダー形式で、1画面に1カードを表示し、3秒ごとに自動で次のカードに切り替えます。
 * 
 * 【主な機能】
 * - 現在の公演・イベントの一覧表示
 * - 1画面に1カード表示
 * - 3秒ごとに自動で次のカードに切り替え
 * - 最後のカードの次は最初に戻る（ループ）
 * - 左右の矢印ボタンで手動操作可能
 * 
 * 【データ構造】
 * - 現在は仮データ（配列）で管理
 * - 将来的にFirebaseなどのデータベースに差し替え可能な構造
 * 
 * 【デザイン】
 * - 広告スライダー形式
 * - カード内容：宣伝画像、詳細ボタン、予約ボタン
 */

// useState: コンポーネントの状態を管理するためのフック
import { useState, useEffect } from 'react'
// CurrentActivitiesSectionコンポーネント用のスタイルを読み込み
import './CurrentActivitiesSection.css'

/**
 * CurrentActivitiesSectionコンポーネント
 * 
 * @returns {JSX.Element} 現在の公演・イベントセクションのJSX
 */
function CurrentActivitiesSection() {
  /**
   * 現在の公演・イベントデータの配列
   * 
   * 現在は仮データとして配列で管理しています。
   * 将来的にFirebaseなどのデータベースから取得するように変更可能です。
   * 
   * @type {Array<Object>}
   * @property {number} id - 公演・イベントの一意のID
   * @property {string} imageUrl - 画像のURL（宣伝画像、メインビジュアル）
   * @property {string} title - 公演/イベント名
   * @property {string} date - 開催日程
   * @property {string} link - 詳細ページへのリンク先URLパス
   */
  const currentActivities = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/800x500?text=公演画像', // 仮画像URL、後で実際の画像に差し替え
      title: '新作公演「月下の舞」',
      date: '2025年4月15日（火）〜 4月20日（日）',
      link: '/activities'
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/800x500?text=イベント画像', // 仮画像URL
      title: 'ワークショップ「身体と言葉」',
      date: '2025年6月10日（土）14:00〜17:00',
      link: '/activities'
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/800x500?text=公演画像2', // 仮画像URL
      title: '公演「風の記憶」',
      date: '2025年8月5日（火）〜 8月10日（日）',
      link: '/activities'
    }
  ]

  /**
   * 現在表示中のスライドのインデックス（0から始まる）
   * 
   * useState: Reactのフック（状態管理）
   * - currentSlide: 現在のスライドインデックス（状態の値）
   * - setCurrentSlide: スライドインデックスを変更する関数
   * - 初期値: 0（最初のスライドを表示）
   */
  const [currentSlide, setCurrentSlide] = useState(0)

  /**
   * 3秒ごとに自動で次のスライドに切り替える処理
   * 
   * useEffect: コンポーネントのライフサイクルに応じて処理を実行するフック
   * - 第1引数: 実行する処理（関数）
   * - 第2引数: 依存配列（この値が変更されたときに処理を再実行）
   * 
   * 処理内容:
   * 1. setIntervalで3秒ごとに次のスライドに移動
   * 2. クリーンアップ関数でsetIntervalをクリア（メモリリーク防止）
   */
  useEffect(() => {
    // 3秒ごとに実行されるタイマーを設定
    const interval = setInterval(() => {
      // 次のスライドのインデックスを計算
      // currentSlide + 1 が配列の長さを超えた場合、0に戻す（ループ）
      setCurrentSlide((prevSlide) => 
        prevSlide === currentActivities.length - 1 ? 0 : prevSlide + 1
      )
    }, 3000) // 3000ミリ秒 = 3秒

    // クリーンアップ関数: コンポーネントがアンマウントされるか、依存配列が変更されたときに実行
    return () => {
      clearInterval(interval) // タイマーをクリア（メモリリーク防止）
    }
  }, [currentActivities.length, currentSlide]) // currentActivities.lengthとcurrentSlideが変更されたときに再実行

  /**
   * 前のスライドに移動する関数
   * 
   * ボタンクリック時に呼び出されます。
   * currentSlideが0の場合、最後のスライドに移動（ループ）
   */
  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? currentActivities.length - 1 : prevSlide - 1
    )
  }

  /**
   * 次のスライドに移動する関数
   * 
   * ボタンクリック時に呼び出されます。
   * currentSlideが最後の場合、最初のスライドに移動（ループ）
   */
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === currentActivities.length - 1 ? 0 : prevSlide + 1
    )
  }

  return (
    // section要素: セクションを意味するHTMLセマンティック要素
    <section className="current-activities">
      {/* スライダーコンテナ */}
      <div className="current-activities-slider">
        {/* 左矢印ボタン（前のスライドに移動） */}
        <button 
          className="current-activities-arrow current-activities-arrow-left"
          onClick={goToPreviousSlide}
          aria-label="前のスライド"
        >
          {/* 左矢印のアイコン（シンプルな文字「‹」を使用） */}
          ‹
        </button>

        {/* スライド表示エリア */}
        <div className="current-activities-slides-container">
          {/* 
            mapメソッド: currentActivities配列の各要素を順番に処理して、スライドのJSXを生成
            
            index === currentSlide の場合のみ表示（1画面に1カード表示）
            classNameに条件付きで 'active' クラスを追加して、表示/非表示を制御
          */}
          {currentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`current-activity-slide ${index === currentSlide ? 'active' : ''}`}
            >
              {/* 宣伝画像（メインビジュアル） */}
              <div className="current-activity-visual">
                <img 
                  src={activity.imageUrl} 
                  alt={activity.title}
                  className="current-activity-img"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 右矢印ボタン（次のスライドに移動） */}
        <button 
          className="current-activities-arrow current-activities-arrow-right"
          onClick={goToNextSlide}
          aria-label="次のスライド"
        >
          {/* 右矢印のアイコン（シンプルな文字「›」を使用） */}
          ›
        </button>
      </div>
    </section>
  )
}

// CurrentActivitiesSectionコンポーネントを他のファイルで使用できるようにエクスポート
export default CurrentActivitiesSection
