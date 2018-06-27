# Gatsby Privileges


This is a Proof of Concept to create 'protected' websites with Gatsby.
The idea is to protect certain pages with privileges, and to hide those pages behind a hashed path.

For example, let's say we have a blog, with some public and some private posts.
The public posts would be listed in an /index.html, and be available as /post-public.html and so on ...
And the private posts would be listed in an /<hash>/index.html and available as /<hash>/post-private.html and so on ...

And then, you can share the private part with friends and family as a simple link.

This scheme is not bullet proof, but it offers a decent amount of security for low risk sites.
And the big advantage is that it doesn't require any kind of server side authentication, except disaballing directory listing.

It was inspired by the share-by-link feature offered in e.g. google docs or flickr.

I implemented it in [metalsmith](https://www.npmjs.com/package/metalsmith-privileges) a couple of year ago, and now want to port it to Gatsby.

And it is the exact same principle behind [this project](https://github.com/matteobrusa/Password-protection-for-static-pages).

---

# gatsby-starter-default
The default Gatsby starter.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

Make sure that you have the Gatsby CLI program installed:
```sh
npm install --global gatsby-cli
```

And run from your CLI:
```sh
gatsby new gatsby-example-site
```

Then you can run it by:
```sh
cd gatsby-example-site
gatsby develop
```

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
