// Navigationコンポーネント
// 全ページ共通で使えるナビゲーションバー
import './Navigation.css'
// アイコン画像のインポート（後で実際の画像に差し替え可能）
// import iconImage from '../assets/images/icon.png'

function Navigation() {
  // メニュー項目（後で実際のルーティングに変更可能）
  const menuItems = [
    { id: 1, label: '口上', href: '#kujo' },
    { id: 2, label: '演目', href: '#performances' },
    { id: 3, label: '文抗時代', href: '#bunko' },
    { id: 4, label: 'お問い合わせ', href: '#contact' }
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* 左側：ロゴ（アイコン＋劇団名） */}
        <div className="nav-logo">
          {/* アイコン画像（仮パス - 実際の画像に差し替え可能） */}
          {/* <img src={iconImage} alt="劇団ロゴ" className="logo-icon" /> */}
          <div className="logo-icon-placeholder">劇</div>
          {/* 劇団名 */}
          <span className="logo-text">劇団 或素翔鷲</span>
        </div>

        {/* 右側：メニュー項目 */}
        <ul className="nav-menu">
          {/* mapを使ってメニュー項目を生成 */}
          {menuItems.map((item) => (
            <li key={item.id} className="nav-menu-item">
              <a href={item.href} className="nav-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

