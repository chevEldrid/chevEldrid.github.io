---
layout: post
title: "Welcome!"
hook: "Obligatory Website Update"
date: 2025-03-17 10:21:38 -0700
categories: nonfiction tech
---

Today’s the day! With every new opportunity comes the refresh of cheveldrid.github.io and this time we’re adding a blog component. Originally, I tried to do this back in 2017 with the first iteration of my personal site while working at GMO. I was enamored with [Ruby on Wheels](https://ruby-on-wheels.github.io/) - a tech blog from a github developer who had managed to convert an old army jeep and code on the road. I loved the style, the look. I saw he used something called “[jekyll](https://jekyllrb.com/)” but given my only experience was with raw html/css/js at the time, I opted to instead just duplicate the raw html output files and code each “next page” link by hand. Naturally, this was not exactly scalable. After writing each piece it would take 30 minutes to an hour to manually build out the rest of the required html and it turned every piece into a tangled nightmare of links. You can still find the wreckage in past [cheveldrid.github.io](https://github.com/chevEldrid/chevEldrid.github.io/commit/650e5765ae925027c656e638a97bc749d43d6b7a) commit history if you’re feeling crazy.

So today, eight years later, we’re using Jekyll correctly and my master plan of content creation stumbles ever forward. At this point the ruby static site generator is no stranger, being the backbone of [hexdrinkers.com](https://hexdrinkers.com/) for its entire run, and there seems to be no better tool for a somewhat tech-savvy writer to develop a fully featured blog that doesn’t cost money outside of hosting fees (which you can still get for free from github pages!). If you’re familiar (or clicked the link), hexdrinkers.com was a beast in what it could actually accomplish with no backend, and what you’re reading this on definitively doesn’t look like that. We’re starting small here in blog land. Keeping the overall infrastructure overhead as low as possible to focus on the writing, maybe adding additional features along the way. This also differs from the behemoth that was the hexdrinkers.com readerbase in that I don’t expect a lot of people to end up here, or rather proper SEO and analytics is not necessary nor desired. This whole thing is more to keep myself sane, writing about the things that matter to me on a regular basis and providing a searchable time-capsule of information for future thoughts and musings.

## The Build

We're using a fresh jekyll installation sans template (minimia proved to be a little too finicky with invisible files), and porting over the bare minimum of \_layout functionality from hexdrinkers. Currently, the final text blog posts will be stored directly in the repo but at some point I'd love to build out a gdrive puller similar to what we did with Hexdrinkers where I can write my blog entries, github actions checks gdrive for new content daily, and creates the requisite PR. I'm a big fan of redundancy - plus that sounds nerdy as hell.

Pictures are coming soon, porting over functionality from hexdrinkers and hoping to get some good styling around the header images but for now really just want to get this off the ground! So come back later if you want to see things.

And that's it! Color will remain in flux for now until I find new inspiration, hoping I find it soon...
