/**
 * Firebase 初期化ファイル（Firestore 用）
 *
 * Firebase v9（modular SDK）を使って Firestore を初期化します。
 * 他のファイルからは `db` をインポートして使用してください。
 *
 *   import { db } from '../lib/firebase'
 */

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// ※ここはダミー設定です。必ず Firebase コンソールの値に置き換えてください。
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890'
}

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig)

// Firestore インスタンスを作成してエクスポート
export const db = getFirestore(app)

// 必要ならアプリ自体も参照できるようにエクスポート
export default app

