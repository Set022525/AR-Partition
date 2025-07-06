# AR Partition App

WebXRとNext.jsを使用したAR（拡張現実）パーティション配置アプリケーション。実空間に仮想的な直方体型パーティションを配置・調整できます。

## 🚀 機能

- **WebXR AR機能**: スマートフォンやタブレットでAR体験
- **インタラクティブな配置**: タップで選択、ドラッグで移動
- **リアルタイムサイズ調整**: 幅・高さ・厚さの動的変更
- **複数パーティション管理**: 追加・削除・個別調整
- **視覚的フィードバック**: 選択状態の表示、サイズ情報の表示

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **3D描画**: Three.js
- **WebXR**: @react-three/xr
- **UI**: Tailwind CSS
- **状態管理**: React Hooks

## 📋 必要条件

- Node.js 18.0.0 以上
- npm または yarn
- WebXR対応デバイス（Android Chrome, iOS Safari など）
- HTTPS環境（WebXR使用時）

## 🔧 セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd ar-partition-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### 4. HTTPS環境での実行（WebXR使用時）

WebXR機能を使用するには、HTTPS環境が必要です：

```bash
npm run dev -- --experimental-https
```

または、`package.json`のスクリプトを変更：

```json
{
  "scripts": {
    "dev": "next dev --experimental-https"
  }
}
```

## 📱 使用方法

### 基本操作

1. **AR開始**: 右上の「Enter AR」ボタンをタップ
2. **パーティション選択**: 3D空間のパーティションをタップして選択
3. **位置調整**: 選択したパーティションをドラッグして移動
4. **サイズ調整**: 左側のコントロールパネルで数値を変更

### コントロールパネル

- **パーティション追加**: 新しいパーティションを追加
- **削除**: 不要なパーティションを削除
- **サイズ調整**: 幅・高さ・厚さを0.1m単位で調整

### ARモード

- デバイスを移動して視点を変更
- 実空間にパーティションがオーバーレイ表示
- タップ操作でパーティションを選択・移動

## 🏗️ プロジェクト構造

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # メインページ
│   └── globals.css         # グローバルスタイル
├── components/
│   ├── ARPartition.tsx     # ARパーティションコンポーネント
│   ├── ARScene.tsx         # ARシーンコンポーネント
│   ├── ControlPanel.tsx    # コントロールパネル
│   └── InstructionPanel.tsx # 使用方法パネル
├── hooks/
│   └── usePartitions.ts    # パーティション状態管理
└── types/
    └── partition.ts        # TypeScript型定義
```
