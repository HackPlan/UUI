import React from 'react';
import ReactMarkdown from 'react-markdown';
const changelog = require('../Changelog.md');
const README = require('../README.md');

import 'github-markdown-css/github-markdown.css';

export default {
  title: 'Welcome',
};

export const toStorybook = () => {
  return (
    <div className="u-m-8 markdown-body">
      <ReactMarkdown source={README.default}></ReactMarkdown>
      <ReactMarkdown source={changelog.default}></ReactMarkdown>
    </div>

  )
}

toStorybook.story = {
  name: 'UUI',
};
