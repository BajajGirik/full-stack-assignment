import React, { useState, useEffect } from "react";
import { Drawer, Form, Button, notification } from "antd";
import CustomInput from "./CustomInput";
import { updateUser } from "../utils/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface EditUserDrawerProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onDone: () => void;
}

const EditUserDrawer: React.FC<EditUserDrawerProps> = ({
  open,
  user,
  onClose,
  onDone,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
      });
    }
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const result = await updateUser(user!.id, values.name);

      if (result) {
        notification.success({
          message: "User updated successfully",
        });
        form.resetFields();
        onDone();
      } else {
        notification.error({
          message: "Failed to update user",
        });
      }
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Edit User"
      open={open}
      onClose={handleClose}
      width={400}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Update
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <CustomInput placeholder="Enter name" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditUserDrawer;