import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import { addUser } from "../utils/api";
import { Button, notification } from "antd";

const AddUserForm = ({ onDone }: any) => {
  // Implement user form for add/edit
  const [addUserState, setAddUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleAddUser = async () => {
    const data = await addUser(
      addUserState.name,
      addUserState.email,
      addUserState.password
    );
    if (!data) {
      notification["error"]({
        description: "Something went wrong. Please try again.",
      });
    }
    onDone();
  };

  return (
    <div>
      <CustomInput
        name="Name"
        value={addUserState.name}
        onChange={(e) =>
          setAddUserState({ ...addUserState, name: e.target.value })
        }
      />
      <CustomInput
        name="Email"
        value={addUserState.email}
        onChange={(e) =>
          setAddUserState({ ...addUserState, email: e.target.value })
        }
      />
      <CustomInput
        name="Password"
        value={addUserState.password}
        onChange={(e) =>
          setAddUserState({ ...addUserState, password: e.target.value })
        }
      />
      <Button onClick={handleAddUser}>Submit</Button>
    </div>
  );
};

export default AddUserForm;