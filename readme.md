# tailwindcss-screens-in-dom

Expose the active tailwind screen (like `sm`, `md`) in `body:before`, allowing you to use the value in Javascript. [Read more](https://github.com/AllThingsSmitty/css-breakpoints-in-js)

## Installation

```
$ npm install @digitaliseringsbyran/tailwindcss-screens-in-dom --save-dev
```

## Usage
Add the plugin to the `plugins` array in your tailwind config.

```js
plugins: [
  // ...
  require('./tailwindcss-screens-in-dom')()
]
```

### Options
You can pass an object to override the default settings.

```js
// Default options

plugins: [
  require('./tailwindcss-screens-in-dom')({
    noScreen: 'xs' // Viewports below the smallest defined screen.
  })
]
```

## Access the active screen in Javascript
Accessing the value in plain Javascript is [explained here](https://github.com/AllThingsSmitty/css-breakpoints-in-js#importing-the-breakpoints-into-javascript).

### React
A example hook that returns the active screen as a string:

#### useTailwindScreen.js
```js
import { useState, useEffect } from 'react'

export default () => {
  const isClient = typeof window === 'object'

  function getScreen() {
    return window
      .getComputedStyle(document.querySelector('body'), ':before')
      .getPropertyValue('content')
      .replace(/"|'/g, '')
  }

  const initialState = isClient ? getScreen() : ''
  const [screen, setScreen] = useState(initialState)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setScreen(getScreen())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screen
}
````

#### Component
```js
import React from 'react'
import useTailwindBreakpoint from '../hooks/useTailwindBreakpoint'

const ActiveScreen => {
  const screen = useTailwindBreakpoint()
  
  return (
      <span>{screen}</span>
  )
}

export default ActiveScreen
```
