"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import globalConstantUtil from "../../../globalConstantUtils";

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
   content: ""
 
  });

  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;


  const fetchBlogs = async () => {
    try {

      const res = await axios.get(
        globalConstantUtil.baseUrl + "/bloges",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

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
    setFormData({
      title: "",
      content: ""
    });
    setIsOpen(true);
  };


  const openEditForm = (blog) => {
    setEditingBlog(blog);
    setFormData({
  title: blog.title,
  content: blog.content
});
    setIsOpen(true);
  };


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {

        await axios.put(
          `${globalConstantUtil.baseUrl}/bloges/${editingBlog.id}`,
          formData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

      } else {

        await axios.post(
          globalConstantUtil.baseUrl + "/bloges",
          formData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        console.log("Submitting blog:", formData);
        console.log("Token:", token);
        // console.log(formData,token)

      }

      fetchBlogs();
      setIsOpen(false);

    } catch (error) {

      console.log("Submit Error:", error);

    }

  };


  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `${globalConstantUtil.baseUrl}/bloges/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchBlogs();

    } catch (error) {

      console.log("Delete Error:", error);

    }

  };


  return (

<div className="min-h-screen bg-gray-100 p-8">

<div className="flex justify-between mb-6">

<h1 className="text-2xl font-bold">
Blogs
</h1>

<button
onClick={openAddForm}
className="bg-green-600 text-white px-5 py-2 rounded-xl"
>
+ Add Blog
</button>

</div>


<div className="grid gap-6 md:grid-cols-3">

{blogs.map((blog)=>(
<div key={blog.id}
className="bg-white p-5 rounded-xl shadow">

<h2 className="text-xl font-bold">
{blog.title}
</h2>

<p className="text-gray-600 mt-2">
{blog.content}
</p>


<p className="text-sm mt-3 text-gray-500">
By {blog.author_name}
</p>


<div className="flex gap-2 mt-4">

<button
onClick={()=>openEditForm(blog)}
className="flex-1 bg-yellow-500 text-white py-2 rounded"
>
Edit
</button>

<button
onClick={()=>handleDelete(blog.id)}
className="flex-1 bg-red-600 text-white py-2 rounded"
>
Delete
</button>

</div>

</div>
))}

</div>


{/* MODAL */}

{isOpen && (

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white p-6 rounded-xl w-96">

<h2 className="text-xl mb-4">

{editingBlog ? "Edit Blog":"Add Blog"}

</h2>


<form onSubmit={handleSubmit}
className="space-y-4">


<input
name="title"
placeholder="Title"
value={formData.title}
onChange={handleChange}
className="w-full border p-2 rounded"
/>


<textarea
name="content"
placeholder="Content"
value={formData.content}
onChange={handleChange}
className="w-full border p-2 rounded"
/>


<div className="flex gap-2 justify-end">

<button
type="button"
onClick={()=>setIsOpen(false)}
className="bg-gray-400 text-white px-4 py-2 rounded"
>
Cancel
</button>


<button
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Save
</button>

</div>

</form>

</div>

</div>

)}

</div>

  );
};

export default Blogs;