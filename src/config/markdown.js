import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const MarkdownTable = (props) => (
  <TableContainer style={{ marginBottom: 16 }}>
    <Table {...props} />
  </TableContainer>
);

const markdownOptions = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h3',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h4' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h5', component: 'h5' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', paragraph: true },
    },
    a: {
      component: Link,
      props: { rel: 'nofollow' },
    },
    p: { component: Typography },
    img: { props: { style: { maxWidth: '100%' } } },
    strong: {
      component: Typography,
      props: {
        component: 'strong',
        style: {
          fontWeight: 500,
        },
      },
    },
    table: {
      component: MarkdownTable,
    },
    thead: {
      component: TableHead,
    },
    tbody: {
      component: TableBody,
    },
    tr: {
      component: TableRow,
    },
    td: {
      component: TableCell,
    },
    th: {
      component: TableCell,
      props: {
        component: 'th',
      },
    },
    ul: {
      props: {
        style: {
          paddingLeft: 20,
        },
      },
    },
  },
};

export default markdownOptions;
