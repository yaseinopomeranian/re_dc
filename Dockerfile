# ベースイメージ
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install
RUN npm install react-router-dom

# プロジェクトをコピー
COPY . .

# ビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
#CMD ["npm", "start"]

