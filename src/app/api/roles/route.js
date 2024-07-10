// 'use server'

import Role from "@/models/Role";
import { v4 as uuidv4 } from "uuid";


// export default  function handler(req, res) {
//   switch (req.method) {
//     case "GET":
//       return handleGet(req, res);
//     case "POST":
//       return handlePost(req, res);
//     case "PUT":
//       return handlePut(req, res);
//     default:
//       res.setHeader("Allow", ["GET", "POST", "PUT"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export const GET = async(req, res)=> {
  let Role = await Role.find({});
  return res.status(200).json(Role);
}

export const POST =async (req, res)=> {
  const { name } = req.body;

  if (!name || !permissions) {
    return res.status(400).json({ error: "Name and permissions are required" });
  }

  const newRole = {
    name,
    permissions,
  };

  let Role = new Role.create(newRole);

  return res.status(201).json(Role);
}

// export const PUT = async (req, res) => {
//   const { id, name, permissions } = req.body;

//   if (!id || !name || !permissions) {
//     return res
//       .status(400)
//       .json({ error: "ID, name, and permissions are required" });
//   }

//   const roleIndex = roles.findIndex((role) => role.id === id);

//   if (roleIndex === -1) {
//     return res.status(404).json({ error: "Role not found" });
//   }

//   roles[roleIndex] = {
//     ...roles[roleIndex],
//     name,
//     permissions,
//     updatedAt: new Date(),
//   };

//   return res.status(200).json(roles[roleIndex]);
// }
