"use client";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onLogin = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", user);
      toast.success("Email sent successfully");
    } catch (error: any) {
      const errResponse = error?.response?.data?.error;
      toast.error(errResponse ?? "Error, Try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
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

            <Grid item xs={12} container justifyContent="flex-end">
              <Typography variant="body2">
                Already have an account?{" "}
                <Link href="login" className="text-blue-500">
                  Login
                </Link>{" "}
              </Typography>
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
                  "Forgot Password"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
