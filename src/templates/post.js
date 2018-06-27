import React from "react";
import Link from 'gatsby-link'

export default ({ pathContext}) => {
  const { title, content, index } = pathContext;

  console.log('rendering post', pathContext)
  return (
    <div>
      <Link to={ 'index' }>index</Link>
      <h1>{ title }</h1>
      <p>{ content }</p>
    </div>
  );
};
