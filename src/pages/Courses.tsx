import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      grade: "Pre-Primary (Nursery - UKG)",
      description: "Foundation years focusing on play-based learning and basic skills development",
      subjects: ["English", "Mathematics", "EVS", "Art & Craft", "Physical Education"],
      icon: "🌱",
      color: "bg-green-100 text-green-800"
    },
    {
      grade: "Primary (Classes I - V)",
      description: "Building fundamental academic skills with interactive learning methods",
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Computer Science"],
      icon: "📚",
      color: "bg-blue-100 text-blue-800"
    },
    {
      grade: "Middle School (Classes VI - VIII)",
      description: "Comprehensive curriculum with emphasis on critical thinking and creativity",
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit", "Computer Science"],
      icon: "🔬",
      color: "bg-purple-100 text-purple-800"
    },
    {
      grade: "Secondary (Classes IX - X)",
      description: "CBSE curriculum preparing students for board examinations",
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Optional Subjects"],
      icon: "🎓",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Academic Programs</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive education from foundation to secondary level, designed to nurture 
            academic excellence and holistic development
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <Card key={course.grade} className="hover:shadow-elegant transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div>
                      <CardTitle className="text-2xl text-primary">{course.grade}</CardTitle>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${course.color}`}>
                        Academic Program
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-foreground">Subjects Offered:</h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {course.subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm">{subject}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;