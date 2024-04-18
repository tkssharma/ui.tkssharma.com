---
date: 2024-04-01
title: 'Understand Mystery behind useMemo Hook'
shortTitle: 'Understand Mystery behind useMemo Hook'
description: 'Understand Mystery behind useMemo Hook'
template: post
featuredImage: '../thumbnails/react.png'
thumbnail: '../thumbnails/react.png'
slug: react-understadning-usememo-hooks
categories:
  - a11y
  - reactjs
  - web-design
tags:
  - web-design
  - reactjs 
  - a11y
---


Introduction
------------

If you've struggled to make sense of `useMemo` and `useCallback`, you're not alone! I've spoken with _so many_ React devs who have been scratching their heads about these two hooks.

My goal in this blog post is to clear up all of this confusion. We'll learn what they do, why they're useful, and how to get the most out of them.

Let's go!

**Intended audience**

This tutorial is written to help beginner/intermediate React developers get more comfortable with React. If you're taking your very first steps with React, you might wish to bookmark this one and come back to it in a few weeks!



The basic idea
==============

Alright, so let's start with `useMemo`.

The fundamental idea with `useMemo` is that it allows us to _“remember”_ a computed value between renders.

This definition requires some unpacking. In fact, it requires a pretty sophisticated mental model of how React works! So let's address that first.

The main thing that React does is keep our UI in sync with our application state. The tool that it uses to do this is called a “re-render”.

Each re-render is a snapshot of what the application's UI should look like at a given moment in time, based on the current application state. We can think of it like a stack of photographs, each one capturing how things looked given a specific value for every state variable.

Each “re-render” produces a mental picture of what the DOM should look like, based on the current state. In the little demo above, it's pictured as HTML, but in reality it's a bunch of JS objects. This is sometimes called the _“virtual DOM”_, if you've heard that term.

We don't directly tell React which DOM nodes need to change. Instead, we tell React what the UI _should be_ based on the current state. By re-rendering, React creates a new snapshot, and it can figure out what needs to change by comparing snapshots, like playing a “find the differences” game.

**Wait, what?**

I recently published a blog post that explains what a “re-render” is, and why they occur. If you're feeling a bit lost, it might help to read that blog post first, and then come back to this one!

*   [“Why React Re-Renders”](/react/why-react-re-renders/)
    

React is heavily optimized out of the box, and so _in general_, re-renders aren't a big deal. But, in certain situations, these snapshots _do_ take a while to create. This can lead to performance problems, like the UI not updating quickly enough after the user performs an action.

Fundamentally, `useMemo` and `useCallback` are tools built to help us optimize re-renders. They do this in two ways:

1.  Reducing the amount of work that needs to be done in a given render.
    
2.  Reducing the number of times that a component needs to re-render.
    

Let's talk about these strategies, one at a time.

Use case 1: Heavy computations
================================

Let's suppose we're building a tool to help users find all of the prime numbers between 0 and `selectedNum`, where `selectedNum` is a user-supplied value. A prime number is a number that can only be divided by 1 and itself, like 17.

Here's one possible implementation:


```js

import React from 'react';

function App() {
  // We hold the user's selected number in state.
  const [selectedNum, setSelectedNum] = React.useState(100);
  
  // We calculate all of the prime numbers between 0 and the
  // user's chosen number, `selectedNum`:
  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }
  
  return (
    <>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={(event) => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));
            
            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:
        {' '}
        <span className="prime-list">
          {allPrimes.join(', ')}
        </span>
      </p>
    </>
  );
}

// Helper function that calculates whether a given
// number is prime or not.
function isPrime(n){
  const max = Math.ceil(Math.sqrt(n));
  
  if (n === 2) {
    return true;
  }
  
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App;

```


resultconsole

Refresh results pane
I don't expect you to read every line of code here, so here are the relevant highlights:

*   We have a single piece of state, a number called `selectedNum`.
*   Using a `for` loop, we manually calculate all of the prime numbers between 0 and `selectedNum`.
*   We render a controlled number input, so the user can change `selectedNum`.
*   We show the user all of the prime numbers that we calculated.

**This code requires a significant amount of computation.** If the user picks a large `selectedNum`, we'll need to go through _tens of thousands_ of numbers, checking if each one is prime. And, while there _are_ more efficient prime-checking algorithms than the one I used above, it's always going to be computationally intensive.

We do need to perform this calculation _sometimes_, like when the user picks a new `selectedNum`. But we could potentially run into some performance problems if we wind up doing this work _gratuitously_, when it doesn't need to be done.

