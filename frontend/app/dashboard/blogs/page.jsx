"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"
import globalConstantUtil from '../../../globalConstantUtils';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_name: "",
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(globalConstantUtil.baseUrl + '/bloges');
      setBlogs(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const openAddForm = () => {
    setEditingBlog(null);
    setFormData({ title: "", content: "", author_name: "" });
    setIsOpen(true);
  };

  const openEditForm = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author_name: blog?.author_name,
    });
    setIsOpen(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBlog) {
        await axios.put(`${globalConstantUtil.baseUrl}/bloges/${editingBlog._id}`, formData);

      } else {
        await axios.post(globalConstantUtil.baseUrl + "/bloges", formData);
      }

      fetchBlogs();
      setIsOpen(false);
    } catch (error) {
      console.log("Submit Error:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${globalConstantUtil.baseUrl + '/bloges'}/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">
            Bloging page
          </h1>

          <button
            onClick={openAddForm}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl shadow"
          >
            + Add Blog
          </button>

        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="p-5 flex flex-col flex-grow">

                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {blog.content}
                </p>

                <div className="mt-auto">

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>By {blog.author_name}</span>
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openEditForm(blog)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">

              <h2 className="text-xl font-bold mb-4">
                {editingBlog ? "Edit Blog" : "Add Blog"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />

                <textarea
                  name="content"
                  placeholder="Blog Content"
                  rows="4"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />

                <input
                  type="text"
                  name="author_name"
                  placeholder="Author Name"
                  value={formData.author_name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />

                <div className="flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gray-400 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                  >
                    {editingBlog ? "Update" : "Create"}
                  </button>

                </div>
              </form>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;