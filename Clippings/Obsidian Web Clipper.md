---
type: Research Clipping
description: "Web Clipper is a bookmarklet I made for Obsidian that saves articles and pages from the web as Markdown files in Obsidian."
timestamp: 2026-06-26T19:19:05Z
category: "[[Clippings]]"
author: "[[Steph Ango]]"
title: "Obsidian Web Clipper"
source: https://stephango.com/obsidian-web-clipper
clipped: 2024-06-14
published: 
topics: 
tags: [clippings]
---

Web Clipper is a bookmarklet I made for [Obsidian](https://stephango.com/obsidian) that saves articles and pages from the web as Markdown files in Obsidian. It is compatible with Safari, Chrome, Firefox, and mobile browsers.

## Demo

## Installation

Simply drag the “Clip in Obsidian” link below into your bookmarks. Then click the bookmark to clip the page. This will clip the page to your currently open vault and insert metadata about the article.

Clip in Obsidian

## Usage

By default, clicking the bookmarklet creates a new Obsidian file from the main body of the article, similar to Readability view. Alternatively you can choose to create a file from a selection, by either selecting all (`CMD+A`), or just a portion of the page.

## Downloading images for offline use

Any images in the content will be embedded as external references. This reduces storage in your vault but has two downsides: first, you need to be online to see the images, and second, those images will no longer resolve if the images are removed from the site.

If you want to download images locally you can use the [Local Images plugin](https://github.com/aleksey-rezvov/obsidian-local-images) which will download the images and save them to your vault so they are always accessible.

## Customization

If you want to customize the file path and template for your clippings, you will need to edit [the source code](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3) .

Optional variables can be found at the top of the code, and the template at the bottom. If you make changes I recommend using [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/) to minify and URI-encode the bookmarklet.

## Troubleshooting

This bookmarklet may not work on all websites and browsers. You can troubleshoot issues by opening the Developer Console in your browser and checking if any errors appear when you click the bookmarklet.

The most common error is that a website or the browser itself is blocking third party code execution. This is commonly due to the `connect-src` Content Security Policy (CSP) used by some websites.

-   **Aseel-Naji** [shared a fork](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3?permalink_comment_id=3905251#gistcomment-3905251) that prompts the user for folder and extra tags
-   **ganesshkumar** created a [browser-based bookmarklet maker](https://gist.github.com/kepano/90c05f162c37cf730abb8ff027987ca3?permalink_comment_id=4064082#gistcomment-4064082) that helps you customize the output
-   **pioneerskies** turned it into [a web service that you can run on Heroku](https://github.com/pioneerskies/downmark) to bypass CSP restrictions

-   [Tidy Reader](https://stephango.com/tidy) my bookmarklet for making web pages more readable.
-   [Tidy URL](https://stephango.com/tidyurl) my bookmarklet that cleans up URLs to make them more shareable.