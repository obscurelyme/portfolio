import React, { useContext, useEffect, useState } from 'react';

import db from '../../../db.json';

export interface BlogDetails {
  slug: string;
  title: string;
  description?: string;
  author: string;
  published: string;
  next: Partial<BlogDetails> | null;
  prev: Partial<BlogDetails> | null;
}

export interface BlogDatabase {
  latest: BlogDetails[];
  archive?: BlogDetails[];
}

const BlogDatabaseContext = React.createContext<BlogDatabase>(db);

export function useBlogDatabase(): BlogDatabase {
  const ctx = useContext(BlogDatabaseContext);
  if (!ctx) {
    throw new Error('useBlogDatabase may only be invoked within a <BlogDatabaseProvider>');
  }
  return ctx;
}

export function blogExists(slug: string, d: BlogDatabase): boolean {
  const f = d.latest?.filter((blog) => blog.slug === slug);
  const l = d.archive?.filter((blog) => blog.slug === slug);
  return f.length > 0 || !!l?.length;
}

export function useBlogDetails(slug: string): BlogDetails | undefined {
  const db = useBlogDatabase();
  if (db) {
    return db.latest?.find((blog) => blog.slug === slug) ?? db.archive?.find((blog) => blog.slug === slug);
  }
  return undefined;
}

export function useBlogMarkdownContent(slug: string) {
  const [state, setState] = useState<string>();

  useEffect(() => {
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
  }, [slug]);

  return state;
}

export default function BlogDatabaseProvider({ children }: React.PropsWithChildren<unknown>): React.ReactElement {
  return <BlogDatabaseContext.Provider value={db}>{children}</BlogDatabaseContext.Provider>;
}
