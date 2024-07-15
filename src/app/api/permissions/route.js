import ConnectToMongoDb from "@/connect";
import Permission from "@/models/Permission";

ConnectToMongoDb();

export async function GET(request) {
  // GET requests usually don't have a body, so this might not be necessary
  // If you expect query parameters, you can access them using request.nextUrl.searchParams
  // For example: const name = request.nextUrl.searchParams.get('name');
  let permission = await Permission.find({});
  return new Response(JSON.stringify({ permission }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  try {
    let reqBody = await request.json();
    const { name } = reqBody;
    console.log('name',name)

    let permission = new Permission({ name });
    await permission.save();

    return new Response(JSON.stringify({ permission }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create permission' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    let reqBody = await request.json();
    const { name, id } = reqBody;

    let permission = await Permission.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true } // Return the updated document
    );

    return new Response(JSON.stringify({ permission }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update permission' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    let reqBody = await request.json();
    const { id } = reqBody;

    await Permission.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Permission deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete permission' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
