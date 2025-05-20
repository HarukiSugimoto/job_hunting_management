## 環境構築方法

社内パッケージのインストールにgitの権限が必要

### 1. `.npmrc.example`を元に`.npmrc`ファイルを作成する

```ini
//npm.pkg.github.com/:_authToken=
@how-collect:registry=https://npm.pkg.github.com
```

### 2. `.env.example`を元に`.env`を作成して GitHub Token を設定

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

※ トークンのスコープは `read:packages`, `repo` を含めて classicを利用してください  
※ GitHub → Settings → Developer settings → Personal access tokens から発行できます
