# 献立生成アプリ - フロントエンド開発状況

## プロジェクト概要
献立・買い物リスト自動生成アプリのフロントエンド
バックエンドAPIと連携し、ユーザーに献立提案を提供

## 技術スタック
- 言語: TypeScript
- フレームワーク: React 19
- ビルドツール: Vite
- スタイリング: Tailwind CSS

## 完了済みタスク
- ✅ React + TypeScript + Vite環境構築
- ✅ Tailwind CSS設定
    - カスタムカラー（primary, accent, background）
    - カスタムフォント
    - ダークモード対応
- ✅ GitHubリポジトリ作成・初回プッシュ
    - リポジトリ: kondate-ai-frontend (Public)
- ✅ 入力フォーム実装
    - 家族構成（大人・子供、number型）
    - 郵便番号（7桁、数字のみ、バリデーション付き）
    - スーパー名（text型）
    - 予算（万円単位、小数点対応、スピナー非表示）
- ✅ TypeScript型定義
    - Ingredient interface（name, quantity）
    - MenuItem interface（day, title, ingredients, cost）
    - MenuResponse interface（menus, shoppingList, totalCost）
- ✅ バリデーション機能
    - validateInput関数実装
    - 家族構成、郵便番号、スーパー名、予算のチェック
    - エラーメッセージ表示UI
    - 最初のエラーのみ表示（MVP仕様）
- ✅ API連携
    - fetch APIによるPOSTリクエスト
    - async/awaitでの非同期処理
    - try-catch-finallyエラーハンドリング
    - HTTPステータスコードチェック（response.ok）
    - エンドポイント: http://localhost:8080/api/menu/generate
- ✅ ローディングUI
    - isLoading state管理
    - ボタン無効化（disabled属性）
    - テキスト変更（「生成中...」表示）
    - スタイル変更（半透明、カーソル変更）
- ✅ レスポンス表示UI
    - 3日分の献立カード
        - 曜日、タイトル表示
        - 材料リスト（名前・分量）
        - 費用表示（カンマ区切り）
    - チェックボックス付き買い物リスト
        - チェック状態管理（boolean配列）
        - チェック時の取り消し線表示
    - 合計金額表示
    - 条件付きレンダリング（response && ...）
    - 配列表示（.map()、key属性）

## MVP仕様（達成✅）
### 入力
- 家族構成（大人・子供）
- 郵便番号（7桁）
- スーパー名
- 予算（万円単位、小数点可）

### 処理
- バリデーション（クライアント側）
- バックエンドAPIにPOSTリクエスト
- ローディング表示

### 出力
- 3日分の献立カード
- チェックボックス付き買い物リスト
- 合計金額

## プロジェクト構成
```
kondate-ai-frontend/
├── index.html              # 外部リソース読み込み
├── src/
│   ├── App.tsx            # メインコンポーネント
│   ├── main.tsx           # エントリーポイント
│   └── index.css          # グローバルスタイル
├── tailwind.config.js     # Tailwind設定
├── tsconfig.json          # TypeScript設定
└── package.json
```

## 次のタスク（Phase 2）
- [ ] UIの改善
    - フォーム非表示・結果表示の切り替え
    - 「新しく生成する」ボタン
    - アニメーション追加（フェードイン等）
    - レスポンシブ対応強化
- [ ] バリデーション強化
    - 各フィールドごとのエラー表示
    - すべてのエラーを一度に表示
    - リアルタイムバリデーション
- [ ] 郵便番号機能拡張
    - 住所自動入力
    - 郵便番号ライブラリ導入（yubinbango-core等）
- [ ] エラーハンドリング強化
    - API呼び出し失敗時の詳細メッセージ
    - タイムアウト処理
    - リトライボタン
- [ ] コンポーネント分割
    - MenuCard コンポーネント
    - ShoppingList コンポーネント
    - InputForm コンポーネント
- [ ] 状態管理ライブラリ導入（必要に応じて）
    - Zustand or Jotai
- [ ] テストコード
    - React Testing Library
    - Vitest

## 学んだこと
### React
- useState による状態管理
- 条件付きレンダリング（&& 演算子、三項演算子）
- 配列の表示（.map()、key属性）
- イベントハンドリング（onChange、onClick）
- スプレッド構文による配列更新

### TypeScript
- interface による型定義
- 型注釈（string | null、boolean[]）
- ジェネリクス（useState<型>）
- 型の恩恵（タイポ防止、補完）

### 非同期処理
- async/await
- fetch API
- try-catch-finally
- JSON.stringify / response.json()

### Web開発の基礎
- CORS（Cross-Origin Resource Sharing）
- HTTPメソッド（POST）
- HTTPヘッダー（Content-Type: application/json）
- HTTPステータスコード（response.ok）

### CSS/デザイン
- Tailwind CSS の使い方
- レスポンシブデザイン
- 条件付きスタイル（`${...}`）
- カスタムカラー設定
- ダークモード対応

### ベストプラクティス
- 外部リソースはindex.htmlに配置
- Reactでは直接DOM操作しない（useEffectでのDOM操作を避ける）
- 配列の状態更新はスプレッド構文を使う
- エラーメッセージは具体的に
- コミットは機能ごとに小さく分ける

## 注意事項
- バックエンドURL: http://localhost:8080
- フロントエンドURL: http://localhost:5173
- CORS設定はバックエンド側で対応済み
- 予算は万円単位で入力、バックエンド送信時もそのまま（バックエンド側で円換算）
- 郵便番号は数字のみ7桁（ハイフンなし）

## 関連リポジトリ
- バックエンド: https://github.com/YOUR_USERNAME/kondate-ai-backend