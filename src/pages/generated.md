---
layout: main
pagination:
    data: content
    size: 1
    alias: item
permalink: "{{ item.title | slug }}/"
---

# {{ item.title }}

> This is a Markdown page

{{ item.content }}

