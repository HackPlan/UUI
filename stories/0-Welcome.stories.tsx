import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

const CHANGELOG = require('../CHANGELOG.md');
const README = require('../README.md');
const DEVNOTES = require('../DEVNOTES.md');

import './style/storybook.scss';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/tomorrow.css';

hljs.registerLanguage('javascript', javascript);

export default {
  title: 'Welcome',
};

export const toReadmeStorybook = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref) {
      const nodes = ref.current.querySelectorAll('pre');
      nodes.forEach((node) => {
        hljs.highlightBlock(node);
      });
    }
  }, [ref])

  return (
    <div ref={ref} className="u-m-8 markdown-body">
      <ReactMarkdown source={README.default}></ReactMarkdown>
    </div>
  )
}

toReadmeStorybook.story = {
  name: 'UUI',
};

export const toDevnotesStorybook = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref) {
      const nodes = ref.current.querySelectorAll('pre');
      nodes.forEach((node) => {
        hljs.highlightBlock(node);
      });
    }
  }, [ref])

  return (
    <div ref={ref} className="u-m-8 markdown-body">
      <ReactMarkdown source={DEVNOTES.default}></ReactMarkdown>
    </div>
  )
}

toDevnotesStorybook.story = {
  name: 'Notes',
};

export const toChangelogStorybook = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref) {
      const nodes = ref.current.querySelectorAll('pre');
      nodes.forEach((node) => {
        hljs.highlightBlock(node);
      });
    }
  }, [ref])

  return (
    <div ref={ref} className="u-m-8 markdown-body">
      <ReactMarkdown source={CHANGELOG.default}></ReactMarkdown>
    </div>
  )
}

toChangelogStorybook.story = {
  name: 'Changelog',
};