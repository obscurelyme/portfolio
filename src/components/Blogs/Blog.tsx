import React, { useEffect, useState, useRef } from 'react';

import { Box } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useBlogs } from './BlogProvider';

function useBlog(slug: string): string {
  const ref = useRef(false);
  const [state, setState] = useState<string>('');
  const { db, dispatch } = useBlogs();

  useEffect(() => {
    if (!ref.current) {
      dispatch?.({
        type: 'find',
        slug,
        db,
      });
    }

    fetch(`/blogs/${slug}.md`)
      .then((response) => {
        response
          .text()
          .then((txt) => {
            setState(txt);
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });

    return () => {
      dispatch?.({
        type: 'view',
      });
    };
  }, [slug, dispatch, db]);

  return state;
}

export default function Blog(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const blog = useBlog(slug);

  return (
    <Box>
      <Breadcrumbs />
      <ReactMarkdown skipHtml>{blog}</ReactMarkdown>
    </Box>
  );
}
