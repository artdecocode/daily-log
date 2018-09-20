### 19 Wednesday

On the 18th, I filed a number of bugs to the _VS Code_, including:

<details>
  <summary>

  **Suggestions do not work on async properties.**</summary>

On the first screenshot, the suggestions work fine:

![screen shot 2018-09-18 at 13 11 39](https://user-images.githubusercontent.com/21156791/45680761-7337b100-bb44-11e8-944a-a216c623e571.png)

On the second example, the suggestion does not work because the method starts with `async`.

![screen shot 2018-09-18 at 13 12 20](https://user-images.githubusercontent.com/21156791/45680784-8480bd80-bb44-11e8-9ec1-43a7459a5060.png)

</details>

<details>
  <summary>

  **No insight into method signature as part of property.**</summary>

On the first screenshot, I can see what arguments a function accepts.

![screen shot 2018-09-18 at 13 16 21](https://user-images.githubusercontent.com/21156791/45681006-18528980-bb45-11e8-896f-ee4f7923e189.png)

However, when I've already typed in the function name, I get no useful information at all about what I should pass to it.

![screen shot 2018-09-18 at 13 17 21](https://user-images.githubusercontent.com/21156791/45681049-3324fe00-bb45-11e8-92e4-85a6536e1281.png)

This makes me to comment out that line, and start typing the property name again to see what I can give to it as arguments. Pretty inconvenient.

</details>

---

> <img src="images/hand2.svg" align="left" height="75"> The number of issues filed against _VS Code_ shows _Art Deco_'s commitment to the best developer experience using its packages. Suggestions for autocompletion is the best indicator of how developer-friendly a package is, because when developers can see those, they have reassurance that everything's going right. There is a general ongoing need to be able to test the suggestions in each package as a separate stage in testing.

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

When working on this feature, I had to change the `spawncommand` package to provide suggestions for _ForkOptions_ and _SpawnOptions_ in the IDE. Before _VS Code_ allowed to write `/* typedef {import('child_process').ForkOptions} ForkOptions */` to import a type, this was impossible, because requiring a type with `require('child_process').ForkOptions` would not work, and only `import` statements ensured that the type was exported, however when compiled to `ES5`, this got lost. In newer versions, this was fixed successfully and is now one of the best features of the editor.

In turn, when working on the `spawncommand` to compile documentation, one of the properties of a class was a promise which was resolved with an object with a certain type, e.g., `Promise.<PromiseResult>`. _Documentary_ could not display this because the type (`PromiseResult`) was not understood to be inside of the promise. I had to fix that, and add linking to external documentation for imported types as well. The result could be seen in the example below:

%TYPEDEF types/19-fork.xml%

%~ width="15"%

<img src="images/cow.svg" align="right" height="150">After that was completed, I had to go out to town. On the way back I was hungry and because the place was next to a train station, there was a lot of kebab shops. It felt tempting because of the smell however there is just a general attitude that "I don't eat that". Although I might mentally want that food because I know that it taste nice, I don't physically want to have it. Instead, I can feel that being hungry is OK as a feeling on its own as well, reinforced by the idea that I consciously choose not to be part of the meat eating confusion. This idea gives strength, feeling of having a certain purpose of rejecting to be like the rest of the people.

<img src="images/chicken.svg" align="left" height="150">Moreover, it's quite religious as well because there's certain awareness that there is a resolution to doing what I am doing. But out of all religions veganism is the best, because it does not force you to close up your mind and stupidly deny yourself pleasure such as sex which is not harming anyone (except for those you're denying it to), but focuses on your own personal understanding of power. It is very easy to have Christian compassion and pity for people, it just gives you pride that you are virtuous, however you don't need religion to be compassionate as it's an innate quality.

Thinking of animals, on the other hand, is not promoted by any religion apart from Buddhism, and it is a true measure of the quality of one's soul. Why would anyone want others to suffer because of him or her? Only because it's normal in the society. When ties to the society to a certain extent are broken, the true freedom of thought and living can be experienced. Then, there is no need to call yourself by the name of your religion and pretend that you know anything about spirituality. What is there to know? So what people talk about god and good deeds _etc_, it is all just words. In the end, everybody has to work and make money to survive.

[<img src="images/18/9-20/DoorsofPerception.jpg" align="right" height="200">](https://maps.org/images/pdf/books/HuxleyA1954TheDoorsOfPerception.pdf)All one really has to do is to disconnect from external sources which tell him what is right and wrong. It is far more spiritual to have a purpose of choosing to live by not harming any other living being, present or future, and not participating in the set-up system rather than joining it and fooling yourself that by abstaining from normally good things that give pleasure one can achieve anything. I don't know why it's so hard to get. To transcend, you really have to take a psychedelic drug at least for once and feel rather than use all the useless knowledge fed to you by parties who's sole interest is to increase their own influence by signing you up in their troops. At least read books such as the one on the right, but without proper experience it would not make much sense. Drugs are not bad, people who talk about what they don't know of is much worse.

<p align="center">
  <img src="images/k.svg" width="500">
</p>

Also, I despise all the governments for banning MDMA. Once again we see a corrupt system which does not want people to be happy and just wants workers who labour until retirement and produce a stable input to the economy. MDMA has a massive therapeutic potential, for example if I feel bad because of all the injustice and bullshit in the world, I could take my drug and be OK. This maybe does not solve the problem in long term because I will be coming back to that sad feeling, but it's nobody right to take away this sort of medicine away from me. This also shows the stage our societies are at the moment, and hopefully in 100 or so years this might change. However, I'm sceptical about anyone surviving the next 100 years because we've already destroyed the planet. I would stop programming now and focus on something more natural, however I need to be able to make a living even though I know it is all doomed. It is not pessimism it is just a reality that although I might want to go out to walks and attend to reading all day long, because the is no point of my technology in the long-run, I still have to work and attach my mind to the programs to be able to be financially independent myself.

To focus on positives, I like programming and I want to improve the quality of life of people who will use my software, so that they can go on and do their own amazing things, but technology and interaction with it is artificial and there is a need to remember that. Being a slave to technology and "placing a microchip" in one's own brain to follow certain rules and repeat certain actions is a waste of one's life. The though is not even real, only experience of living is worth anything, but to be able to experience it, we must work and use the thought, which is an instrument and not the the target in itself. Babylon must fall down.

**FUTURE**

- [ ] Create a tool to test autocompletion for each package. E.g., `salsa` testing used in the _VS Code_ software.

%~%