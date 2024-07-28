"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from '@/app/loading/loading'; 
import { Box,IconButton, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, Checkbox } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    title: "",
    firstName: "",
    lastName: "",
    username: "",
    street: "",
    addressComplement: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: "",
    receiveSms: "",
    landlineNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    annualExpense: "",
    newsletter: false,
    conditions: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    if (
      user.email &&
      user.password &&
      user.username &&
      user.password === user.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (event:any) => {
    const { name, value, type, checked } = event.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const nextPage = () => {
    setCurrentPage(2);
  };

  const prevPage = () => {
    setCurrentPage(1);
  };

  const onSignup = async (event:any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      const errResponse = error?.response?.data?.error;
      toast.error(errResponse ?? "Error, Try again later");
    } finally {
      setLoading(false);
    }
  };


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
      {loading && <Loading />}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          bgcolor: "background.paper",
        }}
      >
        <form onSubmit={onSignup}>
          {currentPage === 1 && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Title *</FormLabel>
                    <RadioGroup
                      row
                      name="title"
                      value={user.title}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Mr."
                        control={<Radio />}
                        label="Mr."
                      />
                      <FormControlLabel
                        value="Mrs."
                        control={<Radio />}
                        label="Mrs."
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* Include other fields up to phoneNumber */}
                <Grid item xs={12}>
                  <TextField
                    label="UserName *"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="First Name *"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Last Name *"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Street and Number *"
                    name="street"
                    value={user.street}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Address complement"
                    name="addressComplement"
                    value={user.addressComplement}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Postal Code *"
                    name="postalCode"
                    value={user.postalCode}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="City *"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Country"
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Phone Number *"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button type="button" onClick={nextPage}>Next</Button>
            </>
          )}

          {currentPage === 2 && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Receive an SMS in case of emergency
                    </FormLabel>
                    <RadioGroup
                      row
                      name="receiveSms"
                      value={user.receiveSms}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Landline Number"
                    name="landlineNumber"
                    value={user.landlineNumber}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Email Address *"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Password *"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    type="password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Password Confirmation *"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                    type="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="occupation-label">I am a...</InputLabel>
                    <Select
                      labelId="occupation-label"
                      name="occupation"
                      value={user.occupation}
                      label="I am a..."
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">
                        <em>Choose an option</em>
                      </MenuItem>
                      <MenuItem value="individual">Individual</MenuItem>
                      <MenuItem value="others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="annual-expense-label">
                      How much do you spend annually on printing?
                    </InputLabel>
                    <Select
                      labelId="annual-expense-label"
                      name="annualExpense"
                      value={user.annualExpense}
                      label="How much do you spend annually on printing?"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">
                        <em>Choose an option</em>
                      </MenuItem>
                      <MenuItem value="100-500">€100 - €500</MenuItem>
                      <MenuItem value="500-1000">€500 - €1,000</MenuItem>
                      <MenuItem value="1000-5000">€1,000 - €5,000</MenuItem>
                      <MenuItem value="5000-10000">€5,000 - €10,000</MenuItem>
                      <MenuItem value="10000+">€10,000+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="newsletter"
                        checked={user.newsletter}
                        onChange={handleChange}
                      />
                    }
                    label="I would like to receive the newsletter and be kept up to date"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="conditions"
                        checked={user.conditions}
                        onChange={handleChange}
                        required
                      />
                    }
                    label="I accept the general terms and conditions"
                  />
                </Grid>
              </Grid>
              <div>          
                <Button type="button" onClick={prevPage}>Back</Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-blue-500"
                fullWidth
                disabled={loading || buttonDisabled}
              >
                {loading ? (
                    <CircularProgress size={24} color="info" />
                  ) : (
                    "Create an account"
                  )}
              </Button>
              </div>
            </>
          )}
        </form>
      </Box>
    </div>
    </ThemeProvider>

  );
}
