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
      <div>
        <CustomInput
          name="Username"
          value={authState.email}
          onChange={(e) =>
            setAuthState({ ...authState, email: e.target.value })
          }
        />
        <CustomInput
          name="Password"
          value={authState.password}
          onChange={(e) =>
            setAuthState({ ...authState, password: e.target.value })
          }
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  };

  export default LoginPage;