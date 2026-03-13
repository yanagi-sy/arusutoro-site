/**
 * Navigationコンポーネント（ヘッダーナビゲーション）
 * 
 * 全ページ共通で使用されるナビゲーションバーです。
 * スティッキーヘッダーとして実装されており、ページをスクロールしても
 * 常に画面上部に固定表示されます。
 * 
 * 【主な機能】
 * - 劇団名の表示（左側）
 * - メニュー項目の表示（右側）
 * - ページ間のナビゲーション（react-router-domのLinkを使用）
 * 
 * 【スタイル】
 * - 背景色: 暗い赤系（#abc9bf）
 * - 文字色: 白
 * - 固定表示: position: fixed（常に画面上部に表示）
 */

// react-router-domのLinkコンポーネントをインポート
// Link: ページ遷移をスムーズに行うためのコンポーネント（通常の<a>タグの代替）
import { Link } from 'react-router-dom'
// Reactのフックをインポート
import { useState } from 'react'
// Navigationコンポーネント用のスタイルを読み込み
import styles from './Navigation.module.css'

/**
 * Navigationコンポーネント
 * 
 * @returns {JSX.Element} ナビゲーションバーのJSX
 */
function Navigation() {
  // メニューの開閉状態を管理するstate
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * メニューの開閉を切り替える関数
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  /**
   * メニューを閉じる関数（リンククリック時に使用）
   */
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  /**
   * メニュー項目のデータ配列
   * 
   * 各メニュー項目の情報をオブジェクトとして定義しています。
   * 後からメニュー項目を追加・変更する際は、この配列を編集するだけでOKです。
   * 
   * @type {Array<Object>}
   * @property {number} id - メニュー項目の一意のID
   * @property {string} label - メニューに表示するテキスト
   * @property {string} href - リンク先のURLパス
   */
  const menuItems = [
    { id: 1, label: 'トップ', href: '/' },
    { id: 2, label: '劇団紹介', href: '/about' },
    { id: 3, label: '公演 / イベント', href: '/activities' },
    { id: 4, label: 'お問い合わせ', href: '/contact' }
  ]

  return (
    // nav要素: ナビゲーションを意味するHTMLセマンティック要素
    <nav className={styles.navigation}>
      {/* nav-container: ナビゲーションの内容を中央に配置するためのコンテナ */}
      <div className={styles.navContainer}>
        {/* 左側：劇団名の表示エリア（クリック不可、表示のみ） */}
        <div className={styles.navLogoText}>
          <div className={styles.navLogoTextWrapper}>
            <span className={styles.navLogoTextRuby}>げきだん あるすとろ</span>
            <span className={styles.navLogoTextLabel}>劇團 或素翔鷺</span>
          </div>
        </div>

        {/* ハンバーガーボタン（モバイルのみ表示） */}
        <button 
          className={`${styles.navHamburger} ${isMenuOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
          aria-label="メニューを開閉"
        >
          <span className={styles.navHamburgerLine}></span>
          <span className={styles.navHamburgerLine}></span>
          <span className={styles.navHamburgerLine}></span>
        </button>

        {/* 右側：メニュー項目のリスト */}
        {/* モバイルでメニューが開いているときは active クラスを付与 */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          {/* 
            mapメソッド: 配列の各要素を順番に処理して、JSX要素の配列を生成
            menuItems配列の各項目に対して、メニュー項目の<li>要素を作成
          */}
          {menuItems.map((item, index) => (
            <li key={item.id} className={styles.navMenuItem}>
              {/* 
                区切り線: 最初の項目以外の前に縦の区切り線を表示
                デスクトップ表示時のみ有効（CSSで制御）
              */}
              {index > 0 && <span className={styles.navMenuDivider}></span>}
              
              {/* 
                条件分岐: リンクの種類によって使用するコンポーネントを切り替え
                - 外部リンク（http://で始まる）またはアンカーリンク（#で始まる）: 通常の<a>タグ
                - 内部リンク（それ以外）: react-router-domのLinkコンポーネント
              */}
              {item.href.startsWith('http') || item.href.startsWith('#') ? (
                // 外部リンク用の<a>タグ
                <a href={item.href} className={styles.navLink} onClick={closeMenu}>
                  {item.label}
                </a>
              ) : (
                // 内部リンク用のLinkコンポーネント（ページ遷移がスムーズ）
                <Link to={item.href} className={styles.navLink} onClick={closeMenu}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// Navigationコンポーネントを他のファイルで使用できるようにエクスポート
export default Navigation

