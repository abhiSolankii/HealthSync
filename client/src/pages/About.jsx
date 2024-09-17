import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen text-black">
      <div className="max-w-5xl mx-auto py-16 px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link
            as={"div"}
            to="/"
            className="text-center rounded-md px-4 py-1 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 font-semibold text-slate-800 font-serif text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:from-purple-400 hover:via-blue-300 hover:to-pink-400 duration-300"
          >
            HealthSync
          </Link>
          <h1 className="text-4xl font-bold text-slate-600 mt-4">
            About HealthSync
          </h1>
          <p className="text-slate-500 mt-4">
            Empowering your health journey with real-time tracking and insights.
          </p>
        </div>

        <section className="mb-10">
          <Card className="bg-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-slate-900">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 text-lg">
                At HealthSync, our mission is to empower individuals by
                providing them with easy-to-use health tracking tools that offer
                real-time insights into their wellness. Whether it’s monitoring
                your vitals or keeping track of your fitness progress,
                HealthSync ensures that you have access to accurate and
                actionable data.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-slate-600 text-center mb-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  John Doe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">CEO & Founder</p>
                <p className="text-slate-700 mt-4">
                  John is the visionary behind HealthSync, with a passion for
                  health technology and innovation. His leadership ensures that
                  HealthSync remains at the forefront of health tracking
                  solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Jane Smith
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">Chief Technical Officer</p>
                <p className="text-slate-700 mt-4">
                  Jane is the tech genius of HealthSync, overseeing all
                  technical aspects to ensure that our platform remains robust,
                  scalable, and user-friendly for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Emily White
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">Head of Customer Success</p>
                <p className="text-slate-700 mt-4">
                  Emily ensures that every HealthSync user has the best possible
                  experience, leading our customer support efforts and helping
                  users get the most out of our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="text-center">
          <Button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
            Join Our Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
