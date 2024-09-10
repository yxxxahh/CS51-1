"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Play, FileText, Image, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from 'next/navigation';
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({ subsets: ['latin'] });

interface Section {
    type: string;
    content: string;
    title: string;
}

interface Course {
    id: number;
    title: string;
    sections: Section[];
}

const courses: Course[] = [
    {
        id: 1,
        title: "AI for programming",
        sections: [
            { title: "Overview of AI in programming", type: "video", content: "https://www.youtube.com/embed/U9mJuUkhUzk" },
            { title: "Task break up and critical thinking", type: "text", content: "React Hooks are powerful functions that allow you to 'hook into' React state and lifecycle features from function components. They provide a more concise and intuitive way to manage component state and side effects, making code easier to understand and maintain. This section will delve into commonly used Hooks such as useState, useEffect, useContext, and explore how to create custom Hooks for logic reuse. We'll also cover advanced patterns like useReducer for complex state management, useMemo and useCallback for performance optimization, and useRef for accessing DOM elements directly. By the end of this section, you'll have a comprehensive understanding of how to leverage Hooks to write more efficient and maintainable React code." },
            { title: "GenAI for coding and debugging", type: "image", content: "https://picsum.photos/800/600" },
            { title: "AI assissting tools and plugin", type: "video", content: "https://www.youtube.com/embed/CEI4e2SQnzo" }
        ]
    },
    {
        id: 2,
        title: "AI for writing",
        sections: [
            { title: "Overview for AI in academic writing", type: "video", content: "https://www.youtube.com/embed/U9mJuUkhUzk" },
            { title: "Context understanding and critical thinking", type: "text", content: "React Hooks are powerful functions that allow you to 'hook into' React state and lifecycle features from function components. They provide a more concise and intuitive way to manage component state and side effects, making code easier to understand and maintain. This section will delve into commonly used Hooks such as useState, useEffect, useContext, and explore how to create custom Hooks for logic reuse. We'll also cover advanced patterns like useReducer for complex state management, useMemo and useCallback for performance optimization, and useRef for accessing DOM elements directly. By the end of this section, you'll have a comprehensive understanding of how to leverage Hooks to write more efficient and maintainable React code." },
            { title: "Paragraph refinings with AI", type: "image", content: "https://picsum.photos/800/600" },
            { title: "AI writing assisting tools and plugins", type: "video", content: "https://www.youtube.com/embed/CEI4e2SQnzo" }
        ]
    },
    {
        id: 3,
        title: "AI for oral tasks",
        sections: [
            { title: "Overview of AI in oral assessments", type: "video", content: "https://www.youtube.com/embed/U9mJuUkhUzk" },
            { title: "Train your personal AI interviewer", type: "text", content: "React Hooks are powerful functions that allow you to 'hook into' React state and lifecycle features from function components. They provide a more concise and intuitive way to manage component state and side effects, making code easier to understand and maintain. This section will delve into commonly used Hooks such as useState, useEffect, useContext, and explore how to create custom Hooks for logic reuse. We'll also cover advanced patterns like useReducer for complex state management, useMemo and useCallback for performance optimization, and useRef for accessing DOM elements directly. By the end of this section, you'll have a comprehensive understanding of how to leverage Hooks to write more efficient and maintainable React code." }
        ]
    },
    {
        id: 4,
        title: "Ethics in use of GenAI",
        sections: [
            { title: "Overview", type: "text", content: "In this comprehensive section, we'll cover the entire process of building and deploying Next.js applications. We'll start by exploring how to optimize application performance through code splitting, lazy loading, and image optimization techniques. You'll learn how to configure environment variables for different deployment environments and handle static assets efficiently. We'll dive deep into various deployment platforms such as Vercel, Netlify, and self-hosted servers, discussing the pros and cons of each option. Additionally, we'll explore advanced deployment strategies like blue-green deployments and canary releases. The section will also cover continuous integration and continuous deployment (CI/CD) strategies, including setting up automated testing, linting, and build processes. You'll learn how to integrate these processes with popular version control platforms and how to set up monitoring and error tracking for your deployed applications. By the end of this section, you'll have a robust understanding of how to deliver high-quality Next.js applications quickly and reliably to end-users, as well as how to maintain and scale them effectively in production environments." }
        ]
    }
];

const CourseLearningInterface = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [course, setCourse] = useState<Course | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const courseId = searchParams.get('id');
    if (courseId) {
      const selectedCourse = courses.find(c => c.id === parseInt(courseId));
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }
  }, [searchParams]);

  const renderContent = (section: Section) => {
    switch(section.type) {
      case 'video':
        return (
          <div className="w-full h-0 pb-[56.25%] relative">
            <iframe 
              src={section.content} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        );
      case 'image':
        return (
          <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center">
            <img src={section.content} alt={section.title} className="max-w-full max-h-full object-contain" />
          </div>
        );
      case 'text':
      default:
        return (
          <ScrollArea className="h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <div className={`p-4 ${firaCode.className}`}>
              <p className="text-lg">{section.content}</p>
            </div>
          </ScrollArea>
        );
    }
  };

  const getSectionIcon = (type: string) => {
    switch(type) {
      case 'text':
        return <FileText className="mr-2 h-4 w-4" />;
      case 'image':
        return <Image className="mr-2 h-4 w-4" />;
      default:
        return <Play className="mr-2 h-4 w-4" />;
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-2 flex flex-col gap-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.push('/')} >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        <h1 className="text-2xl font-bold">{course.title}</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-grow md:w-3/4">
          <CardHeader>
            <CardTitle>{course.sections[currentSection].title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {renderContent(course.sections[currentSection])}
          </CardContent>
        </Card>

        <Card className="flex-grow md:w-1/4">
          <CardHeader>
            <CardTitle>Course Sections</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-full">
              {course.sections.map((section, index) => (
                <Button
                  key={index}
                  variant={currentSection === index ? "default" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="flex items-center">
                    {getSectionIcon(section.type)}
                    <span className="text-left">{section.title}</span>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CourseLearningInterfaceWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CourseLearningInterface />
  </Suspense>
);

export default CourseLearningInterfaceWrapper;