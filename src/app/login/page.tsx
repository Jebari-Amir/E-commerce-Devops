"use client";
import { Box, Button, Grid, TextField, Typography, CircularProgress, IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading/loading";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onLogin = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify({
          token: response.data.token,
          user: response.data.user
        }));
        router.push("/");
        toast.success("Login successful!");
      } else {
        throw new Error("No user data returned from API");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error ?? "Error, Try again later");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000); 
    }
  };

  const handleSignupClick = async () => {
    setLoading(true);
    router.push("/signup");
    setLoading(true); 
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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
            border: "1px solid",
            borderColor: 'divider',
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            bgcolor: "background.paper",
          }}
        >
          <form onSubmit={onLogin}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Adresse email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mot de passe"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} container justifyContent="flex-end">
                <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary">
                    Mot de passe oublié ?
                  </Typography>
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="bg-blue-500"
                  disabled={loading || buttonDisabled}
                >
                  {loading ? (
                    <CircularProgress size={24} color="info" />
                  ) : (
                    "Me connecter"
                  )}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                 variant="contained" 
                 className="bg-gray-500" 
                 fullWidth
                 onClick={handleSignupClick}
                >
                  Créer un compte
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </ThemeProvider>
  );
}