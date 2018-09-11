# Comparison of Shadows

When the shadow is set on the whole window element, the `svg` image embedded as an `image` tag might appear blurry (not only on mobile, but on desktops as well), because when resizing it will be rasterised. By creating a separate element for the shadow, this problem is solved.

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

## Window Source

In the window source, the shadow will be set on the element which contains the window, which makes it appear blurry.

```svg
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="472px" height="244px" version="1.1" viewBox="0, 0, 472, 244">
   <!-- The shadow is set on the whole image -->
   <g fill="none" filter="url(#shadow)" transform="translate(55, 25)">
     <defs>
        <filter id="shadow" width="132%" height="180%" x="-16%" y="-19%">
           <feOffset dx="0" dy="25" in="SourceAlpha" result="so"/>
           <feGaussianBlur in="so" result="sb" stdDeviation="27.5"/>
           <feColorMatrix in="sb" result="sm" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"/>
           <feMerge>
             <feMergeNode in="sm"/>
             <feMergeNode in="SourceGraphic"/>
           </feMerge>
        </filter>
     </defs>
     <rect width="360" height="132" stroke="#000000" stroke-opacity="0.2" rx="6"/>
     <defs>
        <linearGradient id="toolbar" x1="50%" x2="50%" y1="0%" y2="100%">
           <stop offset="0%" stop-color="#FFFFFF"/>
           <stop offset="5%" stop-color="#F5F4F5"/>
           <stop offset="100%" stop-color="#D3D3D3"/>
        </linearGradient>
     </defs>
     <path fill="url(#toolbar)" d="M6,0 L354,0 C 357 0, 360 3, 360 6 L360,22 L0,22 L0,16 L0,6 C 0 3, 3 0, 6 0"/>
     <text x="180" y="16" fill="#464646" font-family="HelveticaNeue, Helvetica Neue" font-size="13" letter-spacing="0.4" text-anchor="middle">
        🚞 Terminal
     </text>
     <g transform="translate(9, 6)">
        <g>
           <circle cx="5" cy="5" r="5.5" stroke="#E33E32" stroke-width="1"/>
           <circle cx="5" cy="5" r="5.25" fill="#FF5F52"/>
        </g>
        <g>
           <circle cx="25" cy="5" r="5.5" stroke="#E2A100" stroke-width="1"/>
           <circle cx="25" cy="5" r="5.25" fill="#FFBE05"/>
        </g>
        <g>
           <circle cx="45" cy="5" r="5.5" stroke="#17B230" stroke-width="1"/>
           <circle cx="45" cy="5" r="5.25" fill="#15CC35"/>
        </g>
     </g>
     <path fill="#FFFFFF" d="M360,22 L360,126 C 360 129, 357 132, 354 132 L6,132 C 3 132, 0 129, 0 126 L0,22 Z"/>
     <line x1="0" x2="360" y1="22.5" y2="22.5" stroke="#7E7E7E" shape-rendering="crispEdges"/>
     <g fill="#000000" transform="translate(5, 28)">
        <text x="0" y="10" font-family="Monaco, Courier" font-size="12px">
           Last login: Sat Sep 08 2018 on ttys013
        </text>
        <text x="0" y="25" font-family="Monaco, Courier" font-size="12px">
           svag-macbook:~ svag$
        </text>
     </g>
   </g>
</svg>
```

## Standalone Source

In the standalone shadow source, the shadow is added as a separate element and therefore the contents of the window does not suffer from loss of quality.

```svg
<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0, 0, 472, 244" width="472px" height="244px">
  <!-- The shadow is implemented as a separate element -->
  <g transform="translate(55, 25)" filter="url(#shadow)">
    <defs>
      <filter x="-16%" y="-19%" width="132%" height="180%" id="shadow">
        <feOffset dy="25" in="SourceAlpha" result="o"/>
        <feGaussianBlur stdDeviation="27.5" in="o" result="b"/>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" in="b"/>
        <!-- There is no merge property as we're only interested in the shadow. -->
      </filter>
    </defs>
    <rect height="132" width="360" rx="6" ry="6" fill="white"/>
  </g>
  <g transform="translate(55, 25)" fill="none">
    <rect width="360" height="132" rx="6" ry="6" stroke="#000000" stroke-opacity="0.2"/>
    <g id="Toolbar">
      <defs>
        <linearGradient x1="50%" x2="50%" y2="100%" id="toolbar">
          <stop stop-color="#FFFFFF" offset="0%"/>
          <stop stop-color="#F5F4F5" offset="5%"/>
          <stop stop-color="#D3D3D3" offset="100%"/>
        </linearGradient>
      </defs>
      <path d="M6,0 L354,0 C 357 0, 360 3, 360 6 L360,22 L0,22 L0,16 L0,6 C 0 3, 3 0, 6 0"
            fill="url(#toolbar)"/>
      <text x="180" y="16" font-family="HelveticaNeue, Helvetica Neue" font-size="13"
            letter-spacing="0.4" fill="#464646" text-anchor="middle">
        🚞 Terminal
      </text>
      <g transform="translate(9, 6)">
        <g>
          <circle stroke="#E33E32" stroke-width="1" cx="5" cy="5" r="5.5"/>
          <circle fill="#FF5F52" cx="5" cy="5" r="5.25"/>
        </g>
        <g>
          <circle stroke="#E2A100" stroke-width="1" cx="25" cy="5" r="5.5"/>
          <circle fill="#FFBE05" cx="25" cy="5" r="5.25"/>
        </g>
        <g>
          <circle stroke="#17B230" stroke-width="1" cx="45" cy="5" r="5.5"/>
          <circle fill="#15CC35" cx="45" cy="5" r="5.25"/>
        </g>
      </g>
    </g>
    <path d="M360,22 L360,126 C 360 129, 357 132, 354 132 L6,132 C 3 132, 0 129, 0 126 L0,22 Z"
          fill="#FFFFFF"/>
    <line y1="22" x2="360" y2="22" stroke="#7E7E7E" shape-rendering="crispEdges"/>
    <g transform="translate(5, 28)" fill="#000000">
      <text font-family="Monaco, Courier" font-size="12px" x="0" y="10">
        Last login: Tue Sep 11 2018 on ttys013
      </text>
      <text font-family="Monaco, Courier" font-size="12px" x="0" y="25">
        svag-macbook:~ svag$
      </text>
    </g>
  </g>
</svg>
```

## Stackoverflow Issues

There are a number of questions on stackoverflow facing the same problem.

1. [SVG with drop-shadow blurry on mobile browser](https://stackoverflow.com/questions/25351902/svg-with-drop-shadow-blurry-on-mobile-browser)
1. [SVG icons in safari are blurred](https://stackoverflow.com/questions/43546754/svg-icons-in-safari-are-blurred)
1. [SVG: Drop-Shadow filter pixelates SVG on mobile Safari](https://stackoverflow.com/questions/14664407/svg-drop-shadow-filter-pixelates-svg-on-mobile-safari)