export interface Opportunity {
  id: number;
  title: string;
  company: string;
  location: string;
  oppType: 'Job' | 'Internship' | 'Scholarship' | 'Tender' | 'Consultancy';
  workType: 'Full Time' | 'Part Time' | 'Contract' | 'Remote' | 'Hybrid';
  industry: string;
  salary: string;
  posted: string;
  deadline: string;
  isFeatured: boolean;
  tags: string[];
  logo: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  aboutCompany: string;
}

export const JOB_DATA: Opportunity[] = [
  {
    id: 1,
    title: "Senior Human Resources Manager",
    company: "TechConnect Rwanda",
    location: "Kigali, Rwanda",
    oppType: "Job",
    workType: "Full Time",
    industry: "Management",
    salary: "2.5M - 3.5M RWF",
    posted: "2 days ago",
    deadline: "2026-02-15",
    isFeatured: true,
    tags: ["Leadership", "Strategy", "Compliance"],
    logo: "TC",
    description: "We are seeking an experienced Senior HR Manager to lead our HR department. You will be responsible for developing HR strategies that support our business goals, fostering a healthy work environment, and overseeing recruitment and compliance.",
    responsibilities: [
      "Develop and implement HR strategies and initiatives aligned with the overall business strategy.",
      "Bridge management and employee relations by addressing demands, grievances, or other issues.",
      "Manage the recruitment and selection process.",
      "Oversee and manage a performance appraisal system that drives high performance.",
      "Maintain pay plan and benefits program."
    ],
    requirements: [
      "Master's Degree in Human Resources or related field.",
      "5+ years of experience in a senior HR role.",
      "Strong knowledge of Rwandan labor laws and regulations.",
      "Excellent communication and interpersonal skills.",
      "Professional certification (e.g., PHR, SPHR) is a plus."
    ],
    benefits: [
      "Comprehensive Health Insurance (RSSB + Private)",
      "Transport Allowance",
      "Professional Development Budget",
      "Annual Performance Bonus"
    ],
    aboutCompany: "TechConnect Rwanda is a leading technology solutions provider committed to digitizing public and private sector operations across East Africa."
  },
  {
    id: 2,
    title: "Frontend Developer (React)",
    company: "Kigali Innovation City",
    location: "Remote",
    oppType: "Job",
    workType: "Contract",
    industry: "Information Technology",
    salary: "1.8M - 2.5M RWF",
    posted: "5 hours ago",
    deadline: "2026-03-01",
    isFeatured: false,
    tags: ["React", "TypeScript", "Tailwind"],
    logo: "KI",
    description: "We are looking for a talented Frontend Developer to build modern web applications. You will work closely with our design and backend teams to deliver high-quality user experiences.",
    responsibilities: [
        "Develop new user-facing features using React.js.",
        "Build reusable components and front-end libraries for future use.",
        "Translate designs and wireframes into high-quality code.",
        "Optimize components for maximum performance across a vast array of web-capable devices and browsers."
    ],
    requirements: [
        "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.",
        "Thorough understanding of React.js and its core principles.",
        "Experience with popular React.js workflows (such as Flux or Redux).",
        "Familiarity with newer specifications of EcmaScript."
    ],
    benefits: [
        "Flexible working hours",
        "Remote work setup",
        "Internet allowance"
    ],
    aboutCompany: "Kigali Innovation City is a technology cluster planned for Kigali, Rwanda. It aims to drive the digital transformation of Rwanda."
  },

  {
    id: 3,
    title: "Masters in Data Science Scholarship",
    company: "Carnegie Mellon Africa",
    location: "Kigali, Rwanda",
    oppType: "Scholarship",
    workType: "Full Time",
    industry: "Education",
    salary: "Fully Funded",
    posted: "1 week ago",
    deadline: "2026-04-20",
    isFeatured: true,
    tags: ["Academic", "Stem", "Masters"],
    logo: "CM",
    description: "A fully funded scholarship for exceptional students to pursue a Master's degree in Data Science. This program aims to train the next generation of data leaders in Africa.",
    responsibilities: [
        "Attend all classes and maintain a 3.0 GPA.",
        "Participate in research projects.",
        "Complete a capstone project solving a real-world problem."
    ],
    requirements: [
        "Bachelor's degree in Mathematics, Computer Science, or Engineering.",
        "Strong academic record.",
        "Letter of motivation.",
        "Two letters of recommendation."
    ],
    benefits: [
        "Full Tuition Coverage",
        "Monthly Stipend",
        "Laptop and Study Materials",
        "Accommodation Support"
    ],
    aboutCompany: "Carnegie Mellon University Africa was established in 2011 and is the first U.S. research university offering degrees in Africa."
  },
  
] as Opportunity[]; 