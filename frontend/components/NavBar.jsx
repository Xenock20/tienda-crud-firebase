import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdAppstore } from "react-icons/io";

export default function NavBar() {
    return (
        <nav className="bg-white border-gray-20">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <IoMdAppstore
                        size={"64"}
                        color="rgb(37 99 235)"
                    ></IoMdAppstore>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-600">
                        Tienline C.R.U.D
                    </span>
                </Link>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li className="bg-blue-600 p-3 rounded-full">
                            <FaUser size={"24"} color="white" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
