# daily-log

[![npm version](https://badge.fury.io/js/daily-log.svg)](https://npmjs.org/package/daily-log)

`daily-log` is a collection of descriptions of work done each day.

![terminal](images/index.svg)

## Table Of Contents

- [daily-log](#daily-log)
  * [Table Of Contents](#table-of-contents)
- [2018](#2018)
  * [September](#september)
    * [5 Wednesday](#5-wednesday)
    * [6 Thursday](#6-thursday)
  * [7 Friday](#7-friday)
  * [API](#api)
    * [`dailyLog(arg1: string, arg2?: boolean)`](#dailylogarg1-stringarg2-boolean-void)
  * [TODO](#todo)
  * [Copyright](#copyright)

# 2018

![https://wakatime.com/ timer](https://wakatime.com/share/@zavr/dc4c568c-1d78-4c3b-a267-8f9deb5c9f25.png)

## September

### 5 Wednesday

Working on hiding error stack for the `restream` and starting to implement it in the `erotic`. Figuring out that Node.js [hides an async stack](https://github.com/nodejs/node/issues/11865) behind `<anonymous>`, but only if error was thrown after the first `await`.

```js
const after = async () => {
  await new Promise(r => setTimeout(r, 100))
  throw new Error('example error after await')
}

const before = async () => {
  throw new Error('example error before await')
}

(async () => {
  try {
    await before()
  } catch ({ stack }) {
    console.log(stack) // error stack is there
  }
})()

;(async () => {
  try {
    await after()
  } catch ({ stack }) {
    console.log('\n======\n')
    console.log(stack) // cuts at anonymous
  }
})()
```

```
Error: example error before await
    at before (/Users/zavr/adc/daily-log/example/promise.js:7:9)
    at /Users/zavr/adc/daily-log/example/promise.js:12:11
    at Object.<anonymous> (/Users/zavr/adc/daily-log/example/promise.js:16:3)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)

======

Error: example error after await
    at after (/Users/zavr/adc/daily-log/example/promise.js:3:9)
    at <anonymous>
```

- _Documentary_:
 + `v1.14`: refactor TOC, allow h1, detect underlined titles
 + `v1.13`: fork stderr
 + `v1.12`: replace require, start using masks
- _Restream_:
 + `v3.2`: brake and stack hiding.


**Future** Implement remembering the full async stack in `erotic`.

### 6 Thursday

The day started by continuing to find suitable packages to compile w/ `documentary`. [`json2svg`](https://www.npmjs.com/package/json2csv) looked good yesterday, however it had a screenshot of a PNG. Therefore it was decided to be a great feature for _Documentary_ to make screenshots of output from a terminal. The search revealed existence of [`ansi-to-svg`](https://github.com/F1LT3R/ansi-to-svg) which is not very popular, but amazing. To start off with, a [Yosemite UI Kit](https://www.sketchappsources.com/tag/yosemite.html) for Sketch was downloaded and the title bar exported as SVG.

Because the export was automatic and auto-generated, `Sketch` produced some output which could be simplified by hand. Updated the SVG file and made it a template for the `ansi-to-svg` which also required modifying the source code. Creating a `package.json` script for running tests on commit is hell and should not be allowed.

Finished off with a complete good-looking terminal template which could also be used as a stand-alone package. Allows to either have or not have shadows. Learnt some things about drawing SVGs such as creating paths (e.g., for rectangles with rounded corners) and blurs (along with cases when having to specify `x`, `y`, `width` and `height` for those). _MOVE TO_ in path definition reminded of year 5 logo-worlds (???).

✍️ Started the daily log 🎉!

![terminal](images/terminal.svg)

**Future** Integrate the terminal generation into _Documentary_, make animated terminal in addition to static, release as a separate package (`svag`?). Implement caching for _Documentary_.

1. Timer: 8.38 + (5.3) = _13 hours 41 min_

## 7 Friday

Viva la [`SVaG`](https://svag.co)! As continuation from yesterday's work on making a terminal SVG, I started the day by figuring out that the best course of action would be to create a package which would export multiple UI elements as SVGs. The elements can be dynamically generated, therefore a whole library was written. In the beginning, I just worked on the `svag` package and was putting lib methods and UI elements such as `terminal` in there, but quickly changed to registering a new organisation on `npm` [`svag`](https://www.npmjs.com/org/svag) and on GitHub, and used `mnp` to spawn packages.

<img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/window.svg?sanitize=true">

The GitHub org name `svag` was taken, and the request to free it due to inactivity was denied as there was some private activity. I also got a 2-month old response saying that `artdeco` org is also not inactive, but I could try the trademark claim. Therefore, the org `svagjs` was registered although I'm not a big fan of adding `js` at the end because it's so easy, unless it's something like `mnpjs` because npm also uses `npmjs.com` and `mnp` is a play on `npm`.

After a while, I checked the domain names for `svag` and most of them were free, with `svag.net` and `svag.org` being for sale. The `svag.co` sounded really cool, despite the price for $130 for a premium name, therefore it was acquired, as `.co` domains are super nice. `Svag LTD` is not available to register as a company.

```js
Domain    Available  Premium  Price
svag.com     no
svag.net     no
svag.org     no
svag.biz     yes
svag.co      no         ✓     130.00
svag.cc      yes
svag.io      yes
svag.bz      yes
svag.nu      yes
svag.app     yes
```

Then I focused the efforts on implementing the library with some methods such as creating rounded corners in an SVG path and others, adding tests and documentation. Slowly progressed in order `lib` -> `toolbar`, `shadow` -> `window`. The `shadow` was initially called blur because it's the main filter used in it, but I didn't notice almost till the end. The `window` was also called `terminal` but it's just a generic `window`. Moreover, had to go back to `ansi-to-svg` to update the interface, and fixed the foreground/background bug from yesterday.

```js
import { writeFileSync } from 'fs'
import { roundedCorner, svg, makeElement } from '@svag/lib'

const drawPath = (from, to) => {
  const d = `M${from.x},${from.y} ${roundedCorner(from, to)}`
  const p = makeElement({
    name: 'path',
    attributes: {
      d,
    },
  })
  return p
}
const corners = [
  drawPath({x: 0, y: 50}, { x: 50, y: 0}),
  drawPath({x: 50, y: 0}, {x: 100, y: 50}),
  drawPath({x: 100, y: 50}, {x: 50, y: 100}),
  drawPath({x: 50, y: 100}, {x: 0, y: 50}),
]

const g = makeElement({
  name: 'g',
  attributes: {
    stroke: 'green',
    fill: 'red',
    'stroke-width': '2',
  },
  content: `\n  ${corners.join('\n  ')}\n`,
})

const image = svg({
  content: `<g transform="translate(2,2)">${g}</g>`,
  width: 110,
  height: 110,
  stretch: false,
})

console.log(image)
writeFileSync('images/rounded-corners.svg', image)
```

```svg
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0, 0, 110, 110" width="110px" height="110px"><g transform="translate(2,2)"><g stroke="green" fill="red" stroke-width="2">
  <path d="M0,50 C 0 25, 25 0, 50 0"/>
  <path d="M50,0 C 75 0, 100 25, 100 50"/>
  <path d="M100,50 C 100 75, 75 100, 50 100"/>
  <path d="M50,100 C 25 100, 0 75, 0 50"/>
</g></g></svg>
```

Trying to use `I` in the log, although it does sound more personal, but I'm not gonna write `we` because it's too formal.

<img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/rounded-corners.svg?sanitize=true"><img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/rounded-corners.svg?sanitize=true"><img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/rounded-corners.svg?sanitize=true">

There's an [`asciinema`](https://asciinema.org/) project which allows to play terminals as `svg` animations, however the purpose of `SVaG` is to provide dynamic UI elements.

**FUTURE**

1. Implement the terminal output into the simple window.
1. Animate the terminal output.
1. Embed `@svag/window` into documentary when the terminal is ready  (possibly as a plugin rather than dependency?), because waiting on `ansi-to-svg` to merge the PR can last forever, and we want our own package to do that, it's not difficult.
1. move the `clean-stack` to art deco scope as still waiting on the PR to get merged.

1. Timer: (10.5 - 5.3 = 5.2) + (7.28) = _12 hours 30 min_

## API

The package is available by importing its default function:

```js
import dailyLog from 'daily-log'
```

### `dailyLog(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example/ */
import dailyLog from 'daily-log'

(async () => {
  await dailyLog()
})()
```

## TODO

- [ ] Add a new item to the todo list.

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
