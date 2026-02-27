"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {

  const router = useRouter();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const user = Cookies.get("user");

    if(!user){
      router.push("/login");
    }else{
      setLoading(false);
    }

  },[]);

  if(loading){
    return null;
  }

  return children;
}