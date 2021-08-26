import { renderHook } from '@testing-library/react-hooks';

import { useBreadcrumbs } from './index';

describe('Breadcrumbs', () => {
  it('should parse the give pathname into an array of links', () => {
    const {
      result: { current },
    } = renderHook(() => useBreadcrumbs('/blogs/lorem-ipsum'));

    expect(current).toStrictEqual([
      { title: 'Blogs', link: '/blogs', isCurrentPage: false },
      { title: 'Lorem ipsum', link: '/blogs/lorem-ipsum', isCurrentPage: true },
    ]);
  });

  it('should parse into an empty array', () => {
    const {
      result: { current },
    } = renderHook(() => useBreadcrumbs('/'));

    expect(current).toStrictEqual([]);
  });
});
