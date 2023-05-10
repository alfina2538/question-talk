# TriplePeace式 お題トーク

TriplePeace企画 お題トークで使われたお題選出ツールのソースです。

## IDE環境のセットアップ

ソースをクローンし独自の変更を加える場合は  
以下にしたがって環境を構築してください。  

1. Visual Studio Codeのインストール  
    [VS Code](https://code.visualstudio.com/)  

    上記リンクからVisualStudioCodeのインストーラーをダウンロード、  
    インストーラーを実行してVisualStudioCodeをインストールしてください。  

2. Tauri拡張機能のインストール  
    [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)

    VisualStudioCodeを起動し、「Ctrl+Shift+X」を押すか、  
    ウィンドウ左側の□がいくつか集まったアイコンをクリックします。  

    検索窓にTauriと記入し上記リンクと同じ拡張機能をインストールしてください。  

3. rust-analyzer拡張機能のインストール  
    [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

    手順2と同様に検索窓に「rust-analyzer」と記入し  
    上記リンクと同じ拡張機能をインストールしてください。

4. リポジトリをクローンする

    [HTTPS URLを使ってクローン](https://docs.github.com/ja/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls)
    [SSH URLを使ってクローン](https://docs.github.com/ja/get-started/getting-started-with-git/about-remote-repositories#cloning-with-ssh-urls)

    上記リンクの情報を参考にご自分の環境にリポジトリをクローンしてください。

## 環境詳細

TriplePeace式お題トークはTauriを用いて  
React + Typescript + Rustによって作成されています。  

言語の仕様や記述の仕方についてはここで説明しません。  

### ビューのソース

ソフトの見た目に関するソースは  「src/APP.tsx」に書かれています。  
App.tsxでは主にソフトの見た目と  
見た目のみの動作に関する処理が記入されています。  

また、配置や色に関する処理が書かれたソースは  
「src/styles.css」に書かれています。

### プロセスのソース

OSとデータのやり取りを行う、  
処理結果をビューに渡すなどに関するソースは  
「src-tauri/src/main.rs」に書かれています。
