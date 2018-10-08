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

<!-- An online tool which can integrate with _GitHub_ to test autocompletions, can be called `completest.co`, for _complete test_. It is actually an archaic for the most complete.  -->

The work of the request library went well and I tested `rqt` against `@idio/core` with implemented compression. I found some problems with documentation of _IdioCore_, when links to types were interfering with links to titles. I updated _Documentary_ to fix this bug, and also implemented parsing of types inside `Object.<string, Type>` which now is also linked. I created a new package, [`typal`](https://github.com/artdecocode/typal) to contain the logic of creating types from XML and serializing them into Markdown. The package needs documenting and refactoring of extraction and generation of type information needs to be moved there as well.

%TYPEDEF types/object.xml%

%~ width="15"%

Spiritually, there is a thought that even if a person wronged you, it is the best to be grateful to him as he or she moved you closer to the understanding of the true meaning of life. Great many people won't wake up tomorrow, and it is an amazing thing to be alife just now. You do not have to grant people the privilige of making you angry or sad or happy, only you can choose it for yourself. The life is happening right now, and our bodies is the food that we've gathered, our minds is the impressions that we've gathered, but is it us? We can control our thoughts and even choose not to think.

**FUTURE**

- [ ] Write a plugin for _VS Code_ to embed markdown images by drag-n-drop.
- [ ] Work on the autocompletion testing.
- [ ] Fix section breaks in _Documentary_ so that they don't all change after 22.

%~%