import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import { Typography } from '@material-ui/core';
import markdownOptions from '../config/markdown';

function HighlightedMarkdown({ children }) {
  const rootRef = useRef();

  useEffect(() => {
    rootRef.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [children]);

  return (
    <Typography component="span" ref={rootRef}>
      <Markdown options={markdownOptions}>{children}</Markdown>
    </Typography>
  );
}

HighlightedMarkdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HighlightedMarkdown;
