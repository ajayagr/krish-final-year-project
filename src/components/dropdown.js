import { Link } from "react-router-dom";

export default function DropDown() {
  return (
    <div className="px-2 z-[1] rounded border border-black mr-8">
      <div className="dropdown inline-block relative">
        <button className="bg-white text-current py-1 px-2 rounded inline-flex items-center">
          <span className="mr-1">Select team</span>
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
          </svg>
        </button>
        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-[2]">
          <li className="">
            <Link
              className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              to="#"
            >
              LIVE
            </Link>
          </li>
          <li className="">
            <Link
              className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              to="#"
            >
              DRAFT
            </Link>
          </li>
          <li className="">
            <Link
              className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              to="#"
            >
              ARCHIVED
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
