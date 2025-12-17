import React, { useState, useEffect } from "react";
import "./App.css";
import CustomInput from "./components/CustomInput";
import { Button, Modal, notification } from "antd";
import { addUser, fetchUsers, login } from "./utils/api";
import AddUserForm from "./components/AddUserForm";
import LoginPage from "./components/LoginPage";

function App() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authState, setAuthState] = useState({ email: "", password: "" });
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // TODO: Candidate should implement these components and functions
  const handleLogin = async () => {
    const data = await login(authState.email, authState.password);
    if (!data) {
      return notification["error"]({
        description: "Something went wrong. Please try again.",
      });
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const getAllUsers = () =>
    fetchUsers(1, 10).then((data) => {
      console.log("Data", data);
      setUsers(data.data.users || []);
    });

  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token]);

  const UserList = () => {
    // Implement user listing with add/edit/delete functionality
    return (
      <div>
        <h2>User List</h2>
        <Button onClick={() => setShowAddUserModal(true)}>Add User</Button>
        <table className="list_container">
          <th>
            <tr>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </th>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <Button>Edit</Button>
            </tr>
          ))}
        </table>
      </div>
    );
  };

  return (
    <div className="App">
      {!token ? (
        <LoginPage
          authState={authState}
          setAuthState={setAuthState}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <UserList />
          <Modal
            title="Basic Modal"
            closable={{ "aria-label": "Custom Close Button" }}
            open={showAddUserModal}
            onCancel={() => setShowAddUserModal(false)}
          >
            <AddUserForm
              onDone={() => {
                setShowAddUserModal(false);
                getAllUsers();
              }}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;
