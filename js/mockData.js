/* ==========================================================================
   EduPulse CMS - Mock Initial Dataset
   ========================================================================== */

const INITIAL_COURSES = [
  {
    id: "course-101",
    title: "Master Full-Stack Web Development with React & Node",
    category: "Web Development",
    level: "Intermediate",
    price: 49.99,
    rating: 4.9,
    ratingCount: 342,
    studentsCount: 1820,
    duration: "24 Hours",
    instructor: "Dr. Sarah Jenkins",
    instructorRole: "Senior Software Architect @ TechCorp",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    overview: "Become a proficient full-stack web developer by building real-world web applications. Master modern HTML5, CSS Grid, Flexbox, React 18, Node.js, Express, and REST APIs with production-ready best practices.",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Foundations of Modern Frontend Development",
        lessons: [
          {
            id: "les-101",
            title: "Introduction to Modern Web Architecture",
            type: "video",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/embed/gT0LhBwIgDw",
            content: "In this lesson, we explore how modern web browsers render HTML/CSS and execute JavaScript, HTTP request pipelines, client-side vs server-side rendering, and SPA fundamentals."
          },
          {
            id: "les-102",
            title: "Semantic HTML5 & Accessible Component Layouts",
            type: "text",
            duration: "20 min",
            content: "Semantic HTML elements like <header>, <main>, <article>, <section>, and <dialog> improve accessibility (a11y) and SEO. Always structure web pages cleanly before adding CSS utility layers."
          },
          {
            id: "les-103",
            title: "Mastering CSS Grid & Dynamic Responsive Layouts",
            type: "video",
            duration: "25 min",
            videoUrl: "https://www.youtube.com/embed/rg7Fvvl3taU",
            content: "Deep dive into CSS Grid template areas, auto-fit, minmax(), custom properties, and modern media queries."
          }
        ],
        quiz: {
          id: "quiz-1",
          title: "Module 1 Quiz: Web Architecture & Semantic HTML",
          passingScore: 70,
          questions: [
            {
              id: "q1",
              question: "Which HTML5 element should be used for modal dialogs and overlays?",
              options: ["<div class='modal'>", "<dialog>", "<overlay>", "<popup>"],
              correctIndex: 1,
              explanation: "<dialog> is the official native HTML5 element for accessible modal dialogs and popovers."
            },
            {
              id: "q2",
              question: "What does CSS grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) do?",
              options: [
                "Creates exactly 3 columns of 300px width.",
                "Automatically fits as many 300px+ columns as possible into the container width.",
                "Sets all elements to 1fr height.",
                "Centers elements vertically."
              ],
              correctIndex: 1,
              explanation: "auto-fill with minmax() creates a responsive grid layout without requiring rigid breakpoints."
            }
          ]
        }
      },
      {
        id: "mod-2",
        title: "Module 2: React 18 & State Management",
        lessons: [
          {
            id: "les-201",
            title: "React Components, Props & Hooks Overview",
            type: "video",
            duration: "30 min",
            videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
            content: "Learn how JSX transforms into virtual DOM trees, component lifecycle using useState, useEffect, and custom hooks."
          },
          {
            id: "les-202",
            title: "Managing Global Application State",
            type: "text",
            duration: "22 min",
            content: "Explore Context API, Redux Toolkit, and local storage state persistence patterns for scalable React apps."
          }
        ],
        quiz: {
          id: "quiz-2",
          title: "Module 2 Quiz: React Hooks & State Control",
          passingScore: 70,
          questions: [
            {
              id: "q201",
              question: "When does the useEffect hook run if an empty dependency array [] is provided?",
              options: [
                "On every re-render",
                "Only once when the component mounts",
                "Whenever state changes",
                "Never"
              ],
              correctIndex: 1,
              explanation: "An empty dependency array [] tells React to run the effect callback only once after initial mount."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-102",
    title: "Applied Data Science & Machine Learning with Python",
    category: "Data Science & AI",
    level: "Advanced",
    price: 69.99,
    rating: 4.8,
    ratingCount: 215,
    studentsCount: 1240,
    duration: "32 Hours",
    instructor: "Prof. Marcus Vance",
    instructorRole: "AI Lead & Principal Researcher",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    overview: "Master data analytics, Pandas dataframes, NumPy vectorization, data visualization with Matplotlib, Scikit-learn classification models, neural networks, and BigQuery ML integration.",
    modules: [
      {
        id: "mod-ds1",
        title: "Module 1: Exploratory Data Analysis & Pandas",
        lessons: [
          {
            id: "les-ds101",
            title: "Data Manipulation with Pandas & NumPy",
            type: "video",
            duration: "35 min",
            videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
            content: "Learn data cleansing, handling missing values, groupby aggregations, and vectorized mathematical operations."
          }
        ],
        quiz: {
          id: "quiz-ds1",
          title: "Module 1 Quiz: Pandas & Data Cleaning",
          passingScore: 70,
          questions: [
            {
              id: "qds1",
              question: "Which Pandas function is best used to fill missing NaN values in a dataset?",
              options: ["df.dropna()", "df.fillna()", "df.replace()", "df.clean()"],
              correctIndex: 1,
              explanation: "df.fillna() allows replacing missing NaN values with specified values, mean, or median."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-103",
    title: "UI/UX Design Systems & Figma Prototyping",
    category: "UI/UX Design",
    level: "Beginner",
    price: 39.99,
    rating: 4.95,
    ratingCount: 512,
    studentsCount: 2410,
    duration: "18 Hours",
    instructor: "Elena Rostova",
    instructorRole: "Design Director @ CreativeLab",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
    overview: "Design intuitive, visually stunning web and mobile interfaces. Learn design tokens, typography scales, glassmorphism, micro-interactions, accessibility guidelines, and interactive Figma wireframing.",
    modules: [
      {
        id: "mod-ux1",
        title: "Module 1: Design Principles & Typography",
        lessons: [
          {
            id: "les-ux101",
            title: "Visual Hierarchy, Alignment & Spacing Rules",
            type: "text",
            duration: "25 min",
            content: "Understand contrast ratios, 8pt spatial grids, visual hierarchy, and modern glassmorphism UI styling."
          }
        ],
        quiz: {
          id: "quiz-ux1",
          title: "Module 1 Quiz: UI Design Rules",
          passingScore: 70,
          questions: [
            {
              id: "qux1",
              question: "What is the recommended minimum contrast ratio for normal text under WCAG AA standards?",
              options: ["2:1", "3:1", "4.5:1", "7:1"],
              correctIndex: 2,
              explanation: "WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-104",
    title: "Cloud DevOps Architecture & Kubernetes Orchestration",
    category: "Cloud & DevOps",
    level: "Advanced",
    price: 79.99,
    rating: 4.85,
    ratingCount: 189,
    studentsCount: 980,
    duration: "28 Hours",
    instructor: "David Miller",
    instructorRole: "Principal Cloud Engineer",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    overview: "Automate cloud infrastructure deployments using Terraform, Docker containers, Kubernetes cluster management, CI/CD pipelines, and monitoring tools.",
    modules: [
      {
        id: "mod-dev1",
        title: "Module 1: Containerization with Docker",
        lessons: [
          {
            id: "les-dev101",
            title: "Building Multi-Stage Dockerfiles",
            type: "video",
            duration: "30 min",
            videoUrl: "https://www.youtube.com/embed/gAkwW2tuIqE",
            content: "Learn Docker image optimization, layer caching, multi-stage builds, and container security."
          }
        ],
        quiz: {
          id: "quiz-dev1",
          title: "Module 1 Quiz: Docker Fundamentals",
          passingScore: 70,
          questions: [
            {
              id: "qdev1",
              question: "What is the primary benefit of multi-stage Docker builds?",
              options: [
                "Faster internet connection",
                "Significantly smaller final image size by excluding build dependencies",
                "Running multiple OS containers at once",
                "Automatic database backups"
              ],
              correctIndex: 1,
              explanation: "Multi-stage builds allow copying only compiled artifacts into a lean runtime image, minimizing footprint."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-105",
    title: "Cyber Security Fundamentals & Ethical Hacking",
    category: "Cyber Security",
    level: "Intermediate",
    price: 59.99,
    rating: 4.9,
    ratingCount: 298,
    studentsCount: 1450,
    duration: "22 Hours",
    instructor: "Alex Thorne",
    instructorRole: "Certified Ethical Hacker (CEH)",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    overview: "Understand modern network security, vulnerability scanning, penetration testing techniques, OWASP Top 10 web security flaws, encryption algorithms, and incident response.",
    modules: [
      {
        id: "mod-sec1",
        title: "Module 1: OWASP Top 10 Web Vulnerabilities",
        lessons: [
          {
            id: "les-sec101",
            title: "Preventing SQL Injection & XSS Attacks",
            type: "text",
            duration: "25 min",
            content: "Detailed analysis of SQL parameterization, Content Security Policy (CSP) headers, and input sanitization."
          }
        ],
        quiz: {
          id: "quiz-sec1",
          title: "Module 1 Quiz: Web Application Security",
          passingScore: 70,
          questions: [
            {
              id: "qsec1",
              question: "Which practice effectively prevents SQL Injection vulnerabilities?",
              options: [
                "Client-side JavaScript validation",
                "Using Parameterized Queries / Prepared Statements",
                "Encoding output as HTML",
                "Disabling database indexes"
              ],
              correctIndex: 1,
              explanation: "Parameterized queries ensure database engines treat inputs as data parameters rather than executable SQL commands."
            }
          ]
        }
      }
    ]
  }
];

const INITIAL_STUDENTS_ROSTER = [
  {
    id: "std-1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    enrolledCourses: [
      {
        courseId: "course-101",
        enrolledDate: "2026-08-10",
        completedLessonIds: ["les-101", "les-102"],
        progressPercentage: 50,
        quizScores: { "quiz-1": 100 },
        certificateId: null
      },
      {
        courseId: "course-103",
        enrolledDate: "2026-08-15",
        completedLessonIds: ["les-ux101"],
        progressPercentage: 100,
        quizScores: { "quiz-ux1": 100 },
        certificateId: "CERT-EDUPULSE-2026-89412"
      }
    ]
  },
  {
    id: "std-2",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    enrolledCourses: [
      {
        courseId: "course-102",
        enrolledDate: "2026-09-01",
        completedLessonIds: ["les-ds101"],
        progressPercentage: 100,
        quizScores: { "quiz-ds1": 100 },
        certificateId: "CERT-EDUPULSE-2026-73190"
      }
    ]
  }
];
