## today 3 Dec

today is an interesting day because i had a day off and according to the studies, men and women perform better on the first day of the week. It means that I am anticipating the result of 2 of the latest bug reports in the google closure compiler repository: one when the dead code was not totally eliminated, but i predict that the outcome of that would be to pass a special flag indicating the entry module. The second issue with the google closure compiler is that the import from an ES6 module a common Js module (ie. `import { test } from 'test'` _FROM_ `module.exports.test = function testIO(){}`) does not produce the correct result such as the required method being imported.

 This is the question of interoperability of the module systems in the compiler and is described in its [wiki](https://github.com/google/closure-compiler/wiki/JS-Modules) which says

 > It is recommended that a module is imported using the method native to its type. CommonJS modules should be imported using require calls, goog.module should be imported with goog.require calls. However since ES6 import statements can only be used in ES6 modules, scripts and other module types can't use the import keyword.

 > It is possible to mix import statements, however this method is not generally recommended except for the case where importing an ES6 module into another script or module type.

 "please don't do it" therefore I think Google should seriously reconsider their terms because to be the modern start up like Art Deco, one has to write `import` statements, however the modules get transpiled before publishing, because Node.js does not understand the `import` syntax.



I don't know what they will say. I know that it is sure nice to sit in from of my computer again after a week+ of not attending any gadgets mostly. Needs must.

**UPD**

Apparently, it is not possible by design

![closure reply](images/18/closure.png)

%~%