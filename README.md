# newt-members-starter-nuxtjs

[Newt](https://www.newt.so/) を利用したメンバー紹介ページ
<br />技術構成： Nuxt.js, JavaScript

## 開発をはじめる

### Step1: Newtプロジェクトをセットアップ

1. プロジェクトを作成します
    - プロジェクトUIDを控えておきましょう。プロジェクトUIDは 管理画面URL（ `https://app.newt.so/{プロジェクトUID}` ） もしくは プロジェクト設定 > 一般 から確認できます。
2. Appを作成します
    - Appテンプレートから作成する場合、**Member**を選択し「このテンプレートを追加」をクリックしてください。
    - スクラッチで作成する場合は、App名とAppUIDを設定して次のステップに進みます。
    - AppUIDを控えておきましょう。AppUIDは管理画面URL（ `https://app.newt.so/{プロジェクトUID}/app/{AppUID}` ） または App設定 > 一般 から確認できます。
3. App設定から、Memberモデル, Positionモデルを作成します
    - Appテンプレートから作成した場合、すでにモデルが作成されているためこのステップは飛ばします
    - スクラッチで作成した場合は、[Newtプロジェクトの構成](#Newtプロジェクトの構成)に従ってAppとモデルを作成します
4. プロジェクト設定 > APIキー からCDN APIトークンを作成します
    - プロジェクト設定 > APIキー よりCDN APIトークンを作成します
    - 複製マークをクリックしてトークンをコピーしましょう

### Step2: nuxt.config.jsを書き換える

1. Step1で取得したプロジェクトUID, AppUID, CDN APIトークンでnuxt.config.jsのpublicRuntimeConfigを書き換えます

```javascript
export default {
  // ...省略
  publicRuntimeConfig: {
    projectUid: 'プロジェクトUID',
    appUid: 'AppUID',
    token: 'CDN APIトークン',
    pageLimit: 12,
  }
}
```

### Step3: devサーバーを起動する

Yarnを使う

```bash
# 依存パッケージをインストール
$ yarn install

# localhost:3000でdevサーバーを起動
$ yarn dev
```

NPMを使う

```bash
# 依存パッケージをインストール
$ npm install

# localhost:3000でdevサーバーを起動
$ npm run dev
```

### Step4: Staticなサイトを生成して起動

```bash
# Staticなサイトを生成（SSG）
$ yarn generate

# サーバーを起動
$ yarn start
```

## Newtプロジェクトの構成

`Member` appの中にMember, Positionの2つのモデルを作ります。

| App名（任意） | モデル名（モデルUID） |
| --- | --- |
| Blog | Member (`member`) |
|  | Position (`position`) |
|  | Author (`author`) |

### Member（`uid: member`）モデル

| フィールドID | フィールド名 | フィールドID	フィールド名 | フィールドID	フィールド名 |
| --- | --- | --- | --- |
| fullName | タイトル | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| slug | スラッグ | テキスト | 必須フィールド |
| profileImage | カバー画像 | 画像 |  |
| profile | プロフィール | Markdown or リッチテキスト |  |
| position | ポジション | 参照（Positionモデル） |  |

### Position（`uid: position`）モデル

| フィールドID | フィールド名 | フィールドID	フィールド名 | フィールドID	フィールド名 |
| --- | --- | --- | --- |
| name | 名前 | テキスト | 必須フィールド, このフィールドをタイトルに使う |
| slug | スラッグ | テキスト | 必須フィールド |
