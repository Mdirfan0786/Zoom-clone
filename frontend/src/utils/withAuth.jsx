import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import server from "../environment";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    const verifyToken = async (token) => {
      try {
        const res = await axios.post(`${server}/api/v1/users/verify_token`, {
          token,
        });
        return res.status === 200 && res.data.valid;
      } catch (error) {
        return false;
      }
    };

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          router("/auth");
          return;
        }

        const isValid = await verifyToken(token);
        if (!isValid) {
          localStorage.removeItem("token");
          router("/auth");
          return;
        }

        setIsVerified(true);
      };

      checkAuth();
    }, []);

    // Waiting for token validation before rendering
    if (!isVerified)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <CircularProgress />
        </div>
      );

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
