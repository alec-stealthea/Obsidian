<%*
const partner1 = (await tp.system.prompt("Partner 1 name")) ?? "";
const partner2 = (await tp.system.prompt("Partner 2 name")) ?? "";
if (partner1 && partner2) { await tp.file.rename(partner1 + " & " + partner2); }
-%>
---
type: Union
title: '<% partner1 && partner2 ? partner1 + " & " + partner2 : tp.file.title %>'
description: 
tags:
  - union
union-type: '<% await tp.system.suggester(["Marriage", "Common-law", "Partnership"], ["Marriage", "Common-law", "Partnership"], false, "Type of union") ?? "" %>'
partners:
  - "[[<% partner1 %>]]"
  - "[[<% partner2 %>]]"
children: []
married: 
ended: 
location: 
timestamp: <% tp.date.now("YYYY-MM-DD[T]HH:mm:ss[Z]") %>
---

## Story
<!-- How they met, the wedding, life together. -->

## Notes
<!-- Add children to the `children` frontmatter list as WikiLinks, in birth order: "[[Child Name]]" -->
