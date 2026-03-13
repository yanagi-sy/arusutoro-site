/**
 * 予約者向けメール文面テンプレート（送信は行わない）
 *
 * 変数は {{name}}, {{title}}, {{slot}}, {{cancelUrl}} などのプレースホルダで差し替え可能。
 * 実際の送信処理は Cloud Functions 等で利用する想定。
 */

/** 予約完了メール */
export const reservationConfirm = {
  subject: '【劇団〇〇】ご予約を承りました - {{title}}',
  body: `{{name}} 様

ご予約ありがとうございます。
以下の内容でご予約を承りました。

■ 公演名
{{title}}

■ 公演日時（回）
{{slot}}

■ 予約者名
{{name}}

■ メールアドレス
{{email}}

■ 人数
{{numberOfPeople}}名

■ 備考
{{notes}}

――――――――――――――――――――――――――
キャンセルをご希望の場合は、下記URLから手続きをお願いいたします。
このURLを紛失されますと、キャンセル手続きができませんのでご注意ください。

{{cancelUrl}}

――――――――――――――――――――――――――
何かご不明な点がございましたら、お問い合わせください。
`
}

/** キャンセル完了メール（任意） */
export const cancellationConfirm = {
  subject: '【劇団〇〇】ご予約のキャンセルが完了しました - {{title}}',
  body: `{{name}} 様

以下のご予約のキャンセルが完了しました。

■ 公演名
{{title}}

■ 公演日時（回）
{{slot}}

またのご予約を心よりお待ちしております。
`
}

/**
 * テンプレートの変数を置換する（送信時に利用想定）
 * @param {string} template - 本文または件名
 * @param {Object} vars - キーがプレースホルダ名（{{key}}）、値が差し替え文字列
 * @returns {string}
 */
export function applyTemplate(template, vars = {}) {
  let result = template
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value ?? ''))
  }
  return result
}
