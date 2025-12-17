import React from "react";
import { Button, Space, Popconfirm, Empty } from "antd";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  loading: boolean;
  onAddUser: () => void;
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onLogout: () => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  onAddUser,
  onEditUser,
  onDeleteUser,
  onLogout,
}) => {
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>User Management</h2>
        <Space>
          <Button type="primary" onClick={onAddUser} size="large">
            Add New User
          </Button>
          <Button danger onClick={onLogout} size="large">
            Logout
          </Button>
        </Space>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : users.length === 0 ? (
        <Empty description="No users found" style={{ marginTop: "50px" }} />
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: User) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <Space>
                    <Button
                      type="default"
                      size="small"
                      onClick={() => onEditUser(u.id)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Delete user"
                      description="Are you sure you want to delete this user?"
                      onConfirm={() => onDeleteUser(u.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
