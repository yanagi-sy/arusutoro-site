/**
 * 管理者ページ用ダミーデータ
 * 
 * 後からFirestoreに差し替えやすい構造でデータを定義します。
 * Firebaseを使わず、すべてJS配列で動作させます。
 */

/**
 * 公演データ
 * 後からFirestore collection: 'activities' に差し替える予定
 */
export const performances = [
  {
    id: 'perf-1',
    title: '新作公演「月下の舞」',
    type: '公演',
    status: 'published', // 'published' | 'draft' | 'ended'
    isReservable: true,
    startDate: '2025-04-15',
    endDate: '2025-04-20',
    venue: '劇場A メインホール',
    description: '静寂の中に響く言葉の断片。月明かりに浮かぶ身体の軌跡が、時間を超えた物語を紡ぐ。',
    cast: ['役者A', '役者B', '役者C'],
    staff: ['演出：演出家X', '脚本：脚本家Y', '美術：美術家Z'],
    createdAt: '2025-01-15T10:00:00',
    updatedAt: '2025-03-01T14:30:00'
  },
  {
    id: 'perf-2',
    title: '公演「風の記憶」再演',
    type: '公演',
    status: 'draft',
    isReservable: false,
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    venue: '劇場B 小ホール',
    description: '失われた記憶の断片を拾い集めながら、身体と声が織りなす瞬間の詩。',
    cast: ['役者D', '役者E'],
    staff: ['演出：演出家W', '脚本：脚本家V'],
    createdAt: '2025-02-10T09:00:00',
    updatedAt: '2025-02-28T16:00:00'
  },
  {
    id: 'perf-3',
    title: 'イベント「身体と言葉のあわい」',
    type: 'イベント',
    status: 'published',
    isReservable: true,
    startDate: '2025-07-05',
    endDate: '2025-07-05',
    venue: 'イベントスペースC',
    description: '身体表現とテキストの関係を探る小規模イベント。トークと短編上演を予定。',
    cast: ['ゲスト講師A', 'ゲスト講師B'],
    staff: ['企画：企画者X'],
    createdAt: '2025-02-20T11:00:00',
    updatedAt: '2025-03-05T10:00:00'
  },
  {
    id: 'perf-4',
    title: '公演「過去の記憶」',
    type: '公演',
    status: 'ended',
    isReservable: false,
    startDate: '2025-02-10',
    endDate: '2025-02-15',
    venue: '劇場C',
    description: '過去に上演された公演の記録です。',
    cast: ['役者F', '役者G'],
    staff: ['演出：演出家Z'],
    createdAt: '2025-01-05T09:00:00',
    updatedAt: '2025-02-20T18:00:00'
  }
]

/**
 * 開催回データ（日付・時間帯）
 * 後からFirestore collection: 'performances' (subcollection of activities) に差し替える予定
 */
export const performanceSessions = [
  // perf-1 の開催回
  { id: 'session-1-1', performanceId: 'perf-1', date: '2025-04-15', time: '19:00', capacity: 100, reserved: 45 },
  { id: 'session-1-2', performanceId: 'perf-1', date: '2025-04-16', time: '14:00', capacity: 100, reserved: 30 },
  { id: 'session-1-3', performanceId: 'perf-1', date: '2025-04-16', time: '19:00', capacity: 100, reserved: 60 },
  { id: 'session-1-4', performanceId: 'perf-1', date: '2025-04-17', time: '19:00', capacity: 100, reserved: 80 },
  // perf-2 の開催回
  { id: 'session-2-1', performanceId: 'perf-2', date: '2025-06-10', time: '19:00', capacity: 50, reserved: 0 },
  { id: 'session-2-2', performanceId: 'perf-2', date: '2025-06-11', time: '19:00', capacity: 50, reserved: 0 },
  // perf-3 の開催回
  { id: 'session-3-1', performanceId: 'perf-3', date: '2025-07-05', time: '14:00', capacity: 30, reserved: 15 }
]

