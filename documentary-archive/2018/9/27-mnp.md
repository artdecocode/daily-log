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

%~ width="15"%

It is not the case that we should be dismissive with ourselves for certain reasonable concerns that we have, e.g., if I don't like something or am upset about something at the work place, part of the reaction would be to tell myself that I should stop moaning about it. It is counter-productive because we have to accept ourselves, especially if the concern is valid. What is needed is to move from the language of complaint, to the language of commitment in a way that would identify what we are not doing about the situation, or what we can do about it. For example, if the concern is "I am never listened to", the commitment would be "The good communication is the core value of the people in this company", or "If I was the boss, I would give a forum to my employees", which shows the commitment to running the company in a way where people receive an opportunity to speak.

Also when converting the complaints into narratives and positives they are moved from the hostile emotional that which has negative feedback in a sense that it tries to keep things as they are to ensure survival, into the rational mind that has positive feedback loop because it seeks constant improvement of things (e.g., the progress science in science is based upon all previous progress). We also gain control of the situation when we rationalise it and come up with a plan of action, rather than just complaining about it.

There is also no need to jump to the identification of the current behaviour as erroneous: "I see my mistake of never speaking up and now I will always do it". Such an attitude is similar to making New Year's resolutions because we start with enthusiasm that quickly dies out in the reality. It is not the point to see what things are going wrong, because they would still be there even if they are solved for a single person. A good leader would attend to the problem and identify its root and cause, and attempt to solve it in a creative way. The point of problems is to learn from them, for example, in school a Match teacher would give homework to solve hard problems rather than easy ones, because she wants pupils to learn by solving them. She would value much less problems that are easy to solve as they do not stretch the minds of pupils. Same in life, when we receive a problem, it is even better if it is hard because it gives us an opportunity to learn from it and come out stronger, cleverer and more prepared for the future.

%~ width="15"%

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

%~%