"use client";

import { useEffect, useState } from "react";
import globalConstantUtil from "../../globalConstantUtils";

import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar
} from "recharts";

export default function Dashboard() {

  const [usersCount, setUsersCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);

  const [usersChart, setUsersChart] = useState([]);
  const [blogsChart, setBlogsChart] = useState([]);


  useEffect(() => {
    fetchDashboardData();
  }, []);



  const fetchDashboardData = async () => {

    try {

      // USERS API
      const usersRes = await fetch(
        globalConstantUtil.baseUrl + "/auth/get"
      );

      const usersData = await usersRes.json();



      // BLOGS API
      const blogsRes = await fetch(
        globalConstantUtil.baseUrl + "/bloges"
      );

      const blogsData = await blogsRes.json();



      const users = usersData.data || usersData;
      const blogs = blogsData.data || blogsData;



      setUsersCount(users.length);
      setBlogsCount(blogs.length);



      setUsersChart(createCandleData(users,"createdAt"));
      setBlogsChart(createCandleData(blogs,"createdAt"));


    } catch (error) {

      console.log(error);

    }

  };



  // CANDLE DATA

  const createCandleData = (data,dateField)=>{

    const months = [
      "Jan","Feb","Mar","Apr","May",
      "Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const result = {};

    data.forEach(item=>{

      const d = new Date(item[dateField]);

      const m = months[d.getMonth()];

      if(!result[m]){

        result[m] = {
          month:m,
          open:0,
          close:0,
          high:0,
          low:0
        }

      }

      result[m].close++;
      result[m].high = Math.max(result[m].high,result[m].close);

    });


    return Object.values(result);

  };



  return (

    <div style={{padding:"20px"}}>


      {/* Cards */}

      <div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>

        <div style={cardStyle}>
          <h3>Total Users</h3>
          <h1>{usersCount}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Blogs</h3>
          <h1>{blogsCount}</h1>
        </div>

      </div>



      {/* Candle Charts */}

      <div style={{display:"flex",gap:"20px"}}>


        {/* USERS */}

        <div style={chartCard}>

          <h3>Users Candle Chart</h3>

          <ResponsiveContainer width="100%" height={300}>

            <ComposedChart data={usersChart}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>


              <Bar
              dataKey="high"
              fill="#10B981"
              />

            </ComposedChart>

          </ResponsiveContainer>

        </div>



        {/* BLOGS */}

        <div style={chartCard}>

          <h3>Blogs Candle Chart</h3>

          <ResponsiveContainer width="100%" height={300}>

            <ComposedChart data={blogsChart}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>


              <Bar
              dataKey="high"
              fill="#3B82F6"
              />

            </ComposedChart>

          </ResponsiveContainer>

        </div>


      </div>

    </div>

  );

}



const cardStyle={

padding:"20px",
flex:1,
background:"#fff",
borderRadius:"10px",
boxShadow:"0px 0px 10px rgba(0,0,0,0.1)",
textAlign:"center"

}


const chartCard={

padding:"20px",
flex:1,
background:"#fff",
borderRadius:"10px",
boxShadow:"0px 0px 10px rgba(0,0,0,0.1)"

}