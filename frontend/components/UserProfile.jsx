"use client";

import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const UserProfile = ({ onClose }) => {

const dispatch = useDispatch();

const user = useSelector((s)=>s.auth.user || {});

const handleLogout = () => {

dispatch(logout());

window.location.href="/login";

};

return (

<div className="absolute right-1 top-16 bg-white p-8 rounded-lg w-96 shadow-lg z-50">

<div className="flex justify-between items-center">

<p className="font-semibold text-lg">
User Profile
</p>

<button onClick={onClose}>
<MdOutlineCancel />
</button>

</div>


<div className="mt-6">

<p className="font-semibold text-xl">
{user?.name || "User"}
</p>

<p className="text-gray-500">
{user?.role || "-"}
</p>

<p className="text-gray-500">
{user?.email || "-"}
</p>

</div>


<div className="mt-5">

<button
className="p-3 w-full bg-green-600 text-white rounded-lg"
onClick={handleLogout}
>

Logout

</button>

</div>

</div>

);
};

export default UserProfile;