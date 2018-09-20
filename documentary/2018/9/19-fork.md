### 19 Wednesday

On the 18th, I filed a number of bugs to the _VS Code_, including:

<details>
  <summary>**Suggestions do not work on async properties.**</summary>

On the first screenshot, the suggestions work fine:

![screen shot 2018-09-18 at 13 11 39](https://user-images.githubusercontent.com/21156791/45680761-7337b100-bb44-11e8-944a-a216c623e571.png)

On the second example, the suggestion does not work because the method starts with `async`.

![screen shot 2018-09-18 at 13 12 20](https://user-images.githubusercontent.com/21156791/45680784-8480bd80-bb44-11e8-9ec1-43a7459a5060.png)

</details>

<details>
  <summary>**No insight into method signature as part of property.**</summary>

On the first screenshot, I can see what arguments a function accepts.

![screen shot 2018-09-18 at 13 16 21](https://user-images.githubusercontent.com/21156791/45681006-18528980-bb45-11e8-896f-ee4f7923e189.png)

However, when I've already typed in the function name, I get no useful information at all about what I should pass to it.

![screen shot 2018-09-18 at 13 17 21](https://user-images.githubusercontent.com/21156791/45681049-3324fe00-bb45-11e8-92e4-85a6536e1281.png)

This makes me to comment out that line, and start typing the property name again to see what I can give to it as arguments. Pretty inconvenient.

</details>

---

> <img src="images/hand2.svg" align="left"> The number of issues filed against _VS Code_ shows _Art Deco_'s commitment to the best developer experience using its packages. Suggestions for autocompletion is the best indicator of how developer-friendly a package is, because when developers can see those, they have reassurance that everything's going right. There is a general ongoing need to be able to test the suggestions in each package as a separate stage in testing.

%~ width="15"%

Today, I started with getting the `@a-la/import` with the bug fix ready to get merged into _ÀLaMode_ by linking it to test in the `alamode`. This worked fine with the evaluation tests, however then I wanted to change the integration test to use a mask:

```js
import TempContext from 'temp-context'
import { accessSync, constants } from 'fs'
import { join } from 'path'
import Context from '../context'

const { X_OK } = constants

/** @type {Object.<string, (c: Context, tc: TempContext)>} */
const T = {
  context: [Context, TempContext],
  async 'sets the correct permissions'({ SOURCE, fork }, { TEMP }) {
    const file = 'index.js'
    const s = join(SOURCE, file)
    await fork([s, '-o', TEMP])
    const j = join(TEMP, file)
    accessSync(j, X_OK)
  },
}

export default T
```

Here, `alamode`'s process is forked manually, but this could now be done with _Zoroaster's_ mask. However, the mask feature was not complete enough to be able to fork a process with additional arguments from the context, such as `TEMP` which is the path to a temp directory for a test. At that moment, `fork` option only allowed to pass the path to a module, and not to form its arguments. I started to improve that by updating _Zoroaster_.

The feature described above could be implemented by passing a `ForkConfig` option to the `fork` property of a mask, and not just a string. The config would be able to return arguments and options to the module being forked based on input arguments and contexts. For example, the old way allowed to pass only a string in the `fork` property, which was enough when no arguments are required to be formed based on the context:

```js
const ts = makeTestSuite('test/result/bin/index.js', {
  fork: Context.DOC,
})
```

But the new way allows for greater flexibility.

```js
const rights = makeTestSuite('test/result/rights.md', {
  fork: {
    module: BIN,
    /**
     * @param {string[]}
     * @param {TempContext}
     */
    getArgs(src, { TEMP }) {
      return [...src, '-o', TEMP]
    },
    options: {
      env: {
        ALAMODE_ENV: "test"
      },
    },
  },
  getResults(input, { TEMP }) {
    const b = basename(input)
    const j = join(TEMP, b)
    equal(lstatSync(j).mode, lstatSync(input).mode)
    return 'ok'
  },
  context: TempContext,
})
```

When working on this feature, I had to change the `spawncommand` package to provide suggestions for `ForkOptions` and `SpawnOptions` in the IDE. Before _VS Code_ allowed to write `/* typedef {import('child_process').ForkOptions} ForkOptions */` to import a type, this was impossible, because requiring a type with `require('child_process').ForkOptions` would not work, and only `import` statements ensured that the type was exported, however when compiled to `ES5`, this got lost. In newer versions, this was fixed successfully and is the now one of the best features of the editor.

In turn, when working on the `spawncommand` to compile documentation, one of the properties of a class was a promise which was resolved with an object with a certain type, e.g., `Promise.<PromiseResult>`. _Documentary_ could not display this because the type (`PromiseResult`) was not understood to be inside of the promise. I had to fix that, and add linking to external documentation for imported types as well. The result could be seen in the example below:

%TYPEDEF types/19-fork.xml%

%~%