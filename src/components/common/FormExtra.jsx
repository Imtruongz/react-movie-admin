import { Link } from "react-router-dom";

export default function FormExtra({ linkUrl, linkName }) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 bg-gray-700 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-400"
        >
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <Link
          to={linkUrl}
          className="font-medium text-white hover:text-gray-500"
        >
          {linkName}
        </Link>
      </div>
    </div>
  );
}
