import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <h2 className=" text-center text-2xl font-extrabold text-white">
        {heading}
      </h2>
      <p className=" text-center text-sm text-gray-400 mt-4">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-red-600 hover:text-red-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
