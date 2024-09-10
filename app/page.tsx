"use client";

import React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const featuredCourses = [
    { id: 1, title: "AI for programming", instructor: "John Doe", overview: "Introduction to AI for programming" },
    { id: 2, title: "AI for writing", instructor: "Jane Smith", overview: "Introduction to AI for writing" },
    { id: 3, title: "AI for oral tasks", instructor: "Mike Johnson", overview: "Introduction to AI for oral tasks" },
    { id: 4, title: "Ethics in use of GenAI", instructor: "Emily Brown", overview: "Ethical AI use is essential to align technology with human values and ensure fairness." },
  ];

  const handleLearnNowClick = (courseId: number) => {
    router.push(`/course?id=${courseId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">LearnOnline</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Courses</Button>
            <Button variant="ghost">Instructors</Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero py-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Expand Your Knowledge</h2>
          <p className="text-xl mb-8">Learn from expert instructors in various fields</p>
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 mr-2"
            />
            <Button><Search className="mr-2" />Search</Button>
          </div>
        </section>

        <section className="featured-courses py-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{course.overview}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span></span>
                  <Button onClick={() => handleLearnNowClick(course.id)}>Learn Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 text-center">
        <p>&copy; 2024 LearnOnline. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;