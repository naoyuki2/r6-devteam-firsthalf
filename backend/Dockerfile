# ベースイメージ
FROM node:20-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install --production=false

# ソースコードをコピー
COPY . .

# TypeScriptをビルド
RUN npm run build

# ---------------------------------------------------
# 実行環境用ステージ
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルのみをコピー
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# 必要最低限の依存関係をインストール
RUN npm install --production

# ポート設定
EXPOSE 3000

# 起動コマンド
CMD ["node", "dist/main.js"]
