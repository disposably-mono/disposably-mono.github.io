# disposably-mono.github.io

Personal portfolio site — currently showing a "renovation in progress" cutting mat placeholder.

## Structure

```
index.html                 Bare skeleton: #nav, #viewport > #desk
css/base.css                Tokens, desk/viewport layout, nav
css/{home,projects,contact}.css   Per-mat content layout
js/cutting-mat.js          Grid, rulers, and angle guides (per mat)
js/{home,projects,contact}.js     Per-mat data + DOM/texture construction
js/camera-pan.js           GSAP desk pan between mats
js/entrance-animations.js  Per-mat entrance timeline, reduced-motion handling
js/nav.js                  Nav construction + click wiring
js/main.js                 Bootstrap
```

## Local Development

Open `index.html` in a browser, or serve it:

```sh
python3 -m http.server 8080
```
