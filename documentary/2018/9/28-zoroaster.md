### 28 Friday: Feed Fork

This day involved working more on `mnp` to refactor it into easier parts, such as putting the code for different commands into separate files (e.g., to check if a package name is free, delete a repository, create a new package). In addition, more integration tests were added, for example there is a test now for deletion of repos. This is done by first creating a repo with the GitHub API, and then using `mnp` to delete it.

In addition, the `temp-context` has received an update to the next major version, 2. I had to create a new package, `@wrote/write` to write files in the temp directory, and outside of it. The version is major, because it now has 2 methods of each type of operation with files: one when the path is passed inside of the temp directory, and one when the path is global for the file system. For example, the `TempContext.read('file.txt')` command would read the path inside of the temp dir, whereas `TempContext.readGlobal('file.txt')` will read file in the current working directory. Because previously `read` worked as `readGlobal`, the version has be updated to 2 from 1 because the function now outputs different results, and other packages that use `temp-context` need to make sure their tests are updated.

There were also readme improvements to the `README` file of the _TempContext_, where there was a legacy of calling the package `@wrote/temp-context` because it was created inside of the `wrote` organisation's workspace which was configured to have the `wrote` scope. However, `temp-context` has the global scope as although it belongs to the organisation, it is not necessary for it to be called `@wrote/temp-context`, as because the `temp-context` package name is free, and it is semantically not part of the `wrote` library which allows to work with files (including `@wrote/read`, `@wrote/write`, _etc_).

Moreover, the previous update to _Zoroaster_ which ensured that test contexts can get extended easily meant that I could remove the `setDir` static method of the class to change the location of the temp directory by updating the variable in the JS file where the class is written. This could lead to multiple misunderstandings and not clear design. Now, it is done by extending the class. For example, when it is needed to use the OS's temp directory (`/usr/var/tmp`) rather than the project temp directory (`PROJECT_NAME/test/temp`), the `_useOSTemp` method is available for use.

```js
import TempContext from 'temp-context'

export default class MyTempContext extends TempContext {
  constructor() {
    super()
    this._useOSTemp('package-test')
  }
  get DATA() {
    return 'test-data'
  }
}
```

Finally, _Zoroaster_ has a new feature when answers can be fed to a forked process. I wanted to implement this for a while and the tests for `mnp` were the best place where it was required: when creating a package, there will be a question for its description which needs to be entered manually; when deleting a package, there needs to be a confirmation answer, such as: "Do you want to delete org/package": `y`. With _Zoroaster_ testing masks, this answers can be supplied automatically when the relevant question comes up. It will also print the output to the console.

```js
import { makeTestSuite } from '../../../../src'

const name = 'Ovuvuevuevue enyetuenwuevue ugbemugbem osas'

const ts = makeTestSuite('example/Zoroaster/test/result/name.md', {
  fork: {
    module: 'example/Zoroaster/test/fixture/ask-name',
    inputs: [
      [/What is your name/, name],
      [/come again/, name],
      [/call it again/, name],
      [/spell em/, name],
    ],
    log: true,
  },
  mapActual({ stdout }) {
    return stdout.trim()
  },
})

export default ts
```

```table
[["![piping to fork](images/18/terminal.gif)"]]
```

**FUTURE**

- [ ] Allow mnp to override the package scope when creating packages.