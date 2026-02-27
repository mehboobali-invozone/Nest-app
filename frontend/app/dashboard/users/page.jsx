"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import globalConstantUtil from "../../../globalConstantUtils";

const User = () => {

  const [showModal, setShowModal] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // ================= GET USERS =================

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        globalConstantUtil.baseUrl + "/auth/get"
      );

      setUserdata(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD USER =================

  const handleAdd = async () => {

    try {

      const res = await axios.post(
        globalConstantUtil.baseUrl + "/auth/register",
        {
          name: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }
      );

      console.log(res.data);

      getUsers();

      setShowModal(false);

      setForm({
        username: "",
        email: "",
        password: "",
        role: "",
      });

    } catch (error) {

      console.log("Add Error:", error.response?.data);

    }

  };


  // ================= OPEN EDIT =================

  const openEditForm = (user) => {

    setEditId(user._id);

    setForm({
      username: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "",
    });

    setShowModal(true);

  };


  // ================= UPDATE USER =================

  const handleUpdate = async () => {

    try {

      const updateData = {
        name: form.username,
        email: form.email,
        role: form.role,
      };

      if (form.password) {
        updateData.password = form.password;
      }

      await axios.put(
        globalConstantUtil.baseUrl + "/auth/" + editId,
        updateData
      );

      getUsers();

      setShowModal(false);

      setEditId(null);

      setForm({
        username: "",
        email: "",
        password: "",
        role: "",
      });

    } catch (error) {

      console.log("Update Error:", error.response?.data);

    }

  };


  // ================= DELETE USER =================

  const handleDelete = async (user) => {

    try {

      await axios.delete(
        globalConstantUtil.baseUrl + "/auth/" + user._id
      );

      getUsers();

    } catch (error) {

      console.log("Delete Error:", error.response?.data);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 px-6 py-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between mb-6">

          <h1 className="text-2xl font-bold">
            Users
          </h1>

          <button
            onClick={() => {
              setShowModal(true);
              setEditId(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add User
          </button>

        </div>


        {/* MODAL */}

        {showModal && (

          <div className="fixed inset-0 flex justify-center items-center bg-black/50">

            <div className="bg-white p-6 rounded-xl w-96">

              <h2 className="text-xl mb-4 font-bold">

                {editId ? "Edit User" : "Add User"}

              </h2>


              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="border w-full mb-3 p-2 rounded"
              />


              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border w-full mb-3 p-2 rounded"
              />


              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                className="border w-full mb-3 p-2 rounded"
              />


              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border w-full mb-4 p-2 rounded"
              >

                <option value="">
                  Select Role
                </option>

                <option>
                  Admin
                </option>

                <option>
                  Editor
                </option>

              </select>


              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setShowModal(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>


                {editId ? (

                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>

                ) : (

                  <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>

                )}

              </div>

            </div>

          </div>

        )}



        {/* TABLE */}


        <table className="w-full bg-white rounded-xl overflow-hidden">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Role
              </th>

              <th className="p-3 text-right">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {userdata.map((u) => (

              <tr key={u._id} className="border-t">

                <td className="p-3">
                  {u.name}
                </td>

                <td className="p-3">
                  {u.email}
                </td>

                <td className="p-3">
                  {u.role}
                </td>

                <td className="p-3 text-right space-x-2">

                  <button
                    onClick={() => openEditForm(u)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => handleDelete(u)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>


                </td>

              </tr>

            ))}

          </tbody>

        </table>


      </div>

    </div>

  );

};

export default User;