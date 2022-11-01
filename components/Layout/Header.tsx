import Image from "next/image";
import Link from "next/link";
import pallozzIcon from "./icon-96x96.png";

export default function Header() {
  return (
    <header className="bg-teal-500 text-white p-2 flex flex-col lg:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <div className="flex">
            <Image
              src={pallozzIcon}
              width={48}
              height={48}
              alt="Pallozzi estimate icon"
            />
            <h1 className="ml-2 text-4xl font-serif font-semibold">
              Pallozzi Estimate
            </h1>
          </div>
        </a>
      </Link>
      <div>
      <ul className="flex flex-wrap items-center mb-6 text-sm text-white-500 sm:mb-0 dark:text-gray-400 mx-4">
          <li>
            <Link href="/about">
              <a className="mr-4 hover:underline md:mr-6 ">About</a>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/spyna/pallozzi-estimate"
              className="mr-4 hover:underline md:mr-6 "
            >
              Source code
            </a>
          </li>
          <li>
            <a href="https://spyna.it#contacts" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
