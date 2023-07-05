# kintone Design System

## ドキュメント

各種ドキュメントは chromatic にてホストされている。
TODO (chromatic のリンクを貼る)

## Setup

TODO (chromatic のリンクを貼る)

## Release

- PR のタイトルがリリースノートに利用される
- リリースノートに記載不要な場合は `skip-changelog` ラベルを付けておく

1. package.json のバージョンアップ PR を作成し、マージする
   - [releases](https://github.com/kintone-private/kintone-Design-System/releases) のドラフトバージョンを利用する
   - `npm --no-git-tag-version version ${ドラフトバージョン}`で更新した package.json,package-lock.json をコミットする
2. [release](https://github.com/kintone-private/kintone-Design-System/releases) のドラフトバージョンを publish する

## Give Feedback

TODO (chromatic のリンクを貼る)
