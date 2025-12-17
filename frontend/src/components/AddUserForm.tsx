import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import { addUser } from "../utils/api";
import { Button, notification, Space } from "antd";

interface AddUserFormProps {
  onDone: () => void;
  onCancel: () => void;
}

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

const AddUserForm: React.FC<AddUserFormProps> = ({ onDone, onCancel }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setFormState(initialFormState);
      setLoading(false);
    };
  }, []);

  const validateForm = () => {
    if (!formState.name.trim()) {
      notification.error({
        message: "Validation Error",
        description: "Name is required",
      });
      return false;
    }
    if (!formState.email.trim()) {
      notification.error({
        message: "Validation Error",
        description: "Email is required",
      });
      return false;
    }
    if (!formState.password.trim()) {
      notification.error({
        message: "Validation Error",
        description: "Password is required",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      notification.error({
        message: "Validation Error",
        description: "Please enter a valid email address",
      });
      return false;
    }
    return true;
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await addUser(
        formState.name,
        formState.email,
        formState.password
      );
      if (!data) {
        notification.error({
          message: "Error",
          description: "Something went wrong. Please try again.",
        });
        return;
      }
      notification.success({
        message: "Success",
        description: "User added successfully",
      });
      resetForm();
      onDone();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add user. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState(initialFormState);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleInputChange = (field: keyof typeof formState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({ ...formState, [field]: e.target.value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <CustomInput
        name="Name"
        value={formState.name}
        onChange={handleInputChange("name")}
      />
      <CustomInput
        name="Email"
        value={formState.email}
        onChange={handleInputChange("email")}
      />
      <CustomInput
        name="Password"
        value={formState.password}
        onChange={handleInputChange("password")}
      />
      <Space style={{ marginTop: "8px", justifyContent: "flex-end" }}>
        <Button onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleAddUser} loading={loading}>
          Submit
        </Button>
      </Space>
    </div>
  );
};

export default AddUserForm;