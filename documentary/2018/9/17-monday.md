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

- _Documentary_: extract all `@typedefs` first to be able to link them across the whole README.
- _Idio_: get back to finishing off the documentation written for the `@idio/core`, publish it.
- _Rqt_: make use of `@idio/core` in testing by updating the `https-context`.
- _Expensive_: Use the new `@rqt/rqt` in the project, and allow to fetch Whois data.

**DEVOPS**

- Migrate from Route 53 to the NS1 to cut the costs.
- Switch off some servers as now using Azure, look into a green hosting provider.

**LABS**

- An integration service for GitHub to automatically compile documentation server-side (not on a dev laptop). This would save time and allow only to push without having to run `yarn doc` command.
- The `moderne` tool which runs a server and monitors changes to the files, etc.
- `xml` transform for `@a-la/alamode` which would allow to write JSX-like syntax in code. This could then be used in `@svag` packages.

---

With the _Art Deco_ JavaScript, it looks like the project could be ready for a good start soon. When _Documentary_ receives an animated terminal, _Zoroaster_ gets a well-composed example, and _À La Mode_ can transpile files on-the-fly, the functional part of the product comes to the release of the first version. It will be time then to think about which domain name to use for the concept, and devise a marketing plan for the best launch. However, it might have to wait before the work in the `labs` section gets implemented, including the `moderne` package, because it seems that it might be an essential part of the project.

%~%