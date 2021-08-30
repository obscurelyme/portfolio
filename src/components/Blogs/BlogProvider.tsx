import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useReducer } from 'react';

export interface BlogDatabase {
  latest: BlogDetails[];
  archive: BlogDetails[];
}

export interface BlogDetails {
  slug: string;
  title: string;
  description?: string;
  author: string;
  published: string;
  next: Partial<BlogDetails> | null;
  prev: Partial<BlogDetails> | null;
}

type ViewAction = {
  type: 'view';
  data?: BlogDetails;
};

type FindAction = {
  type: 'find';
  slug: string;
  db?: BlogDatabase;
};

type BlogActions = ViewAction | FindAction;

interface BlogContextData {
  state?: BlogDetails;
  dispatch?: React.Dispatch<BlogActions>;
}

const BlogContext = React.createContext<BlogContextData>({});

function blogReducer(state: BlogContextData, action: BlogActions): BlogContextData {
  switch (action.type) {
    case 'view': {
      return {
        state: action.data,
        dispatch: state.dispatch,
      };
    }
    case 'find': {
      let blog = action.db?.latest.find((b) => b.slug === action.slug);
      if (!blog) {
        blog = action.db?.archive.find((b) => b.slug === action.slug);
      }
      return {
        ...state,
        state: blog,
      };
    }
  }
}

function useBlogDatabase(): BlogDatabase | undefined {
  const [state, setState] = useState<BlogDatabase | undefined>();

  useEffect(() => {
    import('../../db.json').then((links) => setState(links.default));
  }, []);

  return state;
}

export function useBlogs() {
  const db = useBlogDatabase();
  const ctx = useContext(BlogContext);

  return {
    db,
    ...ctx,
  };
}

export default function BlogProvider({ children }: React.PropsWithChildren<unknown>): React.ReactElement {
  const [state, dispatch] = useReducer(blogReducer, {});

  return (
    <BlogContext.Provider
      value={{
        state: state.state,
        dispatch,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
