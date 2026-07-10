import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // console.log("Sid: ", request.cookies.get('sid'));
  // const sid = request.cookies.get('sid');
  // if(sid && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === "/register")){
  //     return Response.redirect(new URL("/", request.nextUrl.origin).toString());
  // }
  // else if(!sid && (request.nextUrl.pathname == "/")){
  //     return Response.redirect(new URL("/login", request.nextUrl.origin).toString());
  // }
}

// export const config = {
//   matcher: ["/", "/login", "/register"],
// };
