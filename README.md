# ASCII Art Gallery

文字だけで描いたアニメーションと絵のギャラリーです。

**▶ サイトを見る: https://0x67696e.github.io/ascii-art-gallery/**

## Animations

| 作品 | 内容 |
| --- | --- |
| [Christmas Tree](https://0x67696e.github.io/ascii-art-gallery/pieces/christmas-tree.html) | 3万個の点で作った立体のツリー。電球がまたたき、雪が降ります。ドラッグで回転。 |
| [Spinning Donut](https://0x67696e.github.io/ascii-art-gallery/pieces/donut.html) | 回転するドーナツ。光の当たり方で文字が変わります。 |
| [Campfire](https://0x67696e.github.io/ascii-art-gallery/pieces/fire.html) | 熱が上へ広がって冷えていく、ゆらめく焚き火。 |
| [Digital Rain](https://0x67696e.github.io/ascii-art-gallery/pieces/rain.html) | 降り注ぐ文字の雨。先頭が光り、尾を引いて消えます。 |
| [Plasma](https://0x67696e.github.io/ascii-art-gallery/pieces/plasma.html) | 4つの波を重ねた、色の移ろうプラズマ模様。 |
| [Warp Speed](https://0x67696e.github.io/ascii-art-gallery/pieces/warp.html) | 星のあいだをワープで突き抜けます。 |

## Text Art

### Mountains

```text
        *           .                    *          .
   .          /\               .
             /  \        /\                   /\        *
     *      /    \      /  \     /\          /  \
           /  /\  \    /    \   /  \   /\   /    \
      /\  /  /  \  \  /  /\  \ /    \ /  \ /  /\  \
     /  \/  /    \  \/  /  \  \      /    \  /  \  \
 ___/___/__/______\__\_/____\__\____/______\/____\__\___
   ~~    ~~~   ~    ~~~   ~~    ~   ~~~   ~~   ~~~   ~~
```

### Night Sail

```text
                          ___
        *       .       .'   '.        *
                       /  .-'  \
     .        *       |  /      |   .
                       \  '-.  /
           .            '.___.'        *
                  |\
                  | \          .
      *           |  \
                  |   \
                  |____\
         _________|_________
         \                 /
  ~~~~~~~~\_______________/~~~~~~~~~~~~
    ~~~~      ~~~~~~~~        ~~~~~
```

### Rocket

```text
           /\
          /  \
         /    \
        |  ()  |
        |      |
        |  ||  |
       /|  ||  |\
      / |      | \
     /__|______|__\
         /_/\_\
        ( (  ) )
         ) )( (
        ( (  ) )
          '  '
```

### Cactus

```text
            .-.
            | |
        .-. | |
        | | | | .-.
        | '-' | | |
        '-.   '-' |
          |   .---'
          |   |
      .---'   '---.
      |  \_____/  |
      '-----------'
```

### Cat

```text
      /\___/\
     (  =^.^= )
      )       (
     (  |   |  )
      \_|   |_/~~
```

（Mandelbrot はページを開いたときに計算して描いています。）

## 仕組み

- 外部ライブラリなし。HTML / CSS / JavaScript だけで動きます。
- アニメーションは `assets/ascii.js` の小さな描画エンジン（文字のマス目を canvas に描く）を共通で使っています。クリスマスツリーだけは独自の3D点群レンダラーです。
- 作品ページの URL に `?embed` を付けると、トップページのサムネイル用の軽量モードになります。

## 作品を追加するには

1. `pieces/` に HTML を1つ作り、`Ascii.play({ title, frame(grid, t, dt) { ... } })` で毎フレーム文字を置きます（`pieces/plasma.html` がいちばん短い例です）。
2. `index.html` の `ANIMS` 配列に1行足します。テキストアートなら `TEXTS` 配列に足すだけです。

## ローカルで見る

```sh
python3 -m http.server
# → http://localhost:8000
```
