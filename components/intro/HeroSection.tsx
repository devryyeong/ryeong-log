import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section>
      <div className="flex flex-col md:items-start gap-8 py-16 w-4/5 max-w-5xl mx-auto text-center md:text-left">
        <div className="relative">
          <span className="absolute w-6 h-6 left-1/2 -bottom-3 -translate-x-1/2 bg-black rotate-45"/>
          <span className="font-bold text-white bg-black py-3 px-4 rounded-lg relative">HELLO</span>
        </div>
        <h2 className="font-black text-6xl leading-[1.2] break-keep">
          안녕하세요!
        </h2>
        <p className="font-light text-xl text-gray-400 break-keep md:max-w-xl">
          Cupidatat dolor consequat minim mollit labore. Veniam Lorem velit anim
          Lorem culpa velit cupidatat sunt. Duis elit magna incididunt fugiat
          nisi est esse minim ea magna amet ipsum. Labore sit duis anim
          incididunt nostrud nisi tempor et esse mollit sunt.
        </p>
        <div>
          <Link href={"/about"}>
            <button className="px-4 py-2 border rounded-3xl border-black font-semibold hover:bg-black hover:text-white">
              {" "}
              About Me
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection