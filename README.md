# daily-log

[![npm version](https://badge.fury.io/js/daily-log.svg)](https://npmjs.org/package/daily-log)

`daily-log` is a collection of descriptions of work done each day.

![terminal](images/index.svg)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [daily-log](#daily-log)
  * [Table Of Contents](#table-of-contents)
  * [API](#api)
    * [`dailyLog(arg1: string, arg2?: boolean)`](#dailylogarg1-stringarg2-boolean-void)
- [2018](#2018)
  * [September](#september)
    * [28 Friday: Feed Fork](#28-friday-feed-fork)
    * [27 Thursday: MNP](#27-thursday-mnp)
    * [25-26 Tuesday-Wednesday (rqt w/ namecheap)](#25-26-tuesday-wednesday-rqt-w-namecheap)
    * [24 Monday: Rqt](#24-monday-rqt)
      * [`Human`](#type-human)
    * [*24-28 Week*](#24-28-week)
    * [21 Friday: IdioCore](#21-friday-idiocore)
    * [20 Thursday: Watts](#20-thursday-watts)
    * [19 Wednesday](#19-wednesday)
      * [`You`](#type-you)
    * [18 Tuesday](#18-tuesday)
    * [17 Monday](#17-monday)
      * [`Hello`](#type-hello)
      * [`World`](#type-world)
    * [17-24 Week Plan](#17-24-week-plan)
    * [13 Thursday -- 14 Friday](#13-thursday----14-friday)
    * [12 Wednesday](#12-wednesday)
    * [11 Tuesday](#11-tuesday)
    * [10 Monday](#10-monday)
      * [`artd.eco`](#artdeco)
      * [`npm.sucks`](#npmsucks)
      * [`git.sucks`](#gitsucks)
      * [`git.live`](#gitlive)
      * [`dailylog.co`](#dailylogco)
    * [7 Friday](#7-friday)
    * [6 Thursday](#6-thursday)
    * [5 Wednesday](#5-wednesday)
  * [TODO](#todo)
  * [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

# 2018

![https://wakatime.com/ timer](https://wakatime.com/share/@zavr/dc4c568c-1d78-4c3b-a267-8f9deb5c9f25.png)

## September

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

| ![piping to fork](images/18/terminal.gif) |
| ----------------------------------------- |

**FUTURE**

- [ ] Allow mnp to override the package scope when creating packages.

### 27 Thursday: MNP

I have updated the `@mnp/package` which is the default template to create packages to have _Zoroaster_ masks set up, and documentation with section breaks. When integrating the package into the MNP itself, I decided to update it and test with `temp-context`. This would create a new package in the system's temp directory, where a `.mnprc` config file would have to exist. Despite that, there was a bug in the `@wrote/rm` that did not remove symbolic link files. To test the fix for that, I have to update `@wrore/clone` as well because testing required cloning a symbolic link, which was not working either. In the end, all `@wrote/rm`, `@wrote/clone` and `temp-context` were updated to work with symbolic links. In addition, the `temp-context` can take a snapshot of a particular folder in the temp directory.

Additionally, _Zoroaster_ received an important update to be able extend context classes using a proxy. A _Proxy_ is a relatively new feature in JavaScript, but is supported by all Node versions that _Zoroaster_ supports due to `async/await` syntax and object spread operator. The methods of a class were bound manually before to be able to use destructuring on them, in tests, like

```js
import program from '../../src'
import { equal } from 'zoroaster/assert'

export default {
  async 'can run a test'({ contextProp, contextProp2 }) {
    const res = await program(contextProp, contextProp2)
    equal(res, 10)
  },
}
```

This worked fine but not with contexts that were extending other contexts, e.g.,

```js
import TempContext from 'temp-context'

export default class Context extends TempContext {
  get contextProp() {
    return 9
  }
}
```

Using a proxy, the methods are also bound at the time of requiring them, which is more efficient because there is no need to explicitly iterate through each available method and bind it. After the work in _Zoroaster_ was completed, I used the same idea in `@rqt/github` which is the GitHub API I also worked on. Because there would be many methods for the API and they all need to have an access to the token (identification of the user), it is needed to bind them to the instance so that they are able to make signed requests. Initially, I just bound them with standard `bind`, however if we run a server, and for every requests that uses the GitHub API there is a need to perform 1000 bindings, it becomes inefficient. Therefore, _Proxy_ is a great modern solution for dynamically binding methods and I am glad I found an application for it.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

It is not the case that we should be dismissive with ourselves for certain reasonable concerns that we have, e.g., if I don't like something or am upset about something at the work place, part of the reaction would be to tell myself that I should stop moaning about it. It is counter-productive because we have to accept ourselves, especially if the concern is valid. What is needed is to move from the language of complaint, to the language of commitment in a way that would identify what we are not doing about the situation, or what we can do about it. For example, if the concern is "I am never listened to", the commitment would be "The good communication is the core value of the people in this company", or "If I was the boss, I would give a forum to my employees", which shows the commitment to running the company in a way where people receive an opportunity to speak.

Also when converting the complaints into narratives and positives they are moved from the hostile emotional that which has negative feedback in a sense that it tries to keep things as they are to ensure survival, into the rational mind that has positive feedback loop because it seeks constant improvement of things (e.g., the progress science in science is based upon all previous progress). We also gain control of the situation when we rationalise it and come up with a plan of action, rather than just complaining about it.

There is also no need to jump to the identification of the current behaviour as erroneous: "I see my mistake of never speaking up and now I will always do it". Such an attitude is similar to making New Year's resolutions because we start with enthusiasm that quickly dies out in the reality. It is not the point to see what things are going wrong, because they would still be there even if they are solved for a single person. A good leader would attend to the problem and identify its root and cause, and attempt to solve it in a creative way. The point of problems is to learn from them, for example, in school a Match teacher would give homework to solve hard problems rather than easy ones, because she wants pupils to learn by solving them. She would value much less problems that are easy to solve as they do not stretch the minds of pupils. Same in life, when we receive a problem, it is even better if it is hard because it gives us an opportunity to learn from it and come out stronger, cleverer and more prepared for the future.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

On the other hand, when things get emotional and there are deeply rooted feelings, it might be very hard to approach the problem in a mature way. I think a help of a professional such as a therapist can help there. I keep counting after how many seconds I start thinking about me being treated wrong after I wake up and it is usually in around 20-30 seconds. The thought then stays on for the whole day. This has happened before and I would rather much prefer that I was recognised for my true achievements and potential and didn't have this negative mind. It is true to say that people have conditioned me into that mind frame and I know what it would mean to be a happy person. The fact that I can't choose to be it seems to be quite independent of my desire to be it, because I seek justice and revenge. And it is not because I wanted or want something that doesn't belong to me, but because I put my best intentions which were only to be crushed by authoritative brainwashing in one case and arrogance in another. This world is so conditioned into everyone being dependent on everyone else there is very little personal freedom. I want my freedom not to be limited by somebody else's power but that is impossible. I hate the society and close-minded people they are so far behind.

Here a great example of a complaint. Can I make it a commitment? Can I commit to being happy without being dependent on others? Can I commit to making the world a better place where everyone has the respect they deserve including animals and myself? Although I am deeply hurt emotionally time after time, I can learn from these things so that in the end, no matter how far it is, the success will be the sweetest thing.

What things am **I doing to achieve my commitments**?

- [x] I am working hard on my software, solving older bugs and making new features.
- [x] I am reading books to grow my emotional intelligence.
- [x] I am generating new ideas and registering new domains.
- [x] I am writing a blog regarding my work and mind.
- [x] I have a plan on how to continue forward with me being treated wrongly. Although I need to finish _NodeTools_ first, I am getting very close to it.
- [x] I am eating plant-based food that that I don't harm anyone else in my life. Yesterday I cooked for my family.
- [x] I am able to know what happiness is and feel it although now only for a split second a week. This seems to be around 6-7 o'clock and I think it depends on the brightness. The sense of living in the city with its noises and buildings makes me happy as I am a city person.

On the scale from 1-10 I'm at about 5. The thing that would make me feel at 6 next week would me writing more with left hand.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

### 25-26 Tuesday-Wednesday (rqt w/ namecheap)

| ![open vpn on windows](images/18/9-25/compress2.png) |
| ---------------------------------------------------- |

Both days was work on the `@rqt/aqt`, `@rqt/rqt` and `@rqt/namecheap-web` packages. The request library has now been implemented with compression by default, tested with _IdioCore_ and documented more fully, and now used in the web API for _Namecheap_ as planned. The latter can authenticate and white-list IP addresses. Most of the logic was taken out of `expensive` but somewhat refactored and tests added. The next part is to implement the actual API and place it in `expensive`.

The advantage of having a namecheap API separate from _Expensive_ is that it is more easily maintainable, can be tested and documented separately, and reduces the code complexity of both packages. It becomes much more relaxed to make changes related to the API access in the `namecheap-web` package without having to worry about breaking the whole _Expensive_ client. Moreover, now when the compression is implemented in `rqt` (which was the whole purpose of refactoring it into `@rqt/aqt` as well), the amount of transmitted data is much lower (e.g., `15697 B` compressed VS `43434 B` raw).

![namecheap-web CLI](images/18/9-25/namecheap-web.gif)

The compression became important when I used to have internet with a 3G/4G sim card, and had a dynamic IP. These two things really have pushed me to implement white-list of the IP addressed via the web interface and thus features necessary to reduce the data load (a web page can be large). Having limited data was one of the best things happened in summer: it helped to see assumed perceived constants (free fast internet), and then kick of the improvements to the whole spectrum of software, including other packages as well (`expensive` needed `rqt` for compression, `rqt` was dependent on `idio` for testing of compression, `idio` required `documentary` for documentation of middleware using types and documentary made `alamode` possible).

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true" width="15"></a></p>

Part of Tuesday was fighting the bug in the _VS Code_ when automatic type acquisition stopped working for no reason. It lead to installing types locally, such as `@types/koa-router` which repaired it, however it should not be like that -- if there is a feature for automatic installation of types in the background, it should be available. This is because _VS Code_ is the environment chosen for development, and is essentially a part of the _Art Deco Package_. For example, there is no need to install `eslint` to check code style, because it can be installed globally. Additionally, packages rely on the `@type {import('package).Type} Type` feature, which is presumably only available in the _VS Code_, therefore it's the chosen instrument to write code. It'd be a good thing to check what happens in other editors.

On the other hand, it was good to once again acknowledge that even if a package's autocompletion works in its project directory, it does not mean it will work when published and installed from other packages.

<details>
<summary>There can be bugs in <em>VS Code</em> which are so subtle that the suggestions can work when a certain file is open, but stop when it is closed, or rather the other way around.</summary>

![proxied bug](https://user-images.githubusercontent.com/2932786/46033978-6111c180-c0b4-11e8-968c-d6a54b816eba.gif)
</details><br/>

This is why the autocompletion testing service will be such a great tool. It would be able to install packages locally via a file with [`yalc`](https://github.com/whitecolor/yalc) and perform the testing using the _TypeScript_ standalone service.

In the meantime, `npm` does it what it does the best: to suck. I really want the `npm.sucks` domain but it's $199. On the other hand, I managed to renew LinkedIn premium for just £25 a month instead of £50, because just after I cancelled it the day before the free premium expired, I got an offer to renew it for half price :P Nice lifehack. I think it's important to have the premium account and although I only have 12 connections, it's showing I'm not short of money, which is a psychological advantage as well as an image one. £50/month was too much though for something I barely use.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true" width="15"></a></p>

Wednesday was also spent on setting up VPN on a free tiered MS Server. After a few hours of struggling, I managed to get it working. There is limited information on the Web and a couple of good general articles about how to set up _OpenVPN_ on Windows, however none said in straight terms that the software firewall needs to be adjusted. Now I have a free VPN for a year after my $200 of free trial money for one month has burned out. What's good about Azure, is that there are actually 2 virtual machines I am running for free - one linux for web sites, and one windows for VPN.

![open vpn on windows](images/18/9-25/win.png)

It's also becoming more fun to program with the request library and the web server. For the last half a year, I was building the tools that I need to write software according to my standard of quality, and now they successfully work. Developing web-servers and integrations with APIs is a lot of fun because it involves other 3rd party tools and more information is entering the object-environment (sic) field. I can't wait to realise all my and my friends' ideas for websites with the _Idio_ web server. The next big part for it is to write the authentication package, which would connect to the database, allow registration and logging in, with email and text message confirmations. After this is done, it can be reused in any website with just simple installation. And the good thing is, it is very easy to implement. The idea of `@idio` is to create a package for each essential feature, and build a web server for any website in such an easy manner as similar to cooking: just add all ingredients together, perform a little bit of magic for preparing, and get a healthy hearty meal.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/8.svg?sanitize=true" width="15"></a></p>

I wanted to write a book, _Art Deco Node.js_ with all up-to-date practices for developing a modern package, including how to use scopes, implement, test, document and maintain packages. It would take time but I could really shed some light into how I successfully approach the development process including what things are important (first and foremost, developer experience) and how to organise the routine of making Node.js software. The happy world for me would be where I just had my Tier 1 talent visa and didn't have to worry about finding other ways, without the horrible people who don't understand anything about Node criticizing my work without having ever created anything themselves. They are so miserable because of incapacity to really know what they are seeing and arrogantly failing to grasp the true meaning of what's going on. It's really hard to forgive and I don't think I can. It's great to think about more eternal things but when it gets cold and grey it becomes more about survival and hence less romantic and more real. I so badly wish they pay dearly for what things they have said. The plan is to finish with _NodeTools_ so that I can get some real experts on my side who'll confirm my true skill level.

- [ ] Check how types for packages work (or don't work) in other editors.

### 24 Monday: Rqt

![](images/18/rqt.png)

Having completed the _IdioCore_, I went back to the work in progress on the `@rqt` scope. _Rqt_ allows to make network requests, and the underlying package, _Aqt_ (advanced request) was implemented before. The job was to separate request functions into separate ones by logic, i.e., `rqt` for string requests, `bqt` for Buffer requests, `sqt` for streams and `jqt` for _JSON_ object requests. This would allow to correctly infer returned types.

The _VS Code_ insiders had stopped working correctly for discovered types, such as `koa`, in the morning, so I filed a bug in _TypeScript_.

<details>
<summary><a href="https://github.com/Microsoft/TypeScript/issues/27302">Importing types in JS files stopped working.</a></summary>
<table><tr><td>
Since last week, importing of external types has stopped working.

![screen shot 2018-09-24 at 12 47 10](https://user-images.githubusercontent.com/21156791/45945983-06b32b00-bff8-11e8-85ec-0bf834d73f6b.png)

![screen shot 2018-09-24 at 12 52 03](https://user-images.githubusercontent.com/21156791/45946161-b9838900-bff8-11e8-8c16-e701c1c87b84.png)

![screen shot 2018-09-24 at 13 01 20](https://user-images.githubusercontent.com/21156791/45946651-32cfab80-bffa-11e8-9987-184df5aa7f3d.png)

It works in non-insiders. This has definitely worked in insiders fine last week.

![screen shot 2018-09-24 at 12 48 03](https://user-images.githubusercontent.com/21156791/45946018-28acad80-bff8-11e8-92b3-a692e5f3a859.png)

![screen shot 2018-09-24 at 13 02 20](https://user-images.githubusercontent.com/21156791/45946657-382cf600-bffa-11e8-8349-1cbad8244a29.png)


And no I don't want to convert to TypeScript.

![test](https://user-images.githubusercontent.com/21156791/45973889-5ae5fb80-c048-11e8-9100-ccead5b554bc.gif)
</td></tr></table>
</details><br/>

I had to use _VS Code_ non-insiders and forgot to install WakaTime extension there, so the tracking of time for the day has been partly lost.

Despite the bug, it gave me ideas into how autocompletion hints could be implemented. That is, using a [_TypeScript_ standalone server](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29), which is embedded in _VS Code_ and used to show hints. By running the server, it is possible to send requests to it and receive what hints have come up. Such testing would make sure that autocompletion hints are shown. This, however, requires the installation of _TypeScript_ server which can be quite bulky and we strive to reduce dependencies. This means that more native implementation could be done, but this increases the risk that what is tested is not what shows up in the editor, whereas with the _TS_ server, we will know for sure what the _IDE_ will show.

The work of the request library went well and I tested `rqt` against `@idio/core` with implemented compression. I found some problems with documentation of _IdioCore_, when links to types were interfering with links to titles. I updated _Documentary_ to fix this bug, and also implemented parsing of types inside `Object.<string, Type>` which now is also linked. I created a new package, [`typal`](https://github.com/artdecocode/typal) to contain the logic of creating types from XML and serializing them into Markdown. The package needs documenting and refactoring of extraction and generation of type information needs to be moved there as well.

[`import('Cosmos').Intelligence`](https://www.goodreads.com/author/quotes/30378.Sadhguru) __<a name="type-intelligence">`Intelligence`</a>__

__<a name="type-human">`Human`</a>__

|      Name      |                            Type                             |                                                                   Description                                                                   |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| __Character*__ | _Object.&lt;string, [Intelligence](#type-intelligence)&gt;_ | The sign of intelligence is that you are constantly wondering. Idiots are always dead sure about every damn thing they are doing in their life. |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/9.svg?sanitize=true" width="15"></a></p>

Spiritually, there is a thought that even if a person wronged you, it is the best to be grateful to him as he or she moved you closer to the understanding of the true meaning of life. Great many people won't wake up tomorrow, and it is an amazing thing to be alife just now. You do not have to grant people the privilige of making you angry or sad or happy, only you can choose it for yourself. The life is happening right now, and our bodies is the food that we've gathered, our minds is the impressions that we've gathered, but is it us? We can control our thoughts and even choose not to think.

**FUTURE**

- [ ] Write a plugin for _VS Code_ to embed markdown images by drag-n-drop.
- [ ] Work on the autocompletion testing.
- [ ] Fix section breaks in _Documentary_ so that they don't all change after 22.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/10.svg?sanitize=true"></a></p>

### *24-28 Week*

This week I will be working on the _nodejs.tools_ website. Last week I planned to work on the terminal window for _Documentary_ that I want to be in the version 1 of _NodeTools_, however it seems to be quite a lot of work. I have managed to extract typedefs in _Documentary_ and use it to document _IdioCore_ which was good. I also added macros which is a very useful feature and a selling point. No research for Demimonde was conducted as there were a couple of days where I didn't get a chance to work full-time. This week, I will continue working on _Idio_, because I most definitely need a webserver for the websites described below.

I also started switching the infrastructure from Amazon to Microsoft. A year's free trial with 64 GB storage is great, because even a machine with the lowest config can be configured to use SSD swap for memory. Route 53 is therefore ditched in favour of free namecheap's DNS, so that even NS1 is not required.

There were new features to _Zoroaster_ with better mask testing of forks. It is a helpful feature which allows to easily test binary packages. When used in conjunction with `temp-context`, it reduces the chore of setting up tests for Node.js executables. There needs to be a way to read user input when setting up masks for forks.

In addition, I fixed the `medium.com/art_deco` handle so that I can use it later to promote _NodeTools_. This will be the new name for the _Art Deco Package_ concept, because the tools are for Node.js, but they will follow the _Art Deco_ philosophy. There needs to be an explanation of what the characteristics of this philosophy are, such as minimal dependencies, separation of concerns into scopes, and full attention to the developer experience.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/11.svg?sanitize=true" width="15"></a></p>

Since Node 10, there is going to be a way to create a coverage report using V8 coverage, such that no transformation of code is ever necessary. It is great because it removes the need to orchestrate code with markers used for coverage, and it means there does not need to be any _AST_ analyser. This has been implemented with [c8](https://github.com/bcoe/c8), however this package has the dependencies to transform into istanbul reports. I want to make my own tool, _Tutankhamun_ to be generate coverage reports, both client-side and as a service for GitHub integration. It could be hosted either at [Tutankhamun.io](Tutankhamun.io) or [Tutankhamen.co](Tutankhamen.co).

Moreover, one of the outcomes of last week was that _MNP_ as a website should also be part of the version one. Its features can be:

1. Analyse packages for number of lines of code / tests / documentation for each release.
1. Seeing what position a package is at for each of its keywords.
1. Adding a pixel tag to gather `referer` headers to see where users of packages come from (which search terms or tags).
1. Breaking down the scoring algorithm used by the search engine to suggest improvements, such as *Close 5 issues to climb up 5 positions*.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/12.svg?sanitize=true" width="15"></a></p>

The planning therefore is as follows:

**LAST WEEK'S**

- [ ] Publish _IdioCore_.
- [ ] _Rqt_: make use of `@idio/core` in testing by updating the `https-context`.
- [ ] _Expensive_: Use the new `@rqt/rqt` in the project, and allow to fetch Whois data.

**WORK**

- [ ] Work on separating the router, database and _JSX_ from `idio` into `@idio`-scoped smaller packages.
- [ ] Run `mnpjs.org` website.
- [ ] Create `nodejs.tools` website.
- [ ] Write `zarathustra` example for _Zoroaster_.
- [ ] Add a binary package structure for MNP.

**POSSIBLE**

- [ ] Implement the local version of the Tutankhamun.

**LONG TERM**

- [ ] `fork-context` package to spawn processes and send data to them. This could also be part of `zoroaster`'s fork mask property.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/13.svg?sanitize=true"></a></p>

### 21 Friday: IdioCore

Today there was more effort on making Macros available in _Documentary_, and then documenting and refactoring middleware setup logic in the `@idio/core`. Macros worked well together, and I added some logos to each middleware.

| ![logos to middleware](images/18/9-21/logos.png) |
| ------------------------------------------------ |

In the end, I tried to record an [_Appshot_](https://github.com/artdecocode/appshot) of the _VS Code_ when creating a server using _IdioCore_. I used [_Aty_](https://github.com/artdecocode/aty) to type commands automatically, however when combined with a recording, the program would lag and result in a delay, which made the whole recording impossible. In the end, I just had to do it by hand. This means that there needs to be another way to record examples of developer experience, e.g., by creating a _VS Code_ plugin. It could then also record SVGs rather than gifs.

![logos to middleware](images/18/9-21/app2.gif)

**FUTURE**
- [ ] Write a plugin for _VS Code_ for automatic typing of code, with delays and short-keys such as to expand hints.
- [ ] Improve _Appshot_ to have a web interface, with visual selection of windows, and selecting the cropping area of the window.
- [ ] Display an error in the `window-info` package, such as when Python does not have `Quartz` library installed.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/14.svg?sanitize=true"></a></p>

### 20 Thursday: Watts

[<img alt="Those who know do not speak; Those who speak do not know." src="images/18/9-21/watts.svg" width="100%">](https://en.wikipedia.org/wiki/The_Way_of_Zen)

In the morning, I focused on releasing the work from yesterday, including the new `fork` of _Zoroaster_, `spawncommand` and the bug-fix in the _ÀLaMode_, which was then also added to _Zoroaster_. New integration tests using masks were also added to _Zoroaster_, and its introductory description was updated.

In the evening, I restarted the work on `@idio/core` with the updated _Documentary_ with proper linking of types. This was put away about a month and a half ago, when I started working on _ÀLaMode_. Now I could come back to it and apply the newer features. I also then discovered a few bugs in _Documentary_ such as incorrect parsing of files to extract types, and experiencing an error when parsing JSON tables with `null` data in it. Those were fixed, and I started working on the Macro feature for _Documentary_ which would work as patterns for inserting data.

Finally, I listened to Alan Watts lectures and started to get back to Zen. I have always loved it but now I feel more mature to embrace it in my life. Same as developing software for _Art Deco_, making it better and better over time, I have been improving myself and perception and understanding of life and the universe. By not listening to any "spiritual" lectures, it is easy to forget about the importance of calming the mind down and not being stuck the future or the past. However, the mind is still important as an instrument for planning and performing work to get somewhere in life where I'd feel comfortable.

> [<img src="images/18/9-21/watts.jpg" align="right">](https://www.youtube.com/watch?v=_gbUVnmVJws) Karma (KRI) - action (do). When something happens to me, say I have an accident or an illness, a buddhist or a hindu would say "it was your Karma". The implication is, you have done something wrong in the past as a result of which you reap this unfortunate consequence at a later time. That's not real meaning of Karma. Karma does not mean cause and effect, it simply means "doing", in other words, "you are doing what happens to you". This of course depends upon how you define the term you -- e.g., breathing, am I doing it or is it happening to me? You can look at it either way. I'm growing my hair -- am I doing it or is it happening to me? You can look at it either way. I'm being sick, I'm being destroyed in an accident. If I define myself as the whole field of events, "organism-environment field" which is the real me, then all the things that happen to me may be called my doing. And this is the real sense of Karma. But when we speak about freedom from Karma, freedom from being the puppet of the past, that simply involves the change of your thinking. It involves in other words your getting rid of the habit of thought whereby you define yourself as the result of what has gone before, and instead get into the more plausible and more reasonable habit of thought in terms of which you don't define yourself in terms of what you've done before, but in terms of what're doing now. And that is liberation from the ridiculous situation of being a dog wagged by its tail.

Although it's great to live in the moment and realise that all things we've accumulated into ourself, such as attachments to people, things and concepts, are illusions of the mind, I still can't reconcile the letting go of those illusions projected onto ego, and the feeling of justice. If something is not fair, there should be consequences for it. You can meditate all day long on the unimportance of early things, but when there come bulldozers to tear up your village where you're sitting, are you supposed to just let it happen thinking that the river of life is constantly moving and the Universe knows the best? Maybe Universe does know the perfect harmony but the human mind is greedy and corrupt.

The body is just as important as the soul because we spend most of our time there, and being spiritual does not mean rejecting the needs and pleasures of the body -- that has a different name, _nihilism_, which is loved so much by religions that tell us that our life here is nothing compared to the Kingdom of God _etc_. It is only a trick they use to confuse people by tapping into they non-knowing of what happens after death. The simplest solution to this question is to just not think about it. Why do you want to know what you will never know. You just have to wait and see. The fact that somebody tells you about it already means it's a complete lie and a trap.

Why not focus on what is material, the body, justice, emotions and feelings but the real ones and not imaginary, fearful and made up by the mind. To differentiate between what is real and what is not I guess you have to meditate for a short time, and the artificial pursuits will be gone as the mind quietens down. The subconscious always knows the best course of action and we just puzzle it by over-thinking. But the longer you've thought about certain things in the past, the more real they would seem and the harder it will be to let go of them. And this goes all the way up to our birth. Then again, one could assume that everything is artificial in this logic, but it's not because there must be some sense of what is right and natural rather than an influence of the collective mind and its consequence.

In the end, the rent must be paid, and I want to be somewhere where I don't have to depend on paying it, and therefore my work, skill and ideas are real, because they will materialise the things in the physical world. Being upset about things without doing anything will not get me anywhere and will only slow me down. What you can't change you should let go of or change your perception of it. If there is a hope you can change it with a reasonable plan, I believe you should and need to try, because trying and doing is also material. But believe in the plan and picture its success rather than come back to the past over and over again, because the subconscious works the best on positive directions it is given. Choose to be happy and calm by affirming it with your heart. There is more to life than to keep old grudges. It's easy if you choose it to be because who is the person who is making it hard? Is it not you? Is it not the mind which would otherwise have nothing to do? Now you have the power over it because you're spotted its disguise, so you can tell it to stop right now and to just be quiet. Every breath taken brings the joy and wonder of being alive and of what is to come.

**FUTURE**

- [ ] Add parsing of types inside of functions in _Documentary_.
- [ ] Think positively and make believe that it is easy to let go and be sure that the Universe will find the way to express its harmony once the negative thoughts are stopped being projected onto the matrix of the "organism-environment field" any more.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/15.svg?sanitize=true"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/16.svg?sanitize=true" width="15"></a></p>

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

[`import('where').Running`](https://why-are-you-running.com) __<a name="type-running">`Running`</a>__: The process of moving fast from and to a certain location.

__<a name="type-you">`You`</a>__: It is you.

|   Name   |                    Type                    |     Description      |
| -------- | ------------------------------------------ | -------------------- |
| __why*__ | _Promise.&lt;[Running](#type-running)&gt;_ | Why are you running? |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/17.svg?sanitize=true" width="15"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/18.svg?sanitize=true"></a></p>

### 18 Tuesday

_Added: 19 Sep 2018 7:00_

![](images/18/9-18/ÀLaMode.png)

I fixed the bug in the `@a-la/import` to allow importing from Babel-compiled packages. I also improved the tests by writing evaluation tests, where the transpiled code will be run in a new VM context, making sure that it does work, rather than just to see what it looks like. This testing strategy is a high-level integration test and allows to be sure that modules will be exported and correctly.

There was some other business to attend to therefore no more programming was completed. In the evening, I switched off one of the virtual machines on Amazon which was used only to display the stats of how much work I had done in Kibana gathered by `analyse-package`, such as added lines of source, documentation, tests, number of commits and releases. In future, this will be part of the _MNP_.

![](images/18/9-18/code.png)

I also set up a new VM on Azure, where the cost is £10 per month, and I get a free tier. I installed a Dokku container there, which allows to run websites. I pointed `artd.eco` and `alamode.cc` domains to this VM, meaning that these websites are now working with "Hello World" message. I have done that with the namecheap.com free DNS, therefore I can also switch off Route 53 zones which cost £0.50 a month. The steps required to set up a static HTML served via HTTPS in a new Dokku app are currently repetitive:

1. Point DNS at namecheap.com to the Azure's VM IP address.
1. Make a new package with _MNP_.
1. Copy a `Dockerfile` and `nginx.conf`.
1. Add a git remote, `git remote add dokku dokku@artd.eco:website.com`.
1. Push to git remote.
1. Login to the VM, add `letsencrypt` environment variable.
1. Run the `dokku letsencrypt` command against the app.

There are two ways to approach publishing a website, for example for ÀLaMode:

1. To create a separate repository in the organisation, e.g., `a-la/alamode.cc` specifically made for the website, and use a `website` _MNP_ package to create a basic version. It would also allow to run scripts such as adding a remote, creating an app and setting the letsencrypt flag before hand. _MNP_ could be modified to ask structure-specific questions such as a domain name.
1. To use existing package, such as `a-la/alamode` to have a website folder, in which all information can be put. That way, documentation from _Documentary_ could potentially be compiled in the website dir, and published online. The steps required to do that would be to to process more markdown, which is currently being taken care of by GitHub. It would also be possible to run example blocks and let visitors modify the input to functions to see how the output changes.

In comparison to GitHub pages, the advantage of putting a website in a HEAD branch is that there is no need to maintain a separate branch for the website. On the other hand, not even a simple server needs to be started when using GitHub pages.

Furthermore, it is uncertain which organisation to use for website packages. By putting them in the `artdecocode` organisation with Node.js packages, it makes the directory more crowded as there is less separation between packages and website. This could be solved by adding `artdecowww` `artdecoweb` organisations, for instance. The organisation could also be kept the same, but a different folder is used. By providing a question for the default structure during _MNP_ initialisation, all new packages could be setup to be websites by default.

[<img src="images/18/9-18/docks.svg" align="right" height="75">](https://docks.cc)
There is also a possibility for the `docks` software which would allow to control via a web-interface and CLI all the running Dokku apps, and in future even spawn new virtual machines. Unfortunately, the `docks` package is taken, but the namespace `@docks` is free. On GitHub, the org seems also to belong to an inactive account. By providing a web-interface, the whole process of managing apps could be simplified and abstracted so that no knowledge of the fact that it is based on Dokku is required. It could then be expanded to platform providers such as Heroku as well.

**FUTURE**

- [ ] Fix a bug in ÀLaMode when a completely empty file is processed.
- [ ] Implement `yarn doc commit message` to automatically push the committed changes.
- [ ] Add `node-exiftool` to _Documentary_ to add copyright metadata to images.
- [ ] Add a feature to _Documentary_ to be able to compile a text in SVG with a given font via spawning Chrome and drawing on canvas, therefore it should be a plugin since it's an advanced functionality which would require additional dependencies such as `Chrome Launcher`.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/19.svg?sanitize=true"></a></p>

### 17 Monday

_Added: 17 Sep 2018 23:54_

It was nice to see the climb in the download count of _Documentary_, which reached 600+ weekly downloads. It is much more than last week, and possibly because more tags were added.

<a href="https://npmjs.com/package/documentary">![download count](images/18-17/600.gif)</a>

Tags are important for discoverability, therefore I think the increase in downloads might have been because of the `table of contents` tag.

![tags git blame](images/18-17/tags.png)

It would be useful to be able to see at which position in the search a package is against each of its tags. For the `documentation` tag, _Documentary_ is currently somewhere around 400 position, although it's a really great package. However, when it becomes more popular the position will improve as well, as the score is partly calculated according to popularity. _MNP_ should be able to analyse the tags, and it could be possible to install an image on a package page, which would call the _MNP_ server and tell the referrer of the page (i.e. which page people came from). This would show the search query and tags that people found the package from. I am not 100% sure it's technically possible, but there does not seem to be a proxy for an image, like it is on GitHub to prevent this sort of spying. Although it might be unethical, the method is only proposed to analyse and improve the marketing of packages using tags, and is not intended to breach privacy. In any way, NPM has a way to protect against this, but they never will because NPM sucks big time. Just the fact that they had to use somebody else's search engine for packages on their own website shows how desperate the company is.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/20.svg?sanitize=true" width="15"></a></p>

| <a href='https://github.com/artdecocode/documentary'>![documentary documentation pre-processor](images/18-17/17.png)</a> |
| ------------------------------------------------------------------------------------------------------------------------ |
| 17 September is a good day to release `documentary@1.17`.                                          |

Today was a good and productive day, when I focussed on the **essential** work to implement linking of `@typedef` titles across the whole documentation. This feature was needed to continue with `@idio/core` to describe different sections of the configuration in multiple sections of the documentation, but be able to link to them from the overall, combined configuration.

`import('NodeJS').JavaScript` __<a name="type-javascript">`JavaScript`</a>__

__<a name="type-hello">`Hello`</a>__: When life gives you lemons, make a lemonade.

__<a name="type-world">`World`</a>__: Freedom (n.): To ask nothing. To expect nothing. To depend on nothing.

|      Name      |               Type               |                                          Description                                          |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| __integrity*__ | _[Hello](#type-hello)_           | Integrity is the ability to stand by an idea.                                                 |
| __evidence*__  | _[JavaScript](#type-javascript)_ | The hardest thing to explain is the glaringly evident which everybody has decided not to see. |

I started working on implementing this feature _Documentary_ by writing tests. I realised that the tests could be improved as well which was a work in progress, when instead of re-writing the same code many times to test different inputs for the same transformation, I used _Zoroaster_ masks. I then also improved _Zoroaster_ to be able to read the stream automatically, and compare it to a masks output.

<a href="https://github.com/artdecocode/zoroaster">![zoroaster javascript context testing framework](images/18-17/zoroaster.png)</a>

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

````markdown
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

> <img src="images/18-17/factory.svg" align="right" height="70"> A mask **factory** is a function which takes the location of the mask file on a computer and creates a mask test suite. It is called a factory because it is used to create objects according to certain process. In case of _Zoroaster_, an object is a test suite which contains any number of tests, or other test suites.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/21.svg?sanitize=true" width="15"></a></p>

It was nice to work during the day, and it felt like actual work rather than a full-time hobby because I started at 9am rather than some random time I used to start in previous weeks. I feel more organise with proper planning, however I don't believe it's that important because I was doing a lot of work before planning as well. This means that although there's more structure, it does not mean that the end result is any better. It's just the attitude, and also allows to take things more seriously, i.e. I felt pretty much like at a job, with a short lunch break and some tiredness by 5:30, almost ready to go home (from home lol). Despite that, the feeling was very positive because of the fact that I am not working for somebody building what they want so that I can spend half of the money on rent _etc_, but doing what _I_ love to do, and what _I_ find important, that is, my company. There was a sense of connection with the world as well and other people because everybody is just doing what they can. It's really this expanded perception from bird-view that is related to the awareness of how everything on the planet and in both human and animal societies is connected. It might be called collective unconsciousness because we all exist together and there is always cause and effect. To perceive this is like to slow down time and be able to take in the more general view of the whole planet. However, it might be just a trick of the mind due to fatigue.

Finally, I also fixed a bug in `mismatch@1.0.3` necessary to implement masks. This brings the number of releases today to solid 3. Moreover, I found an important bug in _À La Mode_ which needs fixing. This will allow me to update _À La Import_ package in which the bug is present to the latest _Zoroaster_ and make the best use of the new masks.

<img src="images/18-17/adc.svg" align="left" height="200"/> I also thought about marking ideas for the Art Deco package, and realised I could add a note when packages are installed, so that those 600 downloads of _Documentary_ would have shown 600 messages promoting Art Deco package in a form similar to "Thanks for choosing _Documentary_. It is part of Art Deco packages which include a modern context-testing framework _Zoroaster_ and a regex-based transpiler _À La Mode_. Are you tired of Babel and Mocha with 6000 dependencies? Stand out from the crowd by starting to use Art Deco packages".

**FUTURE**

- [ ] Fix the `import default, { named } from 'package'` bug in _À La Mode_.

**TIME**

![times](images/18-17/time2.png)

### 17-24 Week Plan

_Added: 17 Sep 2018 09:10_

The `daily-log` has allowed to see the progress being made each week, with the structure of the workflow emerging. Now, to enhance the productivity even more, I will plan a week ahead. Although things might not go as planned, it is good to put down a general vision for the work that needs to be covered.

This week can be structured in the similar way as the last one, with 2 days working on _SvAG_ + _Documentary_, then one-two days on _Demimonde_ research, and finally getting back to _Zoroaster_ and _À La Mode_.

**ESSENTIAL**

- _SVaG_: make a terminal package to print terminal output in a window, i.e., fork https://github.com/F1LT3R/ansi-to-svg, or rewrite manually.
- _Documentary_: integrate the `@svag/terminal` package to be able to print output as an image.
- _Documentary_: implement some form of caching.
- _Zoroaster_: document masks and write a good example of using test contexts (create a `zarathustra` package).

- _À La Mode _: write the transpilation on-demand feature which would evaluate the code first and find instances of `import` and `export` this way.
- _Demimonde_: create a "brand" website to find out how it could benefit from using `demimonde`. This will go in the pitch desk.

**WORK**

- [x] ~~_Documentary_: extract all `@typedefs` first to be able to link them across the whole README.~~
- [x] ~~_Idio_: get back to finishing off the documentation written for the `@idio/core`~~, publish it.
- _Rqt_: make use of `@idio/core` in testing by updating the `https-context`.
- _Expensive_: Use the new `@rqt/rqt` in the project, and allow to fetch Whois data.

**DEVOPS**

- Migrate from Route 53 to the NS1 to cut the costs.
- [x] ~~Switch off some servers as now using Azure~~, look into a green hosting provider.

**LABS**

- An integration service for GitHub to automatically compile documentation server-side (not on a dev laptop). This would save time and allow only to push without having to run `yarn doc` command.
- The `moderne` tool which runs a server and monitors changes to the files, etc.
- `xml` transform for `@a-la/alamode` which would allow to write JSX-like syntax in code. This could then be used in `@svag` packages.

---

With the _Art Deco_ JavaScript, it looks like the project could be ready for a good start soon. When _Documentary_ receives an animated terminal, _Zoroaster_ gets a well-composed example, and _À La Mode_ can transpile files on-the-fly, the functional part of the product comes to the release of the first version. It will be time then to think about which domain name to use for the concept, and devise a marketing plan for the best launch. However, it might have to wait before the work in the `labs` section gets implemented, including the `moderne` package, because it seems that it might be an essential part of the project.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/22.svg?sanitize=true"></a></p>



### 13 Thursday -- 14 Friday

Today I decided to complete the update for _Pedantry_ to be able to compile the blog correctly in the descenting order by date. It was implemented using a natural sort available in JavaScript therefore it wasn't complicated. Other features included adding a single new line or a blank line (two new lines) between each file read by _Pedantry_.

![https://artdeco.bz](images/18-13/art-deco.png)

After that, I worked on updating the documentation for _Documentary_ to re-organise the sections and make the features more prominent. The fork feature got its own section, and the documentation now begins with the **key features** so that anyone who accesses the package can see its advantages straight away. In addition, I looked for some Art Deco images to add to each feature, and found a few [free fonts](https://www.1001fonts.com/art-deco-fonts.html), some including *borders* and *dingats*. There is also a nice [Art Deco](https://www.1001fonts.com/aerovias-brasil-nf-font.html) font used for the logo of this post.

![https://www.1001fonts.com/decoborders-font.html](images/18-13/decoborders.png)
![https://www.1001fonts.com/decodingbats1-font.html](images/18-13/decodingbats.png)

There was also an ornaments font:

![https://www.1001fonts.com/foglihtendeh0-font.html](images/18-13/fog.png)

It inspired me to use symbols from it as separators for each section in documentations. It worked really well by dividing the space, making it more clear when sections come to an end (especially important for larger sections with sub-sections), and can be used to jump back to the table of contents.

By the morning, when I wrote description of the section breaks, something unexpected happened -- _Documentary_ stopped working and didn't output the correct README file. Having spent a few hours debugging it, the conclusion was a groan "I don't why it is not working... agggrh". When the part with the description of the section breaks was taken out completely, or a few lines from it were removed, _Documentary_ worked again. The general idea was that there was too much data, which might not have been the problem before as there's an internal buffer, but could have become now when this buffer overflowed. And so I went to sleep.

> TIMER: 8.30 (without browsing for fonts, extracting SVGs)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

_Documentary_ works in 2 stages: first, it creates a stream of data from a directory with separate files. It pipes that stream into a _Toc_ generator, which extracts the titles so that it can construct the table of contents. The second stage is run afterwards, because when we see the `%TOC%` marker, we need to replace it with the table of contents, therefore we have to scan the whole document for headings first. But because I wanted to reuse the stream of data for both documentation and the Toc, I piped it into a dummy proxy stream, and paused it, and unpaused when the Toc was ready. The idea was that it would accumulate all data in a buffer, which would then be allowed to flow when the Toc is built. There was no problems with it before, but when there was too much data, it stopped working.

> <img src="images/hand.svg" align="right" height="45"> A proper reconstruction of the issue described above should be constructed to fully understand the underlying processes.

The solution was to be generous and create a new stream of data from a directory rather than trying to reuse a buffered one. It worked right away after the implementation as well. The good point is that some other parts of the software were rewritten for easier understanding and maintenance in the future.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true" width="10"></a></p>

When I tried to compile _Documentary_ with _Alamode_, I faced a problem that the svg image files were also processed by the transpiler, which in addition added source maps to it. This shouldn't happen because only JS and JSX files need to be processed by it. Therefore, _Alamode_ also required an update which was added to it.

To improve testing, a `test-context` package was created, and 2 new packages added, including `@wrote/rm` and `@wrote/clone`. The `@wrote/clone` is also used in the _Documentary_ to copy the section breaks images into the repository which uses them, however there was an issue with `@wrote/ensure-path` when paths for both images were being recursively created at the same time in parallel. This was an old problem faced even a year ago with `wrote`. I finally fixed it.

<a href="https://en.wikipedia.org/wiki/L%C3%A9on_Bakst"><img src="images/18-13/bakst2.jpg" width="350" align="right"></a>

For the [`wrote`](https://github.com/wrote) org, which is a set of packages to work with the filesystem, I added a logo and found a good domain name. The logo is by Léon Bakst who was a Russian painter (January 27, 1866 -- December 27, 1924). And we share the birthday date! He was also born in Hrodna, Belarus - an area where my dad comes from.

It is really interesting how orgs and package name spaces can work so well together. The scopes look good as well, and I need to find a scope for test contexts, such as `@context/temp` rather than `temp-context`. To me, these two look as version 2 against version 1. And MNP is great at allowing to create packages with scopes and orgs.

**NEW PACKAGES**

- [`temp-context`](https://github.com/wrote/temp-context): provide each test with a new temp folder, which is a blank sheet (thx 🇰🇪 for the analogy) on which a test can write. At the end of the test, a snapshot of the sheet can be taken to compare against expected results.
- [`@wrote/rm`](https://github.com/wrote/rm): delete a file or a directory.
- [`@wrote/clone`](https://github.com/wrote/clone): clone a file or a directory.

**FUTURE**

1. Automatic section breaks, without the need to explicitly add them.
1. Create `fs-context` to work with the filesystem (e.g., read files and assert that they exists) which the `temp-context` can then extends.

> TIMER: 10 hours

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>### 12 Wednesday

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

````markdown
%TOC%

```## methodTitle
```

## Packages

%TABLE-MACRO Packages
**[$1](t)**, [$1](https://artdeco.bz/$1), $2
%
```table Packages
[
  ["Name", "Link", "Downloads"],
  ["zoroaster", "300"],
  ["documentary", "500"],
  ["mnp", "1000"]
]
```
````

```markdown
- [`methodTitle()`](#methodtitle-void)
- [Packages](#packages)
  * [zoroaster](#zoroaster)
  * [documentary](#documentary)
  * [mnp](#mnp)

## `methodTitle(): void`

## Packages

|         Name         |                     Link                      | Downloads |
| -------------------- | --------------------------------------------- | --------- |
| **<a name="zoroaster">zoroaster</a>**   | [zoroaster](https://artdeco.bz/zoroaster)     | 300       |
| **<a name="documentary">documentary</a>** | [documentary](https://artdeco.bz/documentary) | 500       |
| **<a name="mnp">mnp</a>**         | [mnp](https://artdeco.bz/mnp)                 | 1000      |
```

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

### 11 Tuesday

Market research for _Demimonde_ and coming up with ideas.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

### 10 Monday

When checking out the repository on the phone using mobile Safari, the image did not look sharp, because the filter made it into a raster and the quality was lost. The fix was to implement the shadow as a separate element. The problem did not arise on the desktop because images were not resized, however now with the example below it is clear that it could also have happened for larger images.

<table>
<thead>
 <tr>
  <th>
   Shadow On Window
  </th>
  <th>
   Standalone Shadow
  </th>
 </tr>
</thead>
<tbody>
  <tr>
   <td>
   <img alt="Shadow on Window" src="https://raw.github.com/artdecocode/daily-log/master/images/window.svg?sanitize=true">
   </td>
   <td>
   <img alt="Standalone Shadow" src="https://raw.github.com/artdecocode/daily-log/master/images/window2.svg?sanitize=true">
   </td>
  </tr>
</tbody>
</table>

<a href="https://github.com/artdecocode/daily-log/blob/master/shadow.md">![Compare Shadows on iPhone](images/18-10/compare.png)</a>

There were a number of solutions that were thought about and tried out.

1. Using the CSS filter to create a shadow. The GitHub's sanitiser actually allows to have the `<style>` tag inside of the CSS. The box-shadow did not work, therefore the `filter: box-shadow()` had to be used. This worked fine on the browser, however did not work on the phone. As it turns out ([Why is filter(drop-shadow) causing my SVG to disappear in Safari?](https://stackoverflow.com/questions/36705323/why-is-filterdrop-shadow-causing-my-svg-to-disappear-in-safari)) there's a bug in older Safari which prevents the `-webkit-filter: drop-shadow` from working. Also interestingly, the sanitiser removes the `-moz-filter` property from the style.

    ```css
    svg {
      -webkit-filter: drop-shadow(0 22px 20px rgba(0, 0, 0, 0.5));
      -moz-filter: drop-shadow(0 22px 20px rgba(0, 0, 0, 0.5));
      -ms-filter: drop-shadow(0 22px 20px rgba(0, 0, 0, 0.5));
      filter: drop-shadow(0 22px 20px rgba(0, 0, 0, 0.5));
    }
    ```

1. Trying to emulate the gradient using the `radial-gradient`. This also does not work because the radial gradient cannot be rectangular as first thought. <br/>
   ![radial gradient](images/18-10/radial.svg)
<br/>There was a proposal ([Advanced Gradients for SVG](http://www.svgopen.org/2011/papers/18-Advanced_Gradients_for_SVG/)) by _Tavmjong Bah_ who is a developer / documenter (nice job) at Inkscape to include more complex gradients, and it looked really cool, however it never ended in the spec. Great work Tavmjong nevertheless ⭕ The article really shows how pro some people are.<br/>
    ![mesh petal](images/18-10/mesh_petal.png?)
<br/>Then I was considering applying a transform to the radial gradient, e.g., skewing or a matrix, however it's too complicated. Adding multiple shapes with its own gradient such as 4 circles on corners and rectangles inbetween seems complex as well, as there's no straight forward understanding as how they would look together.

1. Thinking about generating a single array of dots for the shadow, and filling with radial gradients between corners. This would make the filesize large, however is a possible solution.

1. Finally, the real solution which comes as an insight, is to only apply the shadow only to a separate element. Because the mobile browser would resize this one separately from the main window, the window would not be rasterised and would look fine. This proved to be true. 🎸

```svg
<g filter="url(#shadow)" transform="translate(55, 25)">
  <defs>
    <filter id="shadow" width="132%" height="180%" x="-16%" y="-19%">
      <feOffset dx="0" dy="25" in="SourceAlpha" result="so"/>
      <feGaussianBlur in="so" result="sb" stdDeviation="27.5"/>
      <feColorMatrix in="sb" result="sm" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"/>
      <!-- The merge is actually removed in the later version -->
      <feMerge>
        <feMergeNode in="sm"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="360" height="132" fill="white" rx="6" />
</g>
<g id="the-window">
  <!-- code for drawing the window -->
</g>
```

Time spent on the problem: ~3 hours.

**TODO**

1. Update `pedantry` to allow reverse reading of files (e.g., for this blog to start from the last day every time to show most recent items)
1. Update `pedantry` to parse the number before each file properly to prevent `11` going before `2`.
1. Update `svag` packages to use correct shadow without loosing quality.
1. ~~Add screenshots here from the iPhone to show poor quality.~~

<hr/>

First thing after sleep was to register the <a name="artdeco">`artd.eco`</a> domain which I absolutely love. This is one of the best things I've ever registered. Happy happy happy. I might save up $3000 and buy `artdeco.io` later since it seems to be the only available and somewhat affordable one.

The second part of the day was spent on implementing the shadow in the `@svag` org by updating the library as well as other packages. Some extra attributes could be omitted as they had a default value (e.g., gradient starting at `y=0%` and same for the line behind the toolbar, `x=0`).

The `@svag/lib` was improved in version 2 for better `makeElement` signature which would take the name of the element as the first argument as it was compulsory anyway. The `rect` element was added and its documentation copied from the MDN website, however in future this process can be automated. The `@svag/toolbar`, `@svag/shadow` and `@svag/window` were updated to use the newer version of `makeElement`, and some TODOs were fixed in them as well, such as absolute paths to the SVG files. The `@svag/shadow` was also updated to be a separate element to prevent the loss of quality of resize, and incorporated into the `@svag/window`.

The `@svag` packages can benefit from `alamode` implementing a transform to parse `xml` in the same way as `jsx` parsing works. This means that the code could be transformed into a developer friendly version, e.g., instead of writing

```js
const rect = makeElement('rect', {
  width: 10,
  height: 20,
})
```

it would be possible to write

```jsx
const rect = <rect width={10} height={20}/>
```

which would be absolutely amazing if done with `alamode` (it was one of the goals of the regex transpiler project from the beginning). The source maps could be hard to implement but we love challenges.

The shadow was implemented, and even improved by removing merging it with the window element, so that the window which produces the shadow is transparent and only the shadow is visible. This ensures that it looks very clear on the mobiles.

![clear-shadow](images/18-10/shadow.png)

There is a domain zone `.sucks`. This would be suitable for <a name="npmsucks">`npm.sucks`</a> because for some reason they don't support relative urls on the `@svag` packages. Initially I thought it was the case due to trying to embed SVGs but it also does not work with PNGs. This could be because the org was named `svagjs` before, however I'm not sure. +1 in the list of things why `npm` sucks. The domains are expensive however, ~$260.

**<a name="gitsucks">`git.sucks`</a>** After implementing the shadow, I was so exhausted by all the chore jobs that I had to do such as linking the scoped packages so that they can interact together, building them when needed, documenting and building documentation, reverting commits when things went wrong, running `build` and `test-build` before releasing multiple times, unlinking packages, installing new versions so that they can be tested, writing changelog messages _etc_. I realised I use `git` command to much, and instead of coding have to deal with all the unnecessary manual work. What I really want to do is:

1. Code
1. Test
1. Document

The mostly `build` and `commit` phase should be taken out of the process completely. There should be a new branch for a feature in each of the relevant packages, which would get updated w/ build and doc automatically, and then merged when everything is ready in other packages, which would then unlink the package and install it from the NPM to test against the published version. I produce a lot of commits and my motto is `commits are free` because it doesn't really matter how many commits there are. But also, if it doesn't matter, there should be no reason why I couldn't do with a single commit for a feature. Or there could be at least multiple commits for different parts of the code, but there should not be manual commits for any of the `build` jobs, be it the code or documentation. I think `moderne` is the package which could do it, however it's not just the question of using a package, but of organisation of work and habits, therefore I'm still trying to come up with requirements. Some of them are:

1. Define a group of packages, e.g., `@svag/window`, `@svag/lib`, _etc_.
1. Create a git branch for each of them when working on a new feature.
1. Link the packages together.
1. Monitor changes to the code, build and run tests against build. Also build documentation.
1. Keep pushing to GitHub whenever new code is ready. There should be no manual git push and the `git` command should be forgotten.
1. Possibly there should be a plugin for VS Code which would show the status of the group, however this can be done in the CLI as well.
1. Possibly a GUI interface to prepare a merge and publish, with a changelog message, however this could also be done in the CLI.
1. Unlinking packages and installing published versions, taking them off the stack one by one.

<a name="gitlive">`git.live`</a> should allow to focus on actual coding and not writing commit messages and force pushing to the remote. It's really tiring. The problem is probably met by other developers as well, and it could be a great tool to make. `documentary` is actually somewhat solving it for documentation by allowing to reset commits and push new versions automatically, however there's still no support for updating examples and including them in commits. `moderne` would then extend this logic to the `build` folder as well, although this could be done with `alamode --watch`.

The daily log could get its own domain, such as <a name="dailylogco">`dailylog.co`</a>. Gosh I love domains, especially `.co`.

**FUTURE**

- Add the `xml` parsing in ALaMode via `jsx` module loader.
- Implement the watch mode in `alamode`.
- Watch and auto-commit changes to examples in `documentary`.

> Timer: 9.30 + 3.12 = 12.42 Hours

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>



### 7 Friday

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
  const p = makeElement('path', {
    attributes: {
      d,
    },
  })
  return p
}
const corners = [
  drawPath({ x: 0, y: 50 }, { x: 50, y: 0 }),
  drawPath({ x: 50, y: 0 }, { x: 100, y: 50 }),
  drawPath({ x: 100, y: 50 }, { x: 50, y: 100 }),
  drawPath({ x: 50, y: 100 }, { x: 0, y: 50 }),
]

const g = makeElement('g', {
  attributes: {
    stroke: 'green',
    fill: 'red',
    'stroke-width': '2',
  },
  content: corners,
})

const image = svg({
  content: makeElement('g', {
    attributes: {
      transform: 'translate(2,2)',
    },
    content: g,
  }),
  width: 110,
  height: 110,
  stretch: false,
})

console.log(image)
writeFileSync('images/rounded-corners.svg', image)
```

```svg
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0, 0, 110, 110" width="110px" height="110px">
  <g transform="translate(2,2)">
    <g stroke="green" fill="red" stroke-width="2">
      <path d="M0,50 C 0 25, 25 0, 50 0"/>
      <path d="M50,0 C 75 0, 100 25, 100 50"/>
      <path d="M100,50 C 100 75, 75 100, 50 100"/>
      <path d="M50,100 C 25 100, 0 75, 0 50"/>
    </g>
  </g>
</svg>
```

Trying to use `I` in the log, although it does sound more personal, but I'm not gonna write `we` because it's too formal.

<img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/rounded-corners.svg?sanitize=true"><img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/rounded-corners.svg?sanitize=true"><img alt="corners" src="https://raw.github.com/artdecocode/daily-log/master/images/rounded-corners.svg?sanitize=true">

There's an [`asciinema`](https://asciinema.org/) project which allows to play terminals as `svg` animations, however the purpose of `SVaG` is to provide dynamic UI elements.

**FUTURE**

1. Implement the terminal output into the simple window.
1. Animate the terminal output.
1. Embed `@svag/window` into documentary when the terminal is ready  (possibly as a plugin rather than dependency?), because waiting on `ansi-to-svg` to merge the PR can last forever, and we want our own package to do that, it's not difficult.
1. move the `clean-stack` to art deco scope as still waiting on the PR to get merged.

> Timer: (10.5 - 5.3 = 5.2) + (7.28) = _12 hours 30 min_

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true"></a></p>### 6 Thursday

The day started by continuing to find suitable packages to compile w/ `documentary`. [`json2svg`](https://www.npmjs.com/package/json2csv) looked good yesterday, however it had a screenshot of a PNG. Therefore it was decided to be a great feature for _Documentary_ to make screenshots of output from a terminal. The search revealed existence of [`ansi-to-svg`](https://github.com/F1LT3R/ansi-to-svg) which is not very popular, but amazing. To start off with, a [Yosemite UI Kit](https://www.sketchappsources.com/tag/yosemite.html) for Sketch was downloaded and the title bar exported as SVG.

Because the export was automatic and auto-generated, `Sketch` produced some output which could be simplified by hand. Updated the SVG file and made it a template for the `ansi-to-svg` which also required modifying the source code. Creating a `package.json` script for running tests on commit is hell and should not be allowed.

Finished off with a complete good-looking terminal template which could also be used as a stand-alone package. Allows to either have or not have shadows. Learnt some things about drawing SVGs such as creating paths (e.g., for rectangles with rounded corners) and blurs (along with cases when having to specify `x`, `y`, `width` and `height` for those). _MOVE TO_ in path definition reminded of year 5 logo-worlds (???).

✍️ Started the daily log 🎉!

![terminal](images/terminal.svg)

**Future** Integrate the terminal generation into _Documentary_, make animated terminal in addition to static, release as a separate package (`svag`?). Implement caching for _Documentary_.

1. Timer: 8.38 + (5.3) = _13 hours 41 min_

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true"></a></p>

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
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (module.js:664:10)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/8.svg?sanitize=true"></a></p>

## TODO

- [ ] Add a new item to the todo list.

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-2.svg?sanitize=true"></a></p>