### 17 Monday

_Added: 17 Sep 2018 23:54_

It was nice to see the climb in the download count of _Documentary_, which reached 600+ weekly downloads. It is much more than last week, and possibly because more tags were added.

![#](images/18-17/600.gif)

Tags are important for discoverability, therefore I think the increase in downloads might have been because of the `table of contents` tag.

![#](images/18-17/tags.png)

It would be useful to be able to see at which position in the search a package is against each of its tags. For the `documentation` tag, _Documentary_ is currently somewhere around 400 position, although it's a really great package. However, when it becomes more popular the position will improve as well, as the score is partly calculated according to popularity. _MNP_ should be able to analyse the tags, and it could be possible to install an image on a package page, which would call the _MNP_ server and tell the referrer of the page (i.e. which page people came from). This would show the search query and tags that people found the package from. I am not 100% sure it's technically possible, but there does not seem to be a proxy for an image, like it is on GitHub to prevent this sort of spying. Although it might be unethical, the method is only proposed to analyse and improve the marketing of packages using tags, and is not intended to breach privacy. In any way, NPM has a way to protect against this, but they never will because NPM sucks big time. Just the fact that they had to use somebody else's search engine for packages on their own website shows how desperate the company is.

%~ width="15"%

```table
[
  ["![https://github.com/artdecocode/documentary](images/18-17/17.png)"],["17 September is a good day to release `documentary@1.17`."]
]
```

Today was a good and productive day, when I focussed on the **essential** work to implement linking of `@typedef` titles across the whole documentation. This feature was needed to continue with `@idio/core` to describe different sections of the configuration in multiple sections of the documentation, but be able to link to them from the overall, combined configuration.

%TYPEDEF types/index.xml%

I started working on implementing this feature _Documentary_ by writing tests. I realised that the tests could be improved as well which was a work in progress, when instead of re-writing the same code many times to test different inputs for the same transformation, I used _Zoroaster_ masks. I then also improved _Zoroaster_ to be able to read the stream automatically, and compare it to a masks output.

![https://github.com/artdecocode/zoroaster](images/18-17/zoroaster.png)

The example below shows how easy it is to write tests now. The mask tests for the binary (the actual program to be run) _now_ look like this with the `fork` property:

```js
import { makeTestSuite } from 'zoroaster'
import Context from '../context'

const ts = makeTestSuite('test/result/bin/index.js', {
  fork: Context.DOC,
})

export default ts
```

Whereas before, it would be a bit longer:

```js
import { resolve } from 'path'
import { makeTestSuite } from 'zoroaster'
import Context from '../../context'

const path = resolve(__dirname, '../../mask/bin/index.js')
const ts = makeTestSuite(path, {
  /**
   *
   * @param {string} input
   * @param {Context} context
   */
  async getResults(input, { doc }) {
    const [source, ...args] = input.split(' ')
    const { stdout } = await doc(source, ...args)
    return stdout
  },
  context: Context,
})

export default ts
```

And even before `masks`, despite being innovative in using test contexts, it was very repetitive:

```js
import { ok } from 'assert'
import SnapshotContext from 'snapshot-context'
import Context from '../../context'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  async 'generates correct markdown'(
    { SNAPSHOT_DIR, doc, README_PATH }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const { stdout } = await doc(README_PATH)
    await test('bin/markdown.md', stdout.trim())
  },
  async 'generates correct markdown from a directory'(
    { SNAPSHOT_DIR, doc, README_DIR_PATH }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const { stdout } = await doc(README_DIR_PATH)
    await test('bin/dir-markdown.md', stdout.trim())
  },
  async 'generates correct markdown and saves it to a file'(
    { SNAPSHOT_DIR, doc, README_PATH, OUTPUT, readOutput }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const { stdout } = await doc(README_PATH, '-o', OUTPUT)
    ok(/Saved/.test(stdout))
    const res = await readOutput()
    await test('bin/markdown.md', res.trim())
  },
  async 'prints the TOC with -t flag'(
    { SNAPSHOT_DIR, doc, README_PATH }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const { stdout } = await doc(README_PATH, '-t')
    await test('bin/toc.md', stdout.trim())
  },
}

export default T
```

Test masks take out all the hassle of repeating the code required to set up a running test, and permit to focus on just supplying input data with its output counterpart.

In addition to `fork`, there are now `getTransform` and `getReadable` properties for the mask factory, which work in a similar way to the `fork` one:

```js
const ts = makeTestSuite('test/result/Documentary', {
  getTransform() {
    const doc = new Documentary()
    return doc
  },
})
```

Here, a _Transform_ stream is created which performs the main logic of the software, including embedding examples and outputs. The inputs are mapped to the outputs in the `test/result/Documentary` folder, which contains different files for different transforms, for example, a table.

````md
// replaces a table
The program accepts the following arguments:

```table
[
  ["arg", "description"],
  ["-f", "Display only free domains"],
  ["-z", "A list of zones to check"]
]
```

/* expected */
The program accepts the following arguments:

| arg |        description        |
| --- | ------------------------- |
| -f  | Display only free domains |
| -z  | A list of zones to check  |
/**/
````

> <img src="images/18-17/factory.svg" align="right"> A mask **factory** is a function which takes the location of the mask file on a computer and creates a mask test suite. It is called a factory because it is used to create objects according to certain process. In case of _Zoroaster_, an object is a test suite which contains any number of tests, or other test suites.

%~ width="15"%

It was nice to work during the day, and it felt like actual work rather than a full-time hobby because I started at 9am rather than some random time I used to start in previous weeks. I feel more organise with proper planning, however I don't believe it's that important because I was doing a lot of work before planning as well. This means that although there's more structure, it does not mean that the end result is any better. It's just the attitude, and also allows to take things more seriously, i.e. I felt pretty much like at a job, with a short lunch break and some tiredness by 5:30, almost ready to go home (from home lol). Despite that, the feeling was very positive because of the fact that I am not working for somebody building what they want so that I can spend half of the money on rent _etc_, but doing what _I_ love to do, and what _I_ find important, that is, my company. There was a sense of connection with the world as well and other people because everybody is just doing what they can. It's really this expanded perception from bird-view that is related to the awareness of how everything on the planet and in both human and animal societies is connected. It might be called collective unconsciousness because we all exist together and there is always cause and effect. To perceive this is like to slow down time and be able to take in the more general view of the whole planet. However, it might be just a trick of the mind due to fatigue.

Finally, I also fixed a bug in `mismatch@1.0.3` necessary to implement masks. This brings the number of releases today to solid 3. Moreover, I found an important bug in _À La Mode_ which needs fixing. This will allow me to update _À La Import_ package in which the bug is present to the latest _Zoroaster_ and make the best use of the new masks.

<img src="images/18-17/ads.svg" align="left"/> I also thought about marking ideas for the Art Deco package, and realised I could add a note when packages are installed, so that those 600 downloads of _Documentary_ would have shown 600 messages promoting Art Deco package in a form similar to "Thanks for choosing _Documentary_. It is part of Art Deco packages which include a modern context-testing framework _Zoroaster_ and a regex-based transpiler _À La Mode_. Are you tired of Babel and Mocha with 6000 dependencies? Stand out from the crowd by starting to use Art Deco packages".

**FUTURE**

- [ ] Fix bug in _À La Mode_.