/**
 * ContactPageコンポーネント（お問い合わせページ）
 * 
 * お問い合わせフォームを表示するページです。
 * 
 * 【主な機能】
 * - お問い合わせフォームの表示
 * - mailtoを使用したメール送信機能
 * - 送信完了メッセージの表示
 */

// React Hooksをインポート
import { useState } from 'react'

// ContactPageコンポーネント用のスタイルを読み込み
import './ContactPage.css'

/**
 * ContactPageコンポーネント
 * 
 * @returns {JSX.Element} お問い合わせページのJSX
 */
function ContactPage() {
  // 送信完了状態を管理
  const [isSubmitted, setIsSubmitted] = useState(false)

  /**
   * フォーム送信処理
   * 
   * mailtoを使用してメール送信を行います。
   * 
   * @param {Event} e - フォーム送信イベント
   */
  const handleSubmit = (e) => {
    // preventDefault: フォームのデフォルトの送信動作をキャンセル
    e.preventDefault()
    
    // フォームデータを取得
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    
    // 件名を自動設定
    const subject = encodeURIComponent('【お問い合わせ】劇團 或素翔鷺')
    
    // 本文を作成（名前、メールアドレス、お問い合わせ内容を含める）
    const body = encodeURIComponent(
      `お名前: ${name}\n\nメールアドレス: ${email}\n\nお問い合わせ内容:\n${message}`
    )
    
    // mailtoリンクを作成
    const mailtoLink = `mailto:gekidan.alstro@gmail.com?subject=${subject}&body=${body}`
    
    // メールクライアントを開く
    window.location.href = mailtoLink
    
    // 送信完了状態を設定
    setIsSubmitted(true)
    
    // フォームをリセット
    e.target.reset()
  }

  return (
    <div className="contact-page">
      {/* ページヘッダー */}
      <div className="contact-header">
        <h1 className="contact-page-title">お問い合わせ</h1>
        <p className="contact-page-subtitle">ご質問・お問い合わせはこちらから</p>
      </div>

      {/* 問い合わせフォーム */}
      <div className="contact-content">
        {/* 送信完了メッセージ */}
        {isSubmitted && (
          <div className="contact-success-message">
            <p className="contact-success-text">
              お問い合わせありがとうございます。<br />
              メールクライアントが開きますので、内容をご確認の上送信してください。
            </p>
            <button
              type="button"
              className="contact-form-button"
              onClick={() => setIsSubmitted(false)}
            >
              新しいお問い合わせを送信する
            </button>
          </div>
        )}

        {/* 
          form要素: フォームを意味するHTMLセマンティック要素
          onSubmit: フォーム送信時にhandleSubmit関数を実行
        */}
        {!isSubmitted && (
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* お名前入力フィールド */}
            <div className="contact-form-group">
              {/* 
                label要素: 入力フィールドのラベル
                htmlFor: 対応するinput要素のidと紐付け（アクセシビリティ向上）
              */}
              <label htmlFor="name" className="contact-form-label">
                お名前 <span className="contact-form-required">*</span>
              </label>
              {/* 
                input要素: テキスト入力フィールド
                type="text": テキスト入力
                required: 必須項目（HTML5のバリデーション）
              */}
              <input
                type="text"
                id="name"
                name="name"
                className="contact-form-input"
                required
              />
            </div>

            {/* メールアドレス入力フィールド */}
            <div className="contact-form-group">
              <label htmlFor="email" className="contact-form-label">
                メールアドレス <span className="contact-form-required">*</span>
              </label>
              {/* 
                type="email": メールアドレス形式のバリデーション付き入力フィールド
              */}
              <input
                type="email"
                id="email"
                name="email"
                className="contact-form-input"
                required
              />
            </div>

            {/* お問い合わせ内容入力フィールド */}
            <div className="contact-form-group">
              <label htmlFor="message" className="contact-form-label">
                お問い合わせ内容 <span className="contact-form-required">*</span>
              </label>
              {/* 
                textarea要素: 複数行のテキスト入力フィールド
                rows: 初期表示時の行数
              */}
              <textarea
                id="message"
                name="message"
                className="contact-form-textarea"
                rows="8"
                required
              ></textarea>
            </div>

            {/* 送信ボタン */}
            <div className="contact-form-submit">
              {/* 
                button要素: 送信ボタン
                type="submit": フォーム送信ボタン
              */}
              <button type="submit" className="contact-form-button">
                送信する
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ContactPageコンポーネントを他のファイルで使用できるようにエクスポート
export default ContactPage

