import { Button } from "antd";
import CustomInput from "./CustomInput";

  type Props = {
    authState: { email: string; password: string };
    setAuthState: (state: { email: string; password: string }) => void;
    handleLogin: () => void;
  };

  const LoginPage = ({ authState, setAuthState, handleLogin }: Props) => {
    // Implement login form and authentication
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please login to continue</p>
          
          <div className="login-form">
            <CustomInput
              name="Username"
              value={authState.email}
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
              placeholder="Email..."
              hideLabel
            />
            <CustomInput
              name="Password"
              value={authState.password}
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
              placeholder="Password..."
              hideLabel
            />
            <Button 
              type="primary" 
              onClick={handleLogin}
              size="large"
              block
              className="login-button"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;