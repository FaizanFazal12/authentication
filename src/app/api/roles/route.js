import ConnectToMongoDb from "@/connect";
import Role from "@/models/Role";
import Permission from "@/models/Permission";

ConnectToMongoDb();

export async function GET(request) {
  try {
    let roles = await Role.find({}).populate("permissions");
    return new Response(JSON.stringify({ roles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch roles" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    let reqBody = await request.json();
    const { name, permissionIds } = reqBody;

    let role = new Role({ name, permissions: permissionIds });
    await role.save();

    return new Response(JSON.stringify({ role }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create role" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    let reqBody = await request.json();
    const { id, name, permissionIds } = reqBody;

    let role = await Role.findByIdAndUpdate(
      id,
      { name, permissions: permissionIds },
      { new: true } // Return the updated document
    ).populate("permissions");

    return new Response(JSON.stringify({ role }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update role" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    let reqBody = await request.json();
    const { id } = reqBody;

    await Role.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Role deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete role" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
