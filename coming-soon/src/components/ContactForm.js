import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0),
    paddingLeft: "30%",
    paddingRight: "30%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 5),
    },
  },
  typography: {
    fontFamily: "EB Garamond",
  },
  form: {
    "& > *": {
      height: "7ch",
    },
  },
  input: {
    width: "100%",
  },
}));

export default function ContactForm(props) {
  const [state, handleSubmit] = useForm(`${process.env.REACT_APP_FORMSPREE_ID}`);
  const classes = useStyles();
  if (state.succeeded) {
    return (
      <React.Fragment>
        <Box mt={3}>&nbsp;</Box>
        <Typography variant="h6" align="center" noWrap>
          Thanks for joining!
        </Typography>
        <Box mt={3}>&nbsp;</Box>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container maxWidth={false} className={classes.root} {...props}>
        <Typography variant="h6" align="center" className={classes.typography}>
          Sign up and we will notify you our progress.
        </Typography>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid
            container
            justify="center"
            alignItems="flex-end"
            spacing={0}
            className={classes.input}
          >
            <Grid item xs={12} sm={9}>
              <TextField
                id="email"
                label="your email here"
                type="email"
                name="email"
                className={classes.input}
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-end"
                spacing={0}
              >
                <Button type="submit" disabled={state.submitting}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
