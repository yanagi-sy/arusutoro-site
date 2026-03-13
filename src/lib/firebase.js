/**
 * Firebase初期化ファイル
 * 
 * このファイルでは、Firebase v9（modular SDK）を使用して
 * Firestore と Authentication を初期化し、他のコンポーネントで
 * 使用できるようにエクスポートしています。
 * 
 * 【使用方法】
 * 他のファイルで以下のようにインポートして使用します：
 * 
 * import { db, auth } from './lib/firebase';
 * 
 * 【設定値の変更方法】
 * Firebase コンソールから取得した実際の設定値を、
 * firebaseConfig オブジェクトに差し替えてください。
 */

// Firebase v9（modular SDK）から必要な関数をインポート
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase設定オブジェクト
 * 
 * Firebase コンソールの「プロジェクトの設定」→「全般」タブから
 * 「マイアプリ」セクションの設定値をここにコピーしてください。
 * 
 * 【設定値の取得方法】
 * 1. Firebase コンソール（https://console.firebase.google.com/）にアクセス
 * 2. プロジェクトを選択
 * 3. 歯車アイコン → 「プロジェクトの設定」
 * 4. 「マイアプリ」セクションから設定値をコピー
 * 
 * 【注意】
 * 現在はダミー値が設定されています。
 * 実際のプロジェクトで使用する前に、必ず実際の設定値に差し替えてください。
 */
const firebaseConfig = {
  apiKey: 'your-api-key-here',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890',
};

/**
 * Firebase アプリの初期化
 * 
 * initializeApp 関数を使用して、上記の設定値で
 * Firebase アプリを初期化します。
 * 
 * この初期化は1回だけ実行され、アプリ全体で共有されます。
 */
const app = initializeApp(firebaseConfig);

/**
 * Firestore データベースのインスタンス
 * 
 * getFirestore 関数を使用して、Firestore データベースの
 * インスタンスを取得します。
 * 
 * 【使用方法の例】
 * import { db } from './lib/firebase';
 * import { collection, getDocs } from 'firebase/firestore';
 * 
 * const querySnapshot = await getDocs(collection(db, 'activities'));
 */
export const db = getFirestore(app);

/**
 * Authentication のインスタンス
 * 
 * getAuth 関数を使用して、Authentication の
 * インスタンスを取得します。
 * 
 * 【使用方法の例】
 * import { auth } from './lib/firebase';
 * import { signInWithEmailAndPassword } from 'firebase/auth';
 * 
 * await signInWithEmailAndPassword(auth, email, password);
 */
export const auth = getAuth(app);

/**
 * 初期化された Firebase アプリのインスタンス
 * 
 * 必要に応じて、他の Firebase サービス（Storage など）を
 * 追加する際に使用できます。
 * 
 * 現在は使用していませんが、将来の拡張のためにエクスポートしています。
 */
export default app;

