"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  const roles = [
    { roleName: "Admin", isActive: true, isAdmin: true },
    { roleName: "Editor", isActive: true, isAdmin: false },
    { roleName: "Viewer", isActive: false, isAdmin: false },
  ];

  const [users, setUsers] = useState();
  async function GetAllUser() {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data.users);
  }
  useEffect(() => {
    GetAllUser();
  }, []);
  return (
    <div className="container mx-auto p-4">
    {session?.user ? (
      <>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {/* Uncomment the following line to display the 'name' column */}
              {/* <th className="px-4 py-2 border-b">name</th> */}
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">UserName</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="text-center">
                {/* Uncomment the following line to display the user's name */}
                {/* <td className="px-4 py-2 border-b">{user.name}</td> */}
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Please Login To See Users</h1>
      </div>
    )}
  </div>
  
  );
};

export default Home;
