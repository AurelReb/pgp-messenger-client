import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
}));

const ButtonWithTooltip = ({ tooltipText, disabled, onClick, ...props }) => {
  const classes = useStyles();

  const adjustedButtonProps = {
    disabled,
    component: disabled ? 'div' : undefined,
    onClick: disabled ? undefined : onClick,
    classes,
  };
  return (
    <Tooltip title={tooltipText}>
      <Button {...props} {...adjustedButtonProps} />
    </Tooltip>
  );
};

ButtonWithTooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,

};

ButtonWithTooltip.defaultProps = {
  disabled: false,
  onClick: undefined,
};

export default ButtonWithTooltip;
