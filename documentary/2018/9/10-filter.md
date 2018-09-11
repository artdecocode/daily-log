
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

![Compare Shadows on iPhone](images/18-10/compare.png)

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

The second part of the day was spent on implementing the shadow in the `@svag` org by updating the library as well as other packages. Some extra attributes could be omitted as they had a default value (e.g., gradient starting at `y=0%` and same for the line behind the toolbar, `x=0`).

The `@svag/lib` was improved in version 2 for better `createElement` signature which would take the name of the element as the first argument as it was compulsory anyway. The `rect` element was added and its documentation copied from the MDN website, however in future this process can be automated.

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