For example, let's suppose our example also features a digital clock:

```js
import React from 'react';
import format from 'date-fns/format';

function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  
  // `time` is a state variable that changes once per second,
  // so that it's always in sync with the current time.
  const time = useTime();
  
  // Calculate all of the prime numbers.
  // (Unchanged from the earlier example.)
  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }
  
  return (
    <>
      <p className="clock">
        {format(time, 'hh:mm:ss a')}
      </p>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={(event) => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));
            
            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:
        {' '}
        <span className="prime-list">
          {allPrimes.join(', ')}
        </span>
      </p>
    </>
  );
}

function useTime() {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => {
      window.clearInterval(intervalId);
    }
  }, []);
  
  return time;
}

function isPrime(n){
  const max = Math.ceil(Math.sqrt(n));
  
  if (n === 2) {
    return true;
  }
  
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App;
```

Our application now has two pieces of state, `selectedNum` and `time`. Once per second, the `time` variable is updated to reflect the current time, and that value is used to render a digital clock in the top-right corner.

**Here's the issue:** whenever _either_ of these state variables change, we re-run all of those expensive prime-number computations. And because `time` changes once per second, it means we're _constantly_ re-generating that list of primes, even when the user's selected number hasn't changed!

![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27714%27%20height=%27332%27/%3e)![Labeled screenshot of the code above, showing how whenever the time value changes, the prime numbers have to be recalculated](/_next/image/?url=%2Fimages%2Fusememo-and-usecallback%2Fclock-prime.png%3Fv%3D2&w=1920&q=75)

![Labeled screenshot of the code above, showing how whenever the time value changes, the prime numbers have to be recalculated](/_next/image/?url=%2Fimages%2Fusememo-and-usecallback%2Fclock-prime.png%3Fv%3D2&w=1920&q=75)

In JavaScript, we only have one main thread, and we're keeping it _super_ busy by running this code over and over, every single second. It means that the application might feel sluggish as the user tries to do other things, especially on lower-end devices.

**But what if we could “skip” these calculations?** If we already have the list of primes for a given number, why not _re-use_ that value instead of calculating it from scratch every time?

This is precisely what `useMemo` allows us to do. Here's what it looks like:

```js

const allPrimes = React.useMemo(() => {
  const result = [];

  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      result.push(counter);
    }
  }

  return result;
}, [selectedNum]);

const allPrimes = React.useMemo(() => {

  const result = [];

  for (let counter = 2; counter < selectedNum; counter++) {

    if (isPrime(counter)) {

      result.push(counter);

    }

  }

  return result;

}, [selectedNum]);

```

`useMemo` takes two arguments:

1.  A chunk of work to be performed, wrapped up in a function
2.  A list of dependencies
    

During mount, when this component is rendered for the very first time, React will invoke this function to run all of this logic, calculating all of the primes. **Whatever we return from this function is assigned to the `allPrimes` variable.**

For every subsequent render, however, **React has a choice to make.** Should it:

1.  Invoke the function again, to re-calculate the value, or
2.  Re-use the data it already has, from the _last_ time it did this work.
    

To answer this question, React looks at the supplied list of dependencies. Have any of them changed since the previous render? If so, React will rerun the supplied function, to calculate a new value. Otherwise, it'll skip all that work and reuse the previously-calculated value.

**`useMemo` is essentially like a lil’ cache, and the dependencies are the cache invalidation strategy.**

In this case, we're essentially saying “recalculate the list of primes _only when_ `selectedNum` changes”. When the component re-renders for _other_ reasons (eg. the `time` state variable changing), `useMemo` ignores the function and passes along the cached value.

This is commonly known as _memoization_, and it's why this hook is called “useMemo”.

Here's a live version of this solution:

```js
import React from 'react';
import format from 'date-fns/format';

function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  const time = useTime();
  
  const allPrimes = React.useMemo(() => {
    const result = [];
    
    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }
    
    return result;
  }, [selectedNum]);
  
  return (
    <>
      <p className="clock">
        {format(time, 'hh:mm:ss a')}
      </p>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={(event) => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));
            
            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:
        {' '}
        <span className="prime-list">
          {allPrimes.join(', ')}
        </span>
      </p>
    </>
  );
}

function useTime() {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => {
      window.clearInterval(intervalId);
    }
  }, []);
  
  return time;
}

function isPrime(n){
  const max = Math.ceil(Math.sqrt(n));
  
  if (n === 2) {
    return true;
  }
  
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App;
```




