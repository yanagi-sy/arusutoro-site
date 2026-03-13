/**
 * 公演・イベントデータ（ダミーデータ）
 * 
 * このファイルは、Firestoreの想定構造と同じ形のデータを提供します。
 * 後からFirebaseに差し替える際は、このデータ構造を維持してください。
 * 
 * 【Firestore想定構造】
 * - collection: 'activities'
 * - document: { id, title, type, status, startDate, endDate, ... }
 * 
 * 【statusの値】
 * - 'active': 予約受付中（通常）
 * - 'coming_soon': 近日公開
 * - 'ended': 終了
 */

// 画像ファイルをインポート（既存の画像を使用）
import headerImage from '../assets/images/header.jpg'
import bunkouImage1 from '../assets/images/bunkoujidai-1.png'
import bunkouImage2 from '../assets/images/bunkoujidai-2.png'

/**
 * 公演・イベントデータの配列
 * 
 * 後からFirebaseから取得するように変更する予定です。
 * データ構造は変更しないでください。
 */
export const activities = [
  {
    id: 1,
    title: '新作公演「月下の舞」',
    type: '公演',
    status: 'active', // 'active' | 'coming_soon' | 'ended'
    startDate: '2025-04-15',
    endDate: '2025-04-20',
    period: '2025.04.15 〜 2025.04.20',
    venue: '劇場A メインホール',
    description: '静寂の中に響く言葉の断片。月明かりに浮かぶ身体の軌跡が、時間を超えた物語を紡ぐ。',
    image: headerImage,
    cast: ['役者A', '役者B', '役者C'],
    staff: ['演出：演出家X', '脚本：脚本家Y', '美術：美術家Z'],
    // 開催回データ（日付・時間帯）
    performances: [
      {
        id: 'perf-1-1',
        date: '2025-04-15',
        time: '19:00',
        capacity: 100,
        reserved: 45
      },
      {
        id: 'perf-1-2',
        date: '2025-04-16',
        time: '14:00',
        capacity: 100,
        reserved: 30
      },
      {
        id: 'perf-1-3',
        date: '2025-04-16',
        time: '19:00',
        capacity: 100,
        reserved: 60
      },
      {
        id: 'perf-1-4',
        date: '2025-04-17',
        time: '19:00',
        capacity: 100,
        reserved: 80
      }
    ]
  },
  {
    id: 2,
    title: '公演「風の記憶」再演',
    type: '公演',
    status: 'coming_soon', // 近日公開
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    period: '2025.06.10 〜 2025.06.15',
    venue: '劇場B 小ホール',
    description: '失われた記憶の断片を拾い集めながら、身体と声が織りなす瞬間の詩。',
    image: bunkouImage1,
    cast: ['役者D', '役者E'],
    staff: ['演出：演出家W', '脚本：脚本家V'],
    performances: [
      {
        id: 'perf-2-1',
        date: '2025-06-10',
        time: '19:00',
        capacity: 50,
        reserved: 0
      },
      {
        id: 'perf-2-2',
        date: '2025-06-11',
        time: '19:00',
        capacity: 50,
        reserved: 0
      }
    ]
  },
  {
    id: 3,
    title: 'イベント「身体と言葉のあわい」',
    type: 'イベント',
    status: 'active',
    startDate: '2025-07-05',
    endDate: '2025-07-05',
    period: '2025.07.05',
    venue: 'イベントスペースC',
    description: '身体表現とテキストの関係を探る小規模イベント。トークと短編上演を予定。',
    image: bunkouImage2,
    cast: ['ゲスト講師A', 'ゲスト講師B'],
    staff: ['企画：企画者X'],
    performances: [
      {
        id: 'perf-3-1',
        date: '2025-07-05',
        time: '14:00',
        capacity: 30,
        reserved: 15
      }
    ]
  },
  {
    id: 4,
    title: '公演「過去の記憶」',
    type: '公演',
    status: 'ended', // 終了
    startDate: '2025-02-10',
    endDate: '2025-02-15',
    period: '2025.02.10 〜 2025.02.15',
    venue: '劇場C',
    description: '過去に上演された公演の記録です。',
    image: headerImage,
    cast: ['役者F', '役者G'],
    staff: ['演出：演出家Z'],
    performances: []
  }
]

/**
 * IDで公演・イベントを取得する関数
 * 
 * 後からFirebaseのgetDocに差し替える予定です。
 */
export const getActivityById = (id) => {
  return activities.find(activity => activity.id === Number(id))
}

/**
 * すべての公演・イベントを取得する関数
 * 
 * 後からFirebaseのgetDocsに差し替える予定です。
 */
export const getAllActivities = () => {
  return activities
}

