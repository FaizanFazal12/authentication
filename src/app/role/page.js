// src/components/RoleTable.js
import Link from 'next/link';
import React from 'react';

const roles = [
  { roleName: 'Admin', isActive: true, isAdmin: true },
  { roleName: 'Editor', isActive: true, isAdmin: false },
  { roleName: 'Viewer', isActive: false, isAdmin: false },
];

const RoleTable = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Link href='/role/create' className="bg-blue-500 text-white px-4 py-2 rounded">Add Role</Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Role Name</th>
            <th className="px-4 py-2 border-b">Is Active</th>
            <th className="px-4 py-2 border-b">Admin</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border-b">{role.roleName}</td>
              <td className="px-4 py-2 border-b">{role.isActive ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border-b">{role.isAdmin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
