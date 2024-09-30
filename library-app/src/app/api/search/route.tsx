import { NextResponse } from "next/server";

const NINJA_SEARCH_RESULTS = "http://127.0.0.1:8000/api/books/search/";
export async function GET(
  request: Request,
  res: Response
) {
  // get use authentication token which is the access token of the bearer
    const query_string = request.url.substring(request.url.indexOf("=") + 1)
    
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  const response = await fetch(NINJA_SEARCH_RESULTS + query_string, options);
  const search_results = await response.json();
  console.log("start");
  console.log(search_results);
  if (response.ok) {
    return NextResponse.json({ content: search_results }, { status: 200 });
  } else {
      console.log("Inside Here")
    return NextResponse.json(
      { message: search_results },
      { status: 500 }
    );
  }
}
