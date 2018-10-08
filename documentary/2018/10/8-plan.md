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

%~ width="15"%

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

%~ width="15"%

The plan for this week is:

**ESSENTIAL**

- [ ] Create `@svag/terminal` to render terminal output with ANSI colors.
- [ ] Print the terminal output into the `@svag/terminal` in _Documentary_.
- [ ] Document _MNP_ and _Expensive_ with the terminal.
- [ ] Complete the first version of _Completest_.
- [ ] Move binary functions from _Documentary_ to _Typal_, add documentation.
- [ ] Create a scope for Documentary, move some rules there.
- [ ] Finish at least one item from last week's list.

%~%