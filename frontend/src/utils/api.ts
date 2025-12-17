import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api/v1";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    return response.data as any;
  } catch (err) {
    return null;
  }
};


export const fetchUsers = async (page: number, limit: number) => {
  try {
    const response = await axios.get("/users", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response.data as any;
  } catch (err) {
    return null;
  }
}

export const addUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post("/users", {
      name,
      email,
      password,
    }, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response.data as any;
  } catch (err) {
    return null;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`/users/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response.data as any;
  } catch (err) {
    return null;
  }
};

export const updateUser = async (userId: string, name: string) => {
  try {
    const response = await axios.put(`/users/${userId}`, {
      name,
    }, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return response.data as any;
  } catch (err) {
    return null;
  }
};