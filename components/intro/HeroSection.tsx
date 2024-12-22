import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section>
      <div className="flex flex-col md:items-start gap-8 py-16 w-4/5 max-w-5xl mx-auto text-center md:text-left">
        <div className="relative">
          <span className="absolute w-6 h-6 left-1/2 -bottom-3 -translate-x-1/2 bg-black rotate-45" />
          <span className="font-bold text-white bg-black py-3 px-4 rounded-lg relative">
            HELLO
          </span>
        </div>
        <h2 className="font-black text-6xl leading-[1.2] break-keep">
          안녕하세요!
        </h2>
        <p className="font-light text-xl text-gray-600 break-keep md:max-w-xl">
          React, Vue, Typescript를 사용하는 프론트엔드 개발자입니다.
          <br />
          여러 직군들의 중간다리 역할을 하는 프론트엔드 개발자로서, 함께
          프로덕트를 만들어갈 동료들의 직무에 대한 기본적인 이해를 통해 서로의
          견해를 이해하고 기술적으로 배려하며 원활하게 의견을 나누고자 합니다.
          <br />
          UX와 DX를 모두 고려하는 설계를 하려 노력합니다.
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
};

export default HeroSection;
