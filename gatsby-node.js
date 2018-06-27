/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it


// exports.onCreateNode = ({ node, getNode }) => {
//   // console.log('node -> ', node);
//   const fileNode = getNode(node.parent)
//   if (fileNode)
//     console.log(`\nfile ->`, fileNode.relativePath)
//   console.log(`--------------`)
// };

// exports.onCreatePage = ({ page }) => {
//   console.log('page -> ', page);
// };

const crypto = require('crypto')

exports.sourceNodes = ({ boundActionCreators }) => {

  const { createNode } = boundActionCreators
  const posts = [{
    title: 'stuffs',
    privilege: 'private',
    content: 'my private post'
  }, {
    title: 'public stuffs',
    content: 'my public post'
  }]

  posts.forEach(post => createNode({
    id: post.title.replace(/ /g, '-'),
    title: post.title,
    privilege: post.privilege,
    parent: null,
    children: [],
    internal: {
      type: `post`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(post.content))
        .digest(`hex`),
      mediaType: `text/markdown`,
      content: JSON.stringify(post.content)
    }
  }))
}

exports.createPages = ({ graphql, boundActionCreators }) => {

  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allPost {
          edges {
            node {
              id,
              title,
              privilege,
              internal {
                content
              }
            }
          }
        }
      }
    `).then(result => {

      const pagesByPrivileges = result.data.allPost.edges.reduce((priv, post) => {
        const privilege = post.node.privilege || 'public'
        priv[privilege] = priv[privilege] || []
        priv[privilege].push(post)
        return priv
      }, {})

      const path = require('path')

      Object.entries(pagesByPrivileges).forEach(([priv, posts]) => {
        // Create index page
        createPage({
          path: `${priv}/index`,
          component: path.resolve(`./src/templates/index.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: `${priv}/index`,
            title: `my ${priv} posts`,
            posts
          },
        })

        posts.forEach(({ node }) => {
          createPage({
            path: `${priv}/${node.id}`,
            component: path.resolve(`./src/templates/post.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: `${priv}/${node.id}`,
              index: `${priv}/index`,
              title: node.title,
              content: node.internal.content
            },
          })
        })

      })

      resolve()
    })
  })

}
