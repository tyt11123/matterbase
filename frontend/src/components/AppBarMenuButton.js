import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 2),
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageButton": {
        opacity: 0.5,
      },
    },
  },
  focusVisible: {},
  imageButton: {
    color: theme.palette.common.black,
    opacity: 1,
    "& span": {
      verticalAlign: "text-bottom",
    },
  },
}));

AppBarMenuButton.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default function AppBarMenuButton(props) {
  const classes = useStyles();
  const history = useHistory();
  const { url, name, path } = props;
  const buttonClick = (link) => history.push(link);
  const regex = /\./g;

  return (
    <ButtonBase
      focusRipple
      className={classes.image}
      focusVisibleClassName={classes.focusVisible}
      onClick={() => buttonClick(url)}
    >
      <span className={classes.imageButton}>
        {
          path.match(regex).map((_, i) => {
            return i > 0 && (
              <ArrowRightIcon />
            )
          })
        }
        <Typography component="span" variant="subtitle1" color="inherit">
          {name}
        </Typography>
      </span>
    </ButtonBase>
  );
}
