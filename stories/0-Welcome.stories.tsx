import React from 'react';
import ReactMarkdown from 'react-markdown';
const CHANGELOG = require('../CHANGELOG.md');
const README = require('../README.md');
const DEVNOTES = require('../DEVNOTES.md');

import './style/storybook.scss';
import 'github-markdown-css/github-markdown.css';

export default {
  title: 'Welcome',
};

export const toReadmeStorybook = () => {
  return (
    <div className="u-m-8 markdown-body">
      <ReactMarkdown source={README.default}></ReactMarkdown>
    </div>
  )
}

toReadmeStorybook.story = {
  name: 'UUI',
};

export const toDevnotesStorybook = () => {
  return (
    <div className="u-m-8 markdown-body">
      <ReactMarkdown source={DEVNOTES.default}></ReactMarkdown>
    </div>
  )
}

toDevnotesStorybook.story = {
  name: 'Notes',
};

export const toChangelogStorybook = () => {
  return (
    <div className="u-m-8 markdown-body">
      <ReactMarkdown source={CHANGELOG.default}></ReactMarkdown>
    </div>
  )
}

toChangelogStorybook.story = {
  name: 'Changelog',
};