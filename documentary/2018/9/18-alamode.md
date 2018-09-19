### 18 Tuesday

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

There is also a possibility for the `docks` software which would allow to control via a web-interface and CLI all the running Dokku apps, and in future even spawn new virtual machines. Unfortunately, the `docks` package is taken, but the namespace `@docks` is free. On GitHub, the org seems also to belong to an inactive account. By providing a web-interface, the whole process of managing apps could be simplified and abstracted so that no knowledge of the fact that it is based on Dokku is required. It could then be expanded to platform providers such as Heroku as well.

[![](images/18/9-18/docks.svg)](https://docks.cc)

**FUTURE**

- [ ] Fix a bug in ÀLaMode when a completely empty file is processed.
- [ ] Add `node-exiftool` to _Documentary_ to add copyright metadata to images.
- [ ] Add a feature to _Documentary_ to be able to compile a text in SVG with a given font via spawning Chrome and drawing on canvas, therefore it should be a plugin since it's an advanced functionality which would require additional dependencies such as `Chrome Launcher`.

%~%