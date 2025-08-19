import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime.js';
import Home from '../pages/index';
import Watch from '../pages/watch/[id]';

function renderWithHead(ui) {
  const updateHead = (state) => {
    document.head.innerHTML = renderToStaticMarkup(<>{state}</>);
  };
  return render(
    <HeadManagerContext.Provider value={{ updateHead, mountedInstances: new Set() }}>
      {ui}
    </HeadManagerContext.Provider>
  );
}

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
});

describe('Meta tags', () => {
  test('home page has correct meta tags', () => {
    renderWithHead(<Home />);
    expect(document.title).toBe('Next Video Site');
    expect(document.querySelector('meta[name="description"]').content).toBe('Watch our collection of videos.');
    expect(document.querySelector('meta[property="og:title"]').content).toBe('Next Video Site');
    expect(document.querySelector('meta[name="twitter:title"]').content).toBe('Next Video Site');
  });

  test('watch page has correct meta tags', () => {
    const video = { title: 'Video 1', description: 'Description for video 1' };
    renderWithHead(<Watch video={video} id="1" />);
    expect(document.title).toBe('Video 1 - Next Video Site');
    expect(document.querySelector('meta[property="og:url"]').content).toBe('http://localhost:3000/watch/1');
    expect(document.querySelector('meta[name="twitter:description"]').content).toBe('Description for video 1');
  });
});
