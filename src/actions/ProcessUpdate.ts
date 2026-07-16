"use server";

import { ProductPriceManeFunction } from "@/app/apiFunction/apiFunction";

export async function ProcessUpdate() {
  await ProductPriceManeFunction();

}
