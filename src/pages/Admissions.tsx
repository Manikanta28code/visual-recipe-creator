import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, CreditCard, CheckCircle, Clock, Users } from "lucide-react";

const Admissions = () => {
  const admissionSteps = [
    {
      step: 1,
      title: "Application Form",
      description: "Fill out the online application form with required details",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Submit all required documents and certificates",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      step: 3,
      title: "Entrance Test",
      description: "Appear for the entrance examination (for applicable grades)",
      icon: Clock,
      color: "bg-orange-500"
    },
    {
      step: 4,
      title: "Interview Process",
      description: "Parent-student interview with the admission committee",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      step: 5,
      title: "Fee Payment",
      description: "Complete the admission process with fee payment",
      icon: CreditCard,
      color: "bg-red-500"
    }
  ];

  const importantDates = [
    { event: "Application Form Release", date: "December 1, 2024" },
    { event: "Last Date for Application", date: "February 28, 2025" },
    { event: "Entrance Test", date: "March 15-20, 2025" },
    { event: "Results Declaration", date: "March 25, 2025" },
    { event: "Admission Confirmation", date: "April 10, 2025" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Admissions 2024-25</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Join our community of learners and embark on a journey of academic excellence 
            and personal growth
          </p>
          <div className="mt-8">
            <Button variant="accent" size="lg" className="mr-4">
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-background hover:text-primary">
              Download Prospectus
            </Button>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Admission Process</h2>
            <p className="text-xl text-muted-foreground">Simple steps to secure your child's future</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {admissionSteps.map((step, index) => (
              <Card key={step.step} className="text-center hover:shadow-elegant transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    Step {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Important Dates</h2>
              <p className="text-xl text-muted-foreground">Mark your calendar for these key admission dates</p>
            </div>

            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {importantDates.map((item, index) => (
                    <div key={item.event} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span className="text-lg font-medium">{item.event}</span>
                      </div>
                      <span className="text-lg font-bold text-accent">{item.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admissions;