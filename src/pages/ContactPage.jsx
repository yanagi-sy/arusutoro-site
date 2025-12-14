/**
 * ContactPageコンポーネント（お問い合わせページ）
 * 
 * お問い合わせフォームを表示するページです。
 * 
 * 【主な機能】
 * - お問い合わせフォームの表示
 * - フォーム送信処理（現在は仮実装）
 * 
 * 【今後の実装予定】
 * - Firebaseやメール送信機能への差し替え
 * - バリデーション機能の追加
 * - 送信完了メッセージの表示
 */

// ContactPageコンポーネント用のスタイルを読み込み
import './ContactPage.css'

/**
 * ContactPageコンポーネント
 * 
 * @returns {JSX.Element} お問い合わせページのJSX
 */
function ContactPage() {
  /**
   * フォーム送信処理
   * 
   * 現在は仮実装で、アラートを表示するだけです。
   * 将来的にFirebaseやメール送信機能に差し替え可能です。
   * 
   * @param {Event} e - フォーム送信イベント
   */
  const handleSubmit = (e) => {
    // preventDefault: フォームのデフォルトの送信動作をキャンセル
    e.preventDefault()
    // ここに実際の送信処理を実装（Firebase、メール送信API等）
    alert('お問い合わせありがとうございます。\n（現在は送信機能は実装されていません）')
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
        {/* 
          form要素: フォームを意味するHTMLセマンティック要素
          onSubmit: フォーム送信時にhandleSubmit関数を実行
        */}
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

          {/* 件名入力フィールド */}
          <div className="contact-form-group">
            <label htmlFor="subject" className="contact-form-label">
              件名 <span className="contact-form-required">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
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
      </div>
    </div>
  )
}

// ContactPageコンポーネントを他のファイルで使用できるようにエクスポート
export default ContactPage

