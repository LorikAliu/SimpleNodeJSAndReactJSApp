import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addUser } from "../../api/register";

// import {Form} from "react-bootstrap";
// css
// import "./Register.scss";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
// import Header from "../Header/Header";
import { Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  darkTheme: {
    backgroundColor: "#424242",
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundImage: "url(https://images.unsplash.com/photo-1607309843146-f60aded21e1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
    //   theme.palette.type === "light"
        // ? theme.palette.grey[50]
        theme.palette.grey[50],
        // : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#f48fb1",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Register = () => {
  const history = useHistory();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const [errMessage, setErrMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data, e) => {
    const registerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await addUser(registerData);
      e.target.reset();
      console.log(response)

      // setErrMessage(response.errMessage);
      // setSuccessMessage(response.successMessage);
      response.errMessage ? setErrMessage(response.errMessage) : setErrMessage(false);
      response.successMessage ? setSuccessMessage(response.successMessage) : setSuccessMessage(false);
 
    } catch (e) {}
  };

//   useEffect(() => {}, [currentUser]);
//   if (currentUser) {
//     return <Redirect to={"/"} />;
//   }

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <Header /> */}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              style={{ marginBottom: "20px" }}
              component="h1"
              variant="h5">
              Register
            </Typography>
            <br />
            {errMessage && <Alert severity="error">{errMessage}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            <br />
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                // autoComplete="fname"
                name="firstName"
                variant="outlined"
                // required
                fullWidth
                label="First Name"
                type="text"
                id="firstName"
                inputRef={register({ 
                    required: true, 
                    minLength: 3,
                    pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: "Name cannot contain numbers or symbols",
                    },
                })}
                // onChange={handleChange}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.firstName && errors.firstName.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.firstName && errors.firstName.type === "minLength" && (
                  <span>
                    This field requires minimum length of 3 characters!
                  </span>
                )}
                {errors.firstName && errors.firstName.type === "pattern" && (
                  <span>
                    Name cannot contain numbers or symbols!
                  </span>
                )}
              </p>

              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Last Name"
                name="lastName"
                type="text"
                id="lastName"
                // autoComplete="lname"
                inputRef={register({ 
                    required: true, 
                    minLength: 3,
                    pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: "Last Name cannot contain numbers or symbols",
                    },
                })}
                // onChange={handleChange}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.lastName && errors.lastName.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.lastName && errors.lastName.type === "minLength" && (
                  <span>
                    This field requires minimum length of 3 characters!
                  </span>
                )}
                {errors.lastName && errors.lastName.type === "pattern" && (
                  <span>
                    Last Name cannot contain numbers or symbols!
                  </span>
                )}
              </p>
              <TextField
                variant="outlined"
                // required
                fullWidth
                label="Email Address"
                type="email"
                id="email"
                name="email"
                // autoComplete="email"
                inputRef={register({
                  required: true,
                  minLength: 6,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                // onChange={handleChange}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.email && errors.email.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.email && errors.email.type === "minLength" && (
                  <span>
                    This field requires minimum length of 6 characters!
                  </span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span>Invalid email address!</span>
                )}
              </p>
              <TextField
                variant="outlined"
                // required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
                inputRef={register({ 
                  required: true, 
                  minLength: 8,
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i,
                    message: "Password is not strong enough. You must include one lower case, one uppercase and one number!",
                  },
                })}
                // onChange={handleChange}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.password && errors.password.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span>
                    This field requires minimum length of 8 characters!
                  </span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <span>
                    Password is not strong enough. You must include one lower case, one uppercase and one number!
                  </span>
                )}
              </p>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginBottom: "15px" }}
                // className={classes.submit}
                // onClick={handleSubmit}
                type="submit">
                Register
              </Button>
              <Grid container>
                <Grid item>
                    <Link
                      to="/login"
                      style={{ color: "#222" }}
                      variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
