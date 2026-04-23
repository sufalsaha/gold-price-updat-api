import { ProductPriceManeFunction } from "@/app/apiFunction/apiFunction";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
await ProductPriceManeFunction()

return Response.json({ success: true });
}






export async function POST() {
  await ProductPriceManeFunction()
  
  return Response.json({ success: true });
}
