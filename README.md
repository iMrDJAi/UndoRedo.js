# UndoRedo.js 
[![npm](https://img.shields.io/npm/v/undoredo.js?color=red)](https://www.npmjs.com/package/undoredo.js)

A powerful and simple Javascript library provides a history for undo/redo functionality. Just like a time machine! 🕐
***
## Installation:
**Node.js**:

Use this command to install the node module:
```bash
npm install undoredo.js --save
```
Then simply require it:
```js
const UndoRedojs = require("undoredo.js")
```

**Browser**:

You can get the `UndoRedo.js` file from [JsDeliver CDN](https://cdn.jsdelivr.net/gh/iMrDJAi/UndoRedo.js/src/UndoRedo.js):
```html
<script src='https://cdn.jsdelivr.net/gh/iMrDJAi/UndoRedo.js/src/UndoRedo.js'></script>
```

You can download it and use it locally:
```
📄index.html
📁js
 ↳ 📄UndoRedo.js
```

This time it will be:
```html
<script src='./js/UndorRedo.js'></script>
```

By the same way you can use `UndoRedo.min.js` instead, which is a minified version of `UndoRedo.js`. [JsDeliver CDN link](https://cdn.jsdelivr.net/gh/iMrDJAi/UndoRedo.js/src/UndoRedo.min.js).

The main function will be declared as `window.UndoRedojs`:
```js
const UndoRedojs = window.UndoRedojs
```

You can also bundle it into your project using [Webpack](https://webpack.js.org/guides/getting-started/). You can use it in anyway you want, it's just another npm packege after all! 😅

## Usage:
This package is useful for any step-by-step task, for example:

- Undo/Redo functionality for a text input.
- Something like a browser history.
- A settings page.
- A files explorer.
- A calculator (why not xD).
- And more...

**Basic usage**:

Lets setup our history:
```js
 const myHistory = new UndoRedojs(5)
```
This will return a class object with the methods and the properties that we will use later.

As you can see, we added the number **5** as a parameter, this will be used for cooldowns, keep reading for more details.

To push new elements to the history, use the `record` method:
```js
myHistory.record('1')
myHistory.record('12')
myHistory.record('123')
myHistory.record('1234')
myHistory.record('12345')
myHistory.record('123456')
myHistory.record('1234567', true)
```
To get the history array, use the `stack` property:
```js
console.log(myHistory.stack)
// output => Array(4) [ "", "12345", "123456", "1234567" ]
```
You can get the current history position using the `currentIndex` property:
```js
console.log(myHistory.currentIndex)
// output => 3
```
Remember that arrays always start from **0**, so the number **3** here is actually the **4th** element, wanna check?
```js
console.log(myHistory.stack[myHistory.currentIndex])
// output => "1234567"
```
There is another way to get the current element, using the `current` method:
```js
console.log(myHistory.current())
// output => "1234567"
```
The history array always starts with an empty element, this can be very helpful for text areas.

So we called the `record` method 7 times, but we only got 3 recorded elements (without the 1st empty one). Why?

We used the number **5** as a parameter for the `UndoRedojs` function, it's just like saying: 'Record every 5 calls', that makes cooldowns. We call this parameter: `cooldown`.

So during cooldowns the `record` method will not gonna push new elements to the history stack, instead of that it will update the current element with the new one.

To disable that, just use the number **1**, or keep it empty because the default `cooldown` is **1**:
```js
 const myHistory = UndoRedojs()
```

But we see that the `"1234567"` element is recorded during a cooldown. Why?

The difference here is that we added `true` as a 2nd parameter for the `record` method, it's just like saying: 'Force to record', that will make it bypass the cooldown. We call this parameter: `force`.

To undo, just use the `undo` method:
```js
const undo = myHistory.undo()
console.log(undo)
// output => "123456"
console.log(myHistory.current())
// output => "123456"
```
So the `undo` method will make you step back once inside the array and will return the previous element.

What if we add `true` as a parameter?
```js
const undo = myHistory.undo(true);
console.log(undo);
// output => "123456"
console.log(myHistory.current());
// output => "1234567"
```
As you can see the current element stays `"1234567"`, so this time it returns the previous element without stepping back. We call this parameter: `readOnly`.

To redo, just use the `redo` method:
```js
const redo = myHistory.redo()
console.log(redo)
// output => "1234567"
console.log(myHistory.current())
// output => "1234567"
```
So the `redo` method will make you step forward once inside the array and will return the next element.

What if we add `true` as a parameter?
```js
const redo = myHistory.redo(true);
console.log(redo);
// output => "1234567"
console.log(myHistory.current());
// output => "123456"
```
As you can see the current element stays `"123456"`, so this time it returns the next element without stepping forward. We call this parameter: `readOnly`.

What if we undo then record then redo again?
```js
myHistory.undo()
myHistory.record('12345678')
console.log(myHistory.redo())
// output => undefined
```
Why? Because the `record` method will remove every next element.

You can update the current element using the `current` method:
```js
console.log(myHistory.current('1234567'));
// output => "1234567"
```
## Examples:
You can find a good example of a textarea with working undo/redo buttons [here](https://github.com/iMrDJAi/UndoRedo.js/blob/master/index.html).

That's a [live demo](https://imrdjai.github.io/UndoRedo.js).

## Dependents Projects:
Wanna use **UndoRedo.js** on your next big project? Let me now and it will be listed here! :)

## Special Thanks:
- CSS Script website for sharing this project <3 (https://www.cssscript.com/undo-redo-history).

## Notes:
- This is my first package, leave a star if you like it <3.
- You are free to suggest anything and I will try to add it soon if I found it useful.
- If you found any mistake (including the README file) feel free to help to fix it.
- Please report any bugs.
- **Made with ❤ in Algeria 🇩🇿**.
