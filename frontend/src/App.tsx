import React, { useState, useEffect } from "react";
import "./App.css";
import CustomInput from "./components/CustomInput";
import { Modal, notification } from "antd";
import { addUser, fetchUsers, login, deleteUser } from "./utils/api";
import AddUserForm from "./components/AddUserForm";
import LoginPage from "./components/LoginPage";
import UserList from "./components/UserList";
import EditUserDrawer from "./components/EditUserDrawer";

function App() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authState, setAuthState] = useState({ email: "", password: "" });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const getAllUsers = () => {
    setLoading(true);
    fetchUsers(1, 10).then((data) => {
      console.log("Data", data);
      setUsers(data.data.users || []);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const result = await deleteUser(userId);
      if (result) {
        notification.success({
          message: 'User deleted successfully',
        });
        getAllUsers();
      } else {
        notification.error({
          message: 'Failed to delete user',
        });
      }
    } catch (err) {
      notification.error({
        message: 'Error deleting user',
      });
    }
  };

  const handleEditUser = (userId: string) => {
    const user = users.find((u: any) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setEditDrawerOpen(true);
    }
  };

  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token]);

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
          <UserList users={users} loading={loading} onAddUser={() => setShowAddUserModal(true)} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
          <Modal
            title="Add New User"
            open={showAddUserModal}
            onCancel={() => setShowAddUserModal(false)}
            footer={null}
            destroyOnClose
          >
            <AddUserForm
              onDone={() => {
                setShowAddUserModal(false);
                getAllUsers();
              }}
              onCancel={() => setShowAddUserModal(false)}
            />
          </Modal>
          <EditUserDrawer
            open={editDrawerOpen}
            user={selectedUser}
            onClose={() => {
              setEditDrawerOpen(false);
              setSelectedUser(null);
            }}
            onDone={() => {
              setEditDrawerOpen(false);
              setSelectedUser(null);
              getAllUsers();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;