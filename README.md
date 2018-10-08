# daily-log

[![npm version](https://badge.fury.io/js/daily-log.svg)](https://npmjs.org/package/daily-log)

`daily-log` is a collection of descriptions of work done each day.

![terminal](images/index.svg)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [daily-log](#daily-log)
  * [Table Of Contents](#table-of-contents)
  * [October](#october)
    * [1-5 Planning](#1-5-planning)
  * [TODO](#todo)
  * [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>





## October

The plan for this month is:

1. In the first week, complete the missing features for _NodeTools_, pull up the missing bits in functionality and documentation and some minor bugs (e.g., finish updating expensive, section breaks changing); work on the `mnpjs.org` to analyse packages; create a website `nodetools.co` with bare content, outline the roadmap to version two;
1. Then without timing, promote _NodeTools_ by getting in contact with multiple blogs / websites to ask them to write articles about it; write tutorials, content for the website.
1. Focus on research, prototyping, a video and pitch for _Demimonde_.

### 1-5 Planning

Since last week, I have achieved what I wanted, that is to publish `@idio/core`, complete work on the `rqt` package by testing it with _IdioCore_, and then move the `namecheap` API from `expensive` to the `@rqt/namecheap-web`, where the whois fetching is also implemented.

The unexpected work came in when I wondered off in the direction of `MNP` and implemented the `GitHub` API package in `@rqt/github`, updated the tests and improved _Zoroaster_ to be able to pass inputs to the forked process. This was a longer-term goal and I'm happy I have completed it.

I have also setup VPN on the _Azure_ and it could be nice to make a video "How to get free VPN for a year" for a video blog.

This week's goals are to finish work on `expensive` and carry on with the `idio` separation into functional part, such as router and authentication unit. Gladly, this should be pretty easy as I have written the code already, it is just in different places.

There is still [the annoying bug](https://github.com/Microsoft/TypeScript/issues/26921) in _VS Code_ that makes the types not accessible.

**EXPENSIVE**

- [ ] Create `@rqt/namecheap` standalone API package.
- [ ] Incorporate `@rqt/namecheap-web` and `@rqt/namecheap` into the package, refactor some code.
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

- [ ] Archive the September section.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## TODO

- [ ] Add a new item to the todo list.

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-2.svg?sanitize=true"></a></p>