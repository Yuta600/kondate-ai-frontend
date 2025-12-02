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

### Phase 1: MVP開発（完了✅）

- ✅ React + TypeScript + Vite環境構築
- ✅ Tailwind CSS設定
- ✅ GitHubリポジトリ作成・初回プッシュ
- ✅ 入力フォーム実装
- ✅ TypeScript型定義
- ✅ バリデーション機能
- ✅ API連携
- ✅ ローディングUI
- ✅ レスポンス表示UI

### Phase 2-1: コンポーネント分割（完了✅）

- ✅ 型定義の分離
  - `src/types/menu.ts` 作成
  - `Ingredient`, `MenuItem`, `MenuResponse` を移動
  - `export` による型のエクスポート
- ✅ TotalCost コンポーネント作成
  - 合計金額の表示
  - Props: `totalCost: number`
- ✅ MenuCard コンポーネント作成
  - 1日分の献立カード
  - Props: `menu: MenuItem`
  - 曜日、タイトル、材料リスト、費用の表示
- ✅ ShoppingList コンポーネント作成
  - 買い物リストの表示
  - Props: `items: string[]`
  - チェックボックス機能（内部で状態管理）
  - チェック時の取り消し線表示
- ✅ InputForm コンポーネント作成
  - 入力フォーム全体
  - Props: 13個（adults, setAdults, children, ... onSubmit）
  - `InputFormProps` interface 定義
- ✅ MenuResult コンポーネント作成
  - 結果表示全体をまとめる親コンポーネント
  - Props: `response: MenuResponse`
  - MenuCard, ShoppingList, TotalCost を統合
- ✅ App.tsx のリファクタリング
  - 250行 → 90行に削減
  - 状態管理とロジックに集中
  - 可読性・メンテナンス性の向上

## 次のタスク

### Phase 2-2

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
- [ ] 状態管理ライブラリ導入（必要に応じて）
  - Zustand or Jotai
- [ ] テストコード
  - React Testing Library
  - Vitest

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
kkondate-ai-frontend/
├── index.html
├── src/
│   ├── App.tsx                 # メインコンポーネント（90行）
│   ├── main.tsx                # エントリーポイント
│   ├── index.css               # グローバルスタイル
│   ├── components/             # ★ 新規追加
│   │   ├── InputForm.tsx       # 入力フォーム
│   │   ├── MenuResult.tsx      # 結果表示全体
│   │   ├── MenuCard.tsx        # 献立カード
│   │   ├── ShoppingList.tsx    # 買い物リスト
│   │   └── TotalCost.tsx       # 合計金額
│   └── types/                  # ★ 新規追加
│       └── menu.ts             # 型定義
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

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

- バックエンド: https://github.com/Yuta600/kondate-ai-backend
