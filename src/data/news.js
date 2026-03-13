/**
 * お知らせデータ（ダミーデータ）
 * 
 * このファイルは、Firestoreの想定構造と同じ形のデータを提供します。
 * 後からFirebaseに差し替える際は、このデータ構造を維持してください。
 * 
 * 【Firestore想定構造】
 * - collection: 'news'
 * - document: { id, date, title, tag, link, ... }
 */

/**
 * お知らせデータの配列
 * 
 * 後からFirebaseから取得するように変更する予定です。
 * データ構造は変更しないでください。
 */
export const news = [
  {
    id: 1,
    date: '2025.04.01',
    title: '新作公演「月下の舞」上演決定',
    tag: '公演',
    link: '/activities/1'
  },
  {
    id: 2,
    date: '2025.03.20',
    title: 'ワークショップ「身体と言葉」開催',
    tag: 'イベント',
    link: '/activities/3'
  },
  {
    id: 3,
    date: '2025.03.10',
    title: 'メンバー募集のお知らせ',
    tag: '募集',
    link: '/contact'
  },
  {
    id: 4,
    date: '2025.02.28',
    title: '外部イベント参加のお知らせ',
    tag: '外部',
    link: '/activities'
  },
  {
    id: 5,
    date: '2025.02.15',
    title: '公演「風の記憶」再演決定',
    tag: '公演',
    link: '/activities/2'
  }
]

/**
 * すべてのお知らせを取得する関数
 * 
 * 後からFirebaseのgetDocsに差し替える予定です。
 */
export const getAllNews = () => {
  return news
}