/**
 * お知らせデータ
 * 後からFirestore collection: 'news' に差し替える予定
 */
export const news = [
  {
    id: 'news-1',
    date: '2025-04-01',
    title: '新作公演「月下の舞」上演決定',
    tag: '公演',
    link: '/activities/perf-1',
    isPublished: true,
    createdAt: '2025-03-25T10:00:00',
    updatedAt: '2025-04-01T09:00:00'
  },
  {
    id: 'news-2',
    date: '2025-03-20',
    title: 'ワークショップ「身体と言葉」開催',
    tag: 'イベント',
    link: '/activities/perf-3',
    isPublished: true,
    createdAt: '2025-03-15T14:00:00',
    updatedAt: '2025-03-20T10:00:00'
  },
  {
    id: 'news-3',
    date: '2025-03-10',
    title: 'メンバー募集のお知らせ',
    tag: '募集',
    link: '/contact',
    isPublished: true,
    createdAt: '2025-03-05T11:00:00',
    updatedAt: '2025-03-10T09:00:00'
  },
  {
    id: 'news-4',
    date: '2025-02-28',
    title: '外部イベント参加のお知らせ',
    tag: '外部',
    link: '/activities',
    isPublished: false,
    createdAt: '2025-02-25T15:00:00',
    updatedAt: '2025-02-28T12:00:00'
  },
  {
    id: 'news-5',
    date: '2025-02-15',
    title: '公演「風の記憶」再演決定',
    tag: '公演',
    link: '/activities/perf-2',
    isPublished: true,
    createdAt: '2025-02-10T10:00:00',
    updatedAt: '2025-02-15T09:00:00'
  }
]

/**
 * 広告スライドデータ
 * 後からFirestore collection: 'adSlides' に差し替える予定
 */
export const adSlides = [
  {
    id: 'ad-1',
    title: '新作公演「月下の舞」',
    imageUrl: '/images/ad-slide-1.jpg',
    link: '/activities/perf-1',
    order: 1,
    isActive: true,
    createdAt: '2025-03-01T10:00:00',
    updatedAt: '2025-03-01T10:00:00'
  },
  {
    id: 'ad-2',
    title: '公演「風の記憶」再演',
    imageUrl: '/images/ad-slide-2.jpg',
    link: '/activities/perf-2',
    order: 2,
    isActive: true,
    createdAt: '2025-02-15T14:00:00',
    updatedAt: '2025-02-15T14:00:00'
  },
  {
    id: 'ad-3',
    title: 'イベント「身体と言葉のあわい」',
    imageUrl: '/images/ad-slide-3.jpg',
    link: '/activities/perf-3',
    order: 3,
    isActive: false,
    createdAt: '2025-02-20T11:00:00',
    updatedAt: '2025-03-05T10:00:00'
  }
]

/**
 * 公演データの取得関数（後からFirestoreに差し替え）
 */
export const getAllPerformances = () => {
  return [...performances]
}

/**
 * IDで公演を取得（後からFirestoreに差し替え）
 */
export const getPerformanceById = (id) => {
  return performances.find(p => p.id === id)
}

/**
 * 公演IDに紐づく開催回を取得（後からFirestoreに差し替え）
 */
export const getSessionsByPerformanceId = (performanceId) => {
  return performanceSessions.filter(s => s.performanceId === performanceId)
}

/**
 * お知らせデータの取得関数（後からFirestoreに差し替え）
 */
export const getAllNews = () => {
  return [...news]
}

/**
 * IDでお知らせを取得（後からFirestoreに差し替え）
 */
export const getNewsById = (id) => {
  return news.find(n => n.id === id)
}

/**
 * 広告スライドデータの取得関数（後からFirestoreに差し替え）
 */
export const getAllAdSlides = () => {
  return [...adSlides].sort((a, b) => a.order - b.order)
}

/**
 * IDで広告スライドを取得（後からFirestoreに差し替え）
 */
export const getAdSlideById = (id) => {
  return adSlides.find(a => a.id === id)
}

