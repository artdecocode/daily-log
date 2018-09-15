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

%~%

_Documentary_ works in 2 stages: first, it creates a stream of data from a directory with separate files. It pipes that stream into a _Toc_ generator, which extracts the titles so that it can construct the table of contents. The second stage is run afterwards, because when we see the `%TOC%` marker, we need to replace it with the table of contents, therefore we have to scan the whole document for headings first. But because I wanted to reuse the stream of data for both documentation and the Toc, I piped it into a dummy proxy stream, and paused it, and unpaused when the Toc was ready. The idea was that it would accumulate all data in a buffer, which would then be allowed to flow when the Toc is built. There was no problems with it before, but when there was too much data, it stopped working.

> <img src="images/hand.svg" align="right" height="45"> A proper reconstruction of the issue described above should be constructed to fully understand the underlying processes.

The solution was to be generous and create a new stream of data from a directory rather than trying to reuse a buffered one. It worked right away after the implementation as well. The good point is that some other parts of the software were rewritten for easier understanding and maintenance in the future.

%~ width="10"%

When I tried to compile _Documentary_ with _Alamode_, I faced a problem that the svg image files were also processed by the transpiler, which in addition added source maps to it. This shouldn't happen because only JS and JSX files need to be processed by it. Therefore, _Alamode_ also required an update which was added to it.

To improve testing, a `test-context` package was created, and 2 new packages added, including `@wrote/rm` and `@wrote/clone`. The `@wrote/clone` is also used in the _Documentary_ to copy the section breaks images into the repository which uses them, however there was an issue with `@wrote/ensure-path` when paths for both images were being recursively created at the same time in parallel. This was an old problem faced even a year ago with `wrote`. I finally fixed it.

<a href="https://en.wikipedia.org/wiki/L%C3%A9on_Bakst"><img src="images/18-13/bakst2.jpg" width="350" align="right"></a>

For the [`wrote`](https://github.com/wrote) org, which is a set of packages to work with the filesystem, I added a logo and found a good domain name. The logo is by Léon Bakst who was a Russian painter (January 27, 1866 -- December 27, 1924). And we share the birthday date! He was also born in Hrodna, Belarus - an area where my dad comes from.

It is really interesting how orgs and package name spaces can work so well together. The scopes look good as well, and I need to find a scope for test contexts, such as `@context/temp` rather than `temp-context`. To me, these two look as version 2 against version 1. And MNP is great at allowing to create packages with scopes and orgs.

**NEW PACKAGES**

- [`temp-context`](https://github.com/wrote/clone): provide each test with a new temp folder, which is a blank sheet (thx 🇰🇪 for the analogy) on which a test can write. At the end of the test, a snapshot of the sheet can be taken to compare against expected results.
- [`@wrote/rm`](https://github.com/wrote/rm): delete a file or a directory.
- [`@wrote/clone`](https://github.com/wrote/clone): clone a file or a directory.

**FUTURE**

1. Automatic section breaks, without the need to explicitly add them.
1. Create `fs-context` to work with the filesystem (e.g., read files and assert that they exists) which the `temp-context` can then extends.

> TIMER: 10 hours

%~%