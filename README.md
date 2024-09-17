# 環境構築

このリポジトリをローカルのお好きな場所にクローン

```shell
git clone git@github.com:naoyuki2/r6-devteam-firsthalf.git
```

エディタ(VSCodeなど)で`r6-devteam-firsthalf`ディレクトリを開く

```
cd r6-devteam-firsthalf
code .
```

Dockerを起動するために、`r6-devteam-firsthalf` 直下で下記のコマンドを実行

```
docker-compose up -d
```

Docker Desktopを起動し、

下のキャプチャのように `Node` と `PostgresSQL` が起動していることを確認

<img width="370" alt="image" src="https://github.com/user-attachments/assets/a9f49d67-403c-453e-a939-c362e57a6008">

## Node

http://localhost:3000 にアクセスし、下のキャプチャのような変な画面が出ればOK

<img width="507" alt="image" src="https://github.com/user-attachments/assets/6d9b9b0f-3758-4d64-b9d2-48a12b00744f">

## PostgresSQL

データベース管理ツール(a5m2, TablePlus など)で 起動した `PostgresSQL` サーバーに接続する

- user : `postgres`  
- password : `password`  
- database : `mydatabase`  

下は TablePlus で接続する際のキャプチャ

<img width="507" alt="image" src="https://github.com/user-attachments/assets/a080c0b6-a03c-495b-a03b-4ac70ec3b6e1">

エラーが出ることなく接続が完了すれば環境構築は終了 🎉
