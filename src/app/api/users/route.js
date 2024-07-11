
import dbConnect from "@/app/connect/connect";
import User from "@/models/User";

dbConnect();
export async function GET(request) {
  // let reqBody = request.json();
  // const { username } = reqBody;
  // if (username) {
  //   let user = await User.findOne({ username: username });
  //   if (!user) {
  //     return Response.status(404).json({ message: "User not found" });
  //   }
  //   return Response.json({ user });
  // }
  let users = await User.find({});
  return Response.json({ users });
}
