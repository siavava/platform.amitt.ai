# CS52 Lab 4: Redux Platform Frontend

[deployed url](https://notes-frontend-siavava.onrender.com/)

## What Worked Well

Redux works well, although I still find it a bit of an anti-pattern
compared to other stuff out there (have worked with [Pinia](https://pinia.esm.dev/)
and it's much nicer).

## What Didn't

My edit screen does not seem to initialize properly when accessed directly
(i.e. when you go to `:postID/edit` directly as opposed to going to
`:postID` then clicking the **EDIT** button). 

I couldn't figure out how to fix this issue, so I added a back-routing switch that sends
the browser to the non-editing page if the edit page is accessed directly.

## Extra Credit

Don't know if it counts, but I tried to make the site look nice and added animations,
hover states, etc.

## Screenshots

### Landing Page (Posts) 

![landing](assets/landing.png)

### Post Page

![post view](assets/post.png)

### Edit Page

![edit post](assets/edit-post.png)

### New Post Page

![new post](assets/new-post.png)
