import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PAGENATION_RANGE } from "../constant/pagenation";

// Pagenation은 전체 글 갯수를 알지 못하므로 알려줘야 함
interface PagenationProps {
  totalPage: number;
}

const Pagenation = ({ totalPage }: PagenationProps) => {
  const { query } = useRouter();
  const currentPage = Number(query.page) || 1;

  return (
    <div>
      <ul className="flex flex-row gap-2">
        <li>
          <PagenationItem to={currentPage - 1} value="&lt;" disabled={currentPage === 1} />
        </li>

        {Array.from(
          { length: PAGENATION_RANGE },
          (_, i) => currentPage - PAGENATION_RANGE + i + 2
        ).map((page) =>
          page > 0 && page <= totalPage ? (
            <PagenationItem
              key={page}
              to={page}
              value={page}
              active={page === currentPage}
            />
          ) : null
        )}
        <li>
          <PagenationItem to={currentPage + 1} value="&gt;" disabled={currentPage === totalPage} />
        </li>
      </ul>
    </div>
  );
};

export default Pagenation;

interface PagenationItemProps {
  to: number;
  value: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

// 페이지를 쿼리로 이동시키지 않고 빌드타임에 만들어진 페이지로 이동시킴
const PagenationItem = ({ to, value, disabled = false, active = false }: PagenationItemProps) => {
  const { pathname, query } = useRouter();
  const pagenationRoute = "/page/[page]";

  const extendedPathname =
    pathname.indexOf(pagenationRoute) === -1
      ? `${pathname.replace(/\$/, "")}${pagenationRoute}`
      : pathname;


  return (
    <Link
      href={{
        pathname: extendedPathname,
        query: {
          ...query,
          page: to,
        },
      }}
    >
      <button
        className={`px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed ${
          active ? "bg-gray-100 text-black" : ""
        }`}
        disabled={disabled}
      >
        {value}
      </button>
    </Link>
  );
}