"use client";

import Image from "next/image";

export default function Home() {


  const handelClick = async () => {
    const res = await fetch("/api", {
      cache: "no-store",
    });
    
    const data = await res.json();
    console.log(data);
  };

  return (
   <button onClick={handelClick}>Click me</button>
  );
}
