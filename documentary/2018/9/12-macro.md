
## 12 Wednesday

Today I continued the research on Demimonde, and made an offer for the domain name I want. Gladly it is for sale and although the price is more than a few thousand, it is a reasonable price for that domain. Here is a link to some [notable sales](https://www.gritbrokerage.com/notable-sales).

```
Wear.co -   $19k   (Nov 2016)
Acorn.me - $19k (Aug 2018)
Fort.co - $18k (Oct 2016)
Range.co - $18k (Jan 2018)
HUV.com - $16,100 (Mar 2018)
Toolkit.co - $15k (Aug 2018)
Output.co -   $15k   (Mar 2016)
Roam.co -   $15k   (Dec 2015)
Vesper.co - $15k (June 2017)
Curate.co - $14k (Jan 2018)
```

Because I was compiling the list of different companies in a table, I had to realise the idea from a while ago for _Documentary_ to create a template for a table, and populate it with values. The template is called a macro and allows to remove repetitive information from the table and greatly simplify the task of putting data together.

Along the way to the release, the tests were rewritten as _Zoroaster_ masks instead of cumbersome snapshots, and a few bugs such as partial inline code toc-titles fixed. The generated tables are now also formatted to make the content appear as in a table, and although the `README.md` is not meant for humans anyway, it is a nice touch. It does not work so well with wide tables and word-wrap however the word wrap can be switched off. Another bug with the simplest method title was also fixed and writing tests with masks is a pleasant experience.

%EXAMPLE: example/macro.md, markdown%

%FORK-markdown node_modules/.bin/doc example/macro.md%

_Zoroaster_ was updated to be able to construct mask tests not only from a single file, but from a directory. Mask testing is a bit like snapshot-testing, but it defines a function to run against each input to transform it into an output, and an unlimited number of inputs and their respective outputs are defined in a mask file. For example, a mask could be:

```js
// does not replace titles in the the inner code
`[Hello World](t)`

/* expected */
`[Hello World](t)`
/**/

// replaces a title link with an anchor
[Hello World](t)

/* expected */
<a name="hello-world">Hello World</a>
/**/

// replaces a title link with inner code
[`Hello World`](t)

/* expected */
<a name="hello-world">`Hello World`</a>
/**/
```

Here, there are 3 tests defined in terms of input and output. They all share the same test function which is defined in _Zoroaster_'s `makeTestSuite` config as `getResults`. The test will just create a _Documentary_ stream and run it against the input, and then return the string so that it can be compared to the output. The context is just a convenient place to store methods for testing.

```js
import { makeTestSuite } from 'zoroaster'
import { resolve } from 'path'
import Context from '../../context'

const ts = makeTestSuite(resolve(__dirname, '../../mask/Documentary'), {
  /**
     * @param {string} input
     * @param {Context} context
     */
  async getResults(input, { Documentary, catchment }) {
    const doc = new Documentary()
    doc.end(input)
    return await catchment(doc, true)
  },
  context: Context,
})

export default ts
```

When the tests are run, each mask test will ensure that the program produces correct output for the given input. It is called a mask because we use the test input as a mask for the program, i.e., because the program maps the input space into the output space (such as that x1 is transformed into x2 in a certain way), by changing the input we're moving the mask in a particular direction to see the output and discover the behaviour of the program. By looking at this behaviour from different viewpoints, we ensure that the software works as intended. Mask testing removes the need to repeatedly write the same code in tests of the same algorithm, and allows to focus on mapping inputs to the outputs. The difference between that and snapshot testing is that snapshot testing only remembers the output of the test in a file, whereas mask testing also allows to skip writing the test bodies.

```fs
$ NODE_DEBUG=doc zoroaster -a test/spec/mask/Documentary.js
 test/spec/mask/Documentary.js
   toc-titles.md
    ✓  does not replace titles in the the inner code
    ✓  replaces a title link with an anchor
    ✓  replaces a title link with inner code
```

Finally, I made a proper fork of `clean-stack` as `@artdeco/clean-stack`. It's a first package in the `@artdeco` scope, however it could also be called `error-stack` which is free. It also turned out to be a bit of an adventure, because after creating a new package with _MNP_ (and copying the implementation and licence but nothing else, because I wanted to have my package structure) and publishing it in the namespace, I deleted the forked repository on the web and replaced it with the newly created one by renaming it.

This lead to an unexpected problem that `yarn` was not able to install other packages, because I referenced the dependency in published packages as `clean-stack#82625bf`, but after the repository was deleted, the package could not be installed. This means that anyone who tried to install any package that had `clean-stack` in its dependency graph (including `documentary`, `restream` and thus `node-exiftool`) would fail in trying to do so and see an error message.

The problem was an interesting one and I anticipated that I might run into trouble earlier when publishing with a reference to a GitHub commit. What I should have done was to publish a fork on _NPM_ right away, however it was much easier to install by the commit hash. Because the the package was also deleted locally with `rm -rf`, there was no way to get the old git tree back, and GitHub showed `unknown_repository` in the pull request:

![PR from unknown repository](images/18-9.png)

One possible solution was to contact GitHub via email and explain the situation however that would take some time. Therefore, I had to clone the repository from the PR and likely there's [a way to do it](https://stackoverflow.com/questions/14947789/github-clone-from-pull-request): `git fetch origin pull/<#>/head:<local_branch_name>`. Nietsche bless the stackoverflow and git for this possibility. After restoring the branch that way, it was easy to make the commit available again at `artdecocode/clean-stack`, but it also means that now the fork has to start from that point so that anyone who's using any version of software dependent on the commit-based `clean-stack` would not be able to do it. Not a big deal, and a learning outcome. In contrast, if I published to _NPM_, the package would always have been available. The good point however is that the commit hash is unique and it is impossible to tamper with it which means that no other code could have been substituted for it.

In conclusion, I updated every package that used `clean-stack`, including _Erotic_, _Catchment_, _Restream_, _Zoroaster_ and _Assert-Throws_, so that all of them now depend on the `@artdeco/clean-stack` scoped version of the package. Again, It was a lot of manual labour which could be eliminated with a `veg` package or a service, to keep the dependencies green automatically. However, one point is that even if a dependency is not specified in `package.json`, the tests could still pass if a dev dependency has it. For example, if I removed `clean-stack` from _Catchment_ and used `@artdeco/clean-stack`, but didn't update the code, the tests would still pass because maybe _Erotic_ has installed `clean-stack`, and it would be found in the `node_modules` folder.

Tomorrow, I will do more research for Demimonde to give fuller descriptions of current companies.

**FUTURE**

- [ ] Write documentation in _Zoroaster_ for mask testing.
- [ ] Create `error-stack` package which could be used to remember async error stacks (instead of _Erotic_).
- [ ] Describe the problem of having packages in `devDependencies` which are required without an error in the source code, making the tests pass but possibly also breaking the software. It can be done on the linting level, however what about CI?

> Timer: 6.30 + 6.12 = 12.42 hours
