# daily-log

[![npm version](https://badge.fury.io/js/daily-log.svg)](https://npmjs.org/package/daily-log)

`daily-log` is a collection of descriptions of work done each day.

![terminal](images/index.svg)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [October](#october)
  * [8-12 Planning](#8-12-planning)
  * [1-5 Planning](#1-5-planning)
- [TODO](#todo)
- [Archive](#archive)
  * [2018](#2018)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>





## October

The plan for this month is:

1. In the first week, complete the missing features for _NodeTools_, pull up the missing bits in functionality and documentation and some minor bugs (e.g., finish updating expensive, section breaks changing); work on the `mnpjs.org` to analyse packages; create a website `nodetools.co` with bare content, outline the roadmap to version two;
1. Then without timing, promote _NodeTools_ by getting in contact with multiple blogs / websites to ask them to write articles about it; write tutorials, content for the website.
1. Focus on research, prototyping, a video and pitch for _Demimonde_.

### 8-12 Planning

Last week, I didn't write much of the blog, as it was quite relaxed week. Despite that, by working on the weekend, I did manage to achieve 38 hours which is a full employment week. I focused on _Namecheap API_ implementation and documentation, and adding features to _Expensive_.

![38 hours](images/18/10-8/38.png)

![namecheap-expensive](images/18/10-8/namecheap.png)

I also started to write a blog post on Medium about the _NodeTools_. There is an introduction, structure and the beginning of the section about why _TypeScript_ is not needed. I don't think I will keep it on Medium, but rather move it all to the content of the website.

<details>
  <summary>Show a rant</summary>

  I was quite frustrated when I commented on a topic by a person whom I dislike suggesting they use ÀLaMode, and it was then marked as spam:

  ![alamode](images/18/10-8/alamode.png)

  So he commented

  > @zavr-1 This is not the place to advertise your project. Try submitting to JavaScript Weekly newsletter and Reddit instead. For ES2015 module syntax, there's also esm.

  Gosh how I hate these people who take everything so seriously. So this particular guy made like I don't know how many packages and thinks he's a star, because all the unintelligent mob just uses his packages and thinks he is a god. There is a cult around this person just like around _Babel_ and _TypeScript_. Why be so hostile? Just say, "thanks dude", it's a community after all, where ideas are allowed to propagate. But ofc, because he's got this feeling of superiority due to all this fame, he needs to say that I am advertising. `esm` builds an AST tree just like any other transpiler. But that's fine I'm just upset that I let myself get involved there, I knew I disliked that person but I thought he might be different. Turned out to be exactly as I thought -- too much pathos and ego. It's just packages take a chill pill.

  On the other hand, it helped me to understand once and for all that I'm not making my software for anyone else, I am making it for myself. If anyone wants to use it, they are welcome to it. It is not my job going around advertising and wanting people to download it. In fact, I want as little number of people to use my packages because otherwise they will be too mainstream and I will become like that person, so much stuck up. I want my software to be grunge and underworld, and if before I cared that people would want to download it, now I know for sure that all that I was doing, was first and foremost, for myself. I will do a due diligence, make a site for _NodeTools_, post a few links, but that's it.
</details>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="15"></a></p>

Therefore, this far the progress has been:

**PROGRESS**

- Completed 11% of the _NameCheap API_, documented [`getPricing`](https://github.com/rqt/namecheap#async-getpricingoptions-getpricing-pricing) method extensively.ß
- Implemented the price check in _Expensive_ before registration and automatic application of the coupon, added tests to it with _Zoroaster_ masks.
- Started writing the content for _NodeTools_.

**SMALL POSITIVES**

- Found a way to maintain separate readme on _NPM_ and _GitHub_, by having 2 files: `README` for _NPM_ and `README.md` for _GitHub_. This means that I can publish all documentation on _GitHub_ and place a link to it on _NPM_, because _NPM_ sucks.
- Added a password implementation to `reloquent` as well as confirmation questions. ![password](images/18/10-8/password.png) ![confirm](images/18/10-8/confirm.png)
- Worked on _Completest_ prototype by setting up a _TypeScript_ server and writing types in JSDoc.
- Created a `forkFeed` (different from spoonfeed :P) to be able to send data to a child process via `stdin`, used it in _Zoroaster_.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

The plan for this week is:

**ESSENTIAL**

- [ ] Create `@svag/terminal` to render terminal output with ANSI colors.
- [ ] Print the terminal output into the `@svag/terminal` in _Documentary_.
- [ ] Document _MNP_ and _Expensive_ with the terminal.
- [ ] Complete the first version of _Completest_.
- [ ] Move binary functions from _Documentary_ to _Typal_, add documentation.
- [ ] Create a scope for Documentary, move some rules there.
- [ ] Finish at least one item from last week's list.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

### 1-5 Planning

Since last week, I have achieved what I wanted, that is to publish `@idio/core`, complete work on the `rqt` package by testing it with _IdioCore_, and then move the `namecheap` API from `expensive` to the `@rqt/namecheap-web`, where the whois fetching is also implemented.

The unexpected work came in when I wondered off in the direction of `MNP` and implemented the `GitHub` API package in `@rqt/github`, updated the tests and improved _Zoroaster_ to be able to pass inputs to the forked process. This was a longer-term goal and I'm happy I have completed it.

I have also setup VPN on the _Azure_ and it could be nice to make a video "How to get free VPN for a year" for a video blog.

This week's goals are to finish work on `expensive` and carry on with the `idio` separation into functional part, such as router and authentication unit. Gladly, this should be pretty easy as I have written the code already, it is just in different places.

There is still [the annoying bug](https://github.com/Microsoft/TypeScript/issues/26921) in _VS Code_ that makes the types not accessible.

**EXPENSIVE**

- [x] ~Create `@rqt/namecheap` standalone API package.~
- [x] ~Incorporate `@rqt/namecheap-web` and `@rqt/namecheap` into the package, refactor some code.~
- [ ] Implement a feature to set DNS.

**DOCUMENTARY**

- [ ] Create `@svag/terminal` to render terminal output.
- [ ] Print the terminal output into the `@svag/terminal`.

**ZOROASTER**

- [ ] Document using an example.
- [ ] Get inputs to fork from the input.
- [ ] Be able to access multiple properties of a mask as input.

**ALAMODE**

- [ ] Reverse markers to not cut out strings, add dynamic mode.
- [ ] Add a feature that would allow to require `alamode` in the same file as imports are written.

**DEVOPS**

- [ ] Move domains from Route 53 to `namecheap` to cut the costs.

**DAILY LOG**

- [x] ~Archive the September section.~

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## TODO

- [ ] Add a new item to the todo list.

## Archive

### 2018

- [**September**](/archive/2018/9.md)

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-2.svg?sanitize=true"></a></p>