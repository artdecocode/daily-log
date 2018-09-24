### *24-28 Week*

This week I will be working on the _nodejs.tools_ website. Last week I planned to work on the terminal window for _Documentary_ that I want to be in the version 1 of _NodeTools_, however it seems to be quite a lot of work. I have managed to extract typedefs in _Documentary_ and use it to document _IdioCore_ which was good. I also added macros which is a very useful feature and a selling point. No research for Demimonde was conducted as there were a couple of days where I didn't get a chance to work full-time. This week, I will continue working on _Idio_, because I most definitely need a webserver for the websites described below.

I also started switching the infrastructure from Amazon to Microsoft. A year's free trial with 64 GB storage is great, because even a machine with the lowest config can be configured to use SSD swap for memory. Route 53 is therefore ditched in favour of free namecheap's DNS, so that even NS1 is not required.

There were new features to _Zoroaster_ with better mask testing of forks. It is a helpful feature which allows to easily test binary packages. When used in conjunction with `temp-context`, it reduces the chore of setting up tests for Node.js executables. There needs to be a way to read user input when setting up masks for forks.

In addition, I fixed the `medium.com/art_deco` handle so that I can use it later to promote _NodeTools_. This will be the new name for the _Art Deco Package_ concept, because the tools are for Node.js, but they will follow the _Art Deco_ philosophy. There needs to be an explanation of what the characteristics of this philosophy are, such as minimal dependencies, separation of concerns into scopes, and full attention to the developer experience.

%~ width="15"%

Since Node 10, there is going to be a way to create a coverage report using V8 coverage, such that no transformation of code is ever necessary. It is great because it removes the need to orchestrate code with markers used for coverage, and it means there does not need to be any _AST_ analyser. This has been implemented with [c8](https://github.com/bcoe/c8), however this package has the dependencies to transform into istanbul reports. I want to make my own tool, _Tutankhamun_ to be generate coverage reports, both client-side and as a service for GitHub integration. It could be hosted either at [Tutankhamun.io](Tutankhamun.io) or [Tutankhamen.co](Tutankhamen.co).

Moreover, one of the outcomes of last week was that _MNP_ as a website should also be part of the version one. Its features can be:

1. Analyse packages for number of lines of code / tests / documentation for each release.
1. Seeing what position a package is at for each of its keywords.
1. Adding a pixel tag to gather `referer` headers to see where users of packages come from (which search terms or tags).
1. Breaking down the scoring algorithm used by the search engine to suggest improvements, such as *Close 5 issues to climb up 5 positions*.

%~ width="15"%

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

%~%