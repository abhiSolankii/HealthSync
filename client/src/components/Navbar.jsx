import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const location = useLocation();

  return (
    <div>
      {/* for small screen  */}
      <div className="md:hidden relative p-4 flex justify-between items-center">
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 hover:z-10">
          <Link
            to="/"
            className="text-center rounded-md px-4 py-1 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 font-semibold text-slate-800 font-serif text-xl "
          >
            HealthSync
          </Link>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button variant="outline" className="absolute right-2 top-3 ">
              Open
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Hello User!</SheetTitle>
              <SheetDescription>Health is wealth.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" as={"div"}>
                <SheetClose className="w-full">
                  <Button
                    size="sm"
                    className={
                      location.pathname === "/"
                        ? "bg-black w-full"
                        : "bg-slate-500 w-full"
                    }
                  >
                    Home
                  </Button>
                </SheetClose>
              </Link>
              <Link to="/dashboard" as={"div"}>
                <SheetClose className="w-full">
                  <Button
                    size="sm"
                    className={
                      location.pathname === "/dashboard?tab=profile"
                        ? "bg-black w-full"
                        : "bg-slate-500 w-full"
                    }
                  >
                    Dashboard
                  </Button>
                </SheetClose>
              </Link>
              <Link to="/about" as={"div"}>
                <SheetClose className="w-full">
                  <Button
                    size="sm"
                    className={
                      location.pathname === "/about"
                        ? "bg-black w-full"
                        : "bg-slate-500 w-full"
                    }
                  >
                    AboutUs
                  </Button>
                </SheetClose>
              </Link>
              <Link to="/contact" as={"div"}>
                <SheetClose className="w-full">
                  <Button
                    size="sm"
                    className={
                      location.pathname === "/contact"
                        ? "bg-black w-full"
                        : "bg-slate-500 w-full"
                    }
                  >
                    Contact
                  </Button>
                </SheetClose>
              </Link>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                {/* dynamic sign in button  */}
                <div>
                  {currentUser ? (
                    <div>
                      <div className="flex justify-center items-center text-center">
                        <Button
                          variant="outline"
                          className="flex flex-row justify-center gap-2 w-full my-4"
                          onClick={() => {
                            navigate("/dashboard?tab=profile");
                          }}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={currentUser.profilePicture}
                              alt="pfp"
                              className=""
                            />
                            <AvatarFallback>...</AvatarFallback>
                          </Avatar>
                          <span className="font-serif">Profile</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Link to="/signin">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full my-4"
                      >
                        SignIn
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {/* for bigger screens  */}
      <div className="hidden font-serif p-4 bg-slate-100 items-center lg:flex lg:flex-row lg:justify-between">
        <div className="transition ease-in-out delay-150  duration-300 hover:z-10">
          <Link
            as={"div"}
            to="/"
            className="text-center rounded-md px-4 py-1 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 font-semibold text-slate-800 font-serif text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-purple-400 hover:via-blue-300 hover:to-pink-400 duration-300"
          >
            HealthSync
          </Link>
        </div>
        <div>
          <ul className="lg:flex lg:flex-row gap-10">
            <li>
              <Link to={"/"}>
                <Button
                  className={
                    location.pathname === "/" ? "bg-black" : "bg-slate-500"
                  }
                >
                  Home
                </Button>
              </Link>
            </li>
            <Link to={"/dashboard?tab=profile"}>
              <Button
                className={
                  location.pathname === "/dashboard"
                    ? "bg-black"
                    : "bg-slate-500"
                }
              >
                Dashboard
              </Button>
            </Link>

            <Link to={"/about"}>
              <Button
                className={
                  location.pathname === "/about" ? "bg-black" : "bg-slate-500"
                }
              >
                AboutUs
              </Button>
            </Link>

            <Link to={"/contact"}>
              <Button
                className={
                  location.pathname === "/contact" ? "bg-black" : "bg-slate-500"
                }
              >
                Contact
              </Button>
            </Link>
          </ul>
        </div>
        {/* dynamic sign in button  */}
        <div>
          {currentUser ? (
            <div>
              <div className="flex justify-center items-center text-center">
                <Button
                  variant="outline"
                  className="flex flex-row justify-center gap-2 w-full"
                  onClick={() => {
                    navigate("/dashboard?tab=profile");
                  }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={currentUser.profilePicture}
                      alt="pfp"
                      className=""
                    />
                    <AvatarFallback>...</AvatarFallback>
                  </Avatar>
                  <span className="font-serif">Profile</span>
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/signin">
              <Button size="sm" variant="outline" className="w-full">
                SignIn
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
