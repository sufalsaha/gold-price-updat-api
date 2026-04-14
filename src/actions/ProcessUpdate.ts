"use server";


import { updateProductPrice } from "@/app/api/gold/route";


export async function ProcessUpdate() {
    const token = process.env.X_SHOPIFY_ACCESS_TOKEN;

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9,bn;q=0.8");
  myHeaders.append("if-none-match", 'W/"fc-fwAZN9/KoGUH/nXNiNzdR2KGf64"');
  myHeaders.append("origin", "https://goldprice.org");
  myHeaders.append("priority", "u=1, i");
  myHeaders.append("referer", "https://goldprice.org/");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"Windows"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-site");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
  );
  myHeaders.append(
    "Cookie",
    "lagrange_session=91d9345c-97b8-4f02-853e-45a125acbe46; wcid=D4ho530p7/87AAAE",
  );

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    "https://data-asg.goldprice.org/dbXRates/AED",
    requestOptions,
  );
  const data = await res.json();
  // console.log(data.items[0].xauPrice);

  const goldPrice = data.items[0].xauPrice;

  const goldPriceOneGram = goldPrice / 31.1035;

  console.log("oneEremGOld", goldPriceOneGram);

  const productsHeaders = new Headers();
  productsHeaders.append("X-Shopify-Access-Token", token as string);

  const products = await fetch(
    "https://di0we0-yd.myshopify.com/admin/api/2024-01/products.json?limit=250",
    {
      headers: productsHeaders,
    },
  );
  const productsdata = await products.json();

  const goldProducts = (productsdata?.products || []).filter((p: any) => {
    return p.product_type === "Gold";
  });

  // console.log(goldProducts);

  const goldProductAndVarientIds = goldProducts.map((p: any) => ({
    productId: p.id,
    variantId: p.variants[0].id,
  }));

  // console.log(productsdata);
  for (const id of goldProductAndVarientIds) {
    await updateProductPrice(id, goldPriceOneGram);
  }

  // updateProductPrice(9252590158057, 188888);

  console.log(goldProductAndVarientIds);

//   return Response.json({ success: true });
}