import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Link
          as={"div"}
          to="/"
          className="text-center rounded-md px-4 py-1 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 font-semibold text-slate-800 font-serif text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-purple-400 hover:via-blue-300 hover:to-pink-400 duration-300"
        >
          HealthSync
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Get in Touch with Us
        </h1>
        <p className="text-lg text-slate-500">
          Have a question, feedback, or need assistance? Fill out the form
          below, and we{"'"}ll get back to you shortly.
        </p>
      </div>

      <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <Label htmlFor="name" className="text-black font-semibold">
            Your Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full mt-2 p-3 rounded-md border-2 border-slate-300 focus:border-purple-500"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="email" className="text-black font-semibold">
            Your Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full mt-2 p-3 rounded-md border-2 border-slate-300 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="message" className="text-black font-semibold">
            Your Message
          </Label>
          <Textarea
            id="message"
            rows="5"
            placeholder="Tell us how we can help..."
            className="w-full mt-2 p-3 rounded-md border-2 border-slate-300 focus:border-pink-500"
          />
        </div>

        <div className="flex justify-center">
          <Button className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-semibold p-3 rounded-md hover:bg-gradient-to-l">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
