import React from "react";
import Link from 'gatsby-link'

export default ({ pathContext }) => {
  const { title, posts } = pathContext;

  console.log(title, posts, pathContext)
  return (
    <div>
      <h1>{ title }</h1>
      {
        posts.map(({ node }) => (
          <div>
            <p key={ node.id }>{ node.title }</p>
            <Link to={ node.id }>{ node.internal.content }</Link>
          </div>
        ))
      }
    </div>
  );
};
