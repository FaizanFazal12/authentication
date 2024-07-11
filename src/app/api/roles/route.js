import ConnectToMongoDb from "@/connect";
import Role from "@/models/Role";

ConnectToMongoDb();
export async function GET(request) {
  let reqBody = request.json();
  const { role, permissions } = reqBody;
  if (role) {
    let roleFound = await Role.findOne({ name: role });
    if (!roleFound) {
      return Response.status(404).json({ message: "Role not found" });
    }
    return Response.json({ role: roleFound });
  }
  let roles = await Role.find({});
  return Response.json({ roles });
}
export async function POST(request) {
  let reqBody = request.json();
  const { role, permissions } = reqBody;

  let newRole = await new Role({ role, permissions });
  await newRole.save();

  return Response.json({ roles: newRole });
}
export async function PUT(request) {
  let reqBody = request.json();
  const { role, permissions } = reqBody;

  let newRole = await Role.findOneAndUpdate(
    { role },
    {
      role,
      permissions,
    }
  );

  return Response.json({ roles: newRole });
}
export async function DELETE(request) {
  let reqBody = request.json();
  const { role } = reqBody;

  await Role.deleteOne({ name: role });

  return Response.json({ msg: "Role is deleted succefully" });
}
