/**
 * 広告スライド用 画像ライブラリ
 * 
 * Firestore/Storage ではなく、public 配下の静的画像を前提とした
 * シンプルな定義です。
 * 
 * 画像ファイルは public/admin-images/ 配下に配置してください。
 */

export const slideImageLibrary = [
  {
    id: 'paper-01',
    label: '和紙テクスチャ 01',
    src: '/admin-images/paper-01.jpg'
  },
  {
    id: 'paper-02',
    label: '和紙テクスチャ 02',
    src: '/admin-images/paper-02.jpg'
  },
  {
    id: 'stage-01',
    label: '舞台イメージ 01',
    src: '/admin-images/stage-01.jpg'
  },
  {
    id: 'stage-02',
    label: '舞台イメージ 02',
    src: '/admin-images/stage-02.jpg'
  },
  {
    id: 'flyer-01',
    label: 'フライヤー風 01',
    src: '/admin-images/flyer-01.jpg'
  },
  {
    id: 'abstract-01',
    label: '抽象イメージ 01',
    src: '/admin-images/abstract-01.jpg'
  }
]

