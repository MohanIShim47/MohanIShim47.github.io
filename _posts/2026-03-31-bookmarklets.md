---
layout: post
title: Explanation of Bookmarklets.
author: TEDA
excerpt: A full explanation of bookmarklets.

tags: [javascript, school, special]
categories: [tech]
---

# What are Bookmarklets?

Bookmarklets are small pieces of JavaScript saved as browser bookmarks. Instead of opening a website, **they run code on the page you’re currently on.**

---

## How they work?

A bookmarklet starts with:

```js
    javascript:
```

When clicked, your browser executes the code instantly.

```js
    javascript:alert('Hello!')
```

---

## What they can do?

- Change a page’s appearance
- Extract or highlight content
- Remove clutter
- Add quick tools to any site

---

## Why use them?

- No installation needed
- Fast and lightweight
- Fully customizable

---

## Safety

Only use bookmarklets from sources you trust—they can run any code on a page.

---

## Quick example:

```js
    javascript:(function(){document.body.style.filter="invert(1)";})();
```

Click it to invert colors on any website.

---

## Conclusion

Bookmarklets are a simple way to add powerful tools to your browser with just one click.