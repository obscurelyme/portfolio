import React, { Dispatch, useContext, useReducer, useEffect, useRef } from 'react';

import { BlogDetails } from '../Database';

interface BlogAction {
  type: string;
  data?: BlogDetails;
}

type BlogDispatch = Dispatch<BlogAction> | undefined;

const BlogCurrentContent = React.createContext<BlogDetails | undefined>(undefined);
const BlogCurrentDispatchContext = React.createContext<BlogDispatch>(undefined);

function blogCurrentReducer(_: any, action: any): any {
  switch (action.type) {
    case 'current': {
      return {
        ...action.data,
      };
    }
    case 'clear': {
      return undefined;
    }
    default: {
      throw new Error(`Unknown reducer action ${action.type}`);
    }
  }
}

export function useCurrentBlogDetails(): BlogDetails | undefined {
  return useContext(BlogCurrentContent);
}

export function useCurrentBlogDispatch(): BlogDispatch {
  return useContext(BlogCurrentDispatchContext);
}

export function setCurrent(data: BlogDetails, dispatch: BlogDispatch): void {
  dispatch?.({
    type: 'current',
    data,
  });
}

export function clearCurrent(dispatch: BlogDispatch): void {
  dispatch?.({
    type: 'clear',
  });
}

export function useSetCurrentBlogDetails(data: BlogDetails) {
  const ref = useRef(false);
  const dispatch = useCurrentBlogDispatch();

  useEffect(() => {
    if (ref.current) {
      return;
    }

    ref.current = true;
    setCurrent(data, dispatch);

    return () => {
      ref.current = false;
      clearCurrent(dispatch);
    };
  }, [data, dispatch]);
}

export default function CurrentBlogProvider({ children }: React.PropsWithChildren<unknown>): React.ReactElement {
  const [current, dispatch] = useReducer(blogCurrentReducer, undefined);

  return (
    <BlogCurrentDispatchContext.Provider value={dispatch}>
      <BlogCurrentContent.Provider value={current}>{children}</BlogCurrentContent.Provider>;
    </BlogCurrentDispatchContext.Provider>
  );
}
