/**
 * アプリケーションのエントリーポイント（メインファイル）
 * 
 * このファイルは、Reactアプリケーションをブラウザに表示するための
 * 最初に実行されるファイルです。
 * 
 * 【処理の流れ】
 * 1. ReactとReactDOMの必要な機能をインポート
 * 2. グローバルスタイル（index.css）を読み込み
 * 3. メインコンポーネント（App.jsx）をインポート
 * 4. HTMLのid="root"要素にReactアプリを描画
 */

// Reactの厳格モードをインポート（開発時のエラー検出を強化）
import { StrictMode } from 'react'
// ReactDOMのcreateRoot関数をインポート（React 18以降の新しい描画方法）
import { createRoot } from 'react-dom/client'
// グローバルスタイルを読み込み
import './index.css'
// メインコンポーネント（App.jsx）をインポート
import App from './App.jsx'

// HTMLのid="root"要素を取得して、Reactアプリを描画
// createRoot: React 18以降の新しいAPI（以前のReactDOM.renderの代替）
// StrictMode: 開発時に潜在的な問題を検出するためのラッパー
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