An alternative approach

So, the `useMemo` hook can indeed help us avoid unnecessary calculations here… but is it _really_ the best solution here?

Often, we can avoid the need for `useMemo` by restructuring things in our application.

Here's one way we could do this:

```js
import React from 'react';

import Clock from './Clock';
import PrimeCalculator from './PrimeCalculator';

function App() {
  return (
    <>
      <Clock />
      <PrimeCalculator />
    </>
  );
}

export default App;
```

I've extracted two new components, `Clock` and `PrimeCalculator`. By branching off from `App`, these two components each manage their own state. A re-render in one component won't affect the other.

Here's a graph showing this dynamic. Each box represents a component instance, and they flash when they re-render. Try clicking the “Increment” button to see it in action:


We hear a lot about lifting state up, but sometimes, the better approach is to _push state down!_ Each component should have a single responsibility, and in the example above, `App` was doing two totally-unrelated things.

Now, this won't always be an option. In a large, real-world app, there's lots of state that _needs_ to be lifted up pretty high, and can't be pushed down.

**I have another trick up my sleeves for this situation.**

Let's look at an example. Suppose we **need** the `time` variable to be lifted up, above `PrimeCalculator`:

```js
import React from 'react';
import { getHours } from 'date-fns';

import Clock from './Clock';
import PrimeCalculator from './PrimeCalculator';

// Transform our PrimeCalculator into a pure component:
const PurePrimeCalculator = React.memo(PrimeCalculator);

function App() {
  const time = useTime();

  // Come up with a suitable background color,
  // based on the time of day:
  const backgroundColor = getBackgroundColorFromTime(time);

  return (
    <div style={{ backgroundColor }}>
      <Clock time={time} />
      <PurePrimeCalculator />
    </div>
  );
}

const getBackgroundColorFromTime = (time) => {
  const hours = getHours(time);
  
  if (hours < 12) {
    // A light yellow for mornings
    return 'hsl(50deg 100% 90%)';
  } else if (hours < 18) {
    // Dull blue in the afternoon
    return 'hsl(220deg 60% 92%)'
  } else {
    // Deeper blue at night
    return 'hsl(220deg 100% 80%)';
  }
}

function useTime() {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => {
      window.clearInterval(intervalId);
    }
  }, []);
  
  return time;
}

export default App;
```

Pure Component

Like a force field, `React.memo` wraps around our component and protects it from unrelated updates. Our `PurePrimeCalculator` will only re-render when it receives new data, or when its internal state changes.

This is known as a _pure component_. Essentially, we're telling React that this component will always produce the same _output_ given the same _input_, and we can skip the re-renders where nothing's changed.

I wrote more about how `React.memo` works in my recent blog post, [“Why React Re-Renders”](/react/why-react-re-renders/).

**A more conventional approach**

In the example above, I'm applying `React.memo` to the _imported_ `PrimeCalculator` component.

In truth, this is a bit unusual. I chose to structure it this way so that everything was visible in the same file, to make it easier to understand.

In practice, I often apply `React.memo` to the component _export_, like this:

```js
// PrimeCalculator.js
function PrimeCalculator() {
  /* Component stuff here */
}

export default React.memo(PrimeCalculator);

// PrimeCalculator.js

function PrimeCalculator() {

  /* Component stuff here */

}

export default React.memo(PrimeCalculator);
```

Our `PrimeCalculator` component will now always be pure, without us having to tinker with it when we go to consume it.

Should we ever need a non-pure version of `PrimeCalculator`, we can export the underlying component as a named export. I don't think I've ever needed to do this though.

**There's an interesting perspective-shift here:** Before, we were memoizing the result of a specific computation, calculating the prime numbers. In this case, however, _I've memoized the entire component instead._

Either way, the expensive calculation stuff will only re-run when the user picks a new `selectedNum`. But we've optimized the parent component rather than the specific slow lines of code.

I'm not saying that one approach is better than the other; each tool has its spot in the toolbox. But in this specific case, I prefer this approach.

Now, if you've ever tried to use pure components in a real-world setting, you've likely noticed something peculiar: **Pure components often re-render quite a bit,** even when it seems like nothing's changed! 😬

This leads us nicely into the second problem that `useMemo` solves.

**Even more alternatives**

In his blog post [“Before you memo()”](https://overreacted.io/before-you-memo/), Dan Abramov shares another approach based around restructuring the app using `children`, to avoid needing to do any memoization.
