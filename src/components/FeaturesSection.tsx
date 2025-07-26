import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Microscope, 
  Palette, 
  Globe,
  ArrowRight
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Comprehensive curriculum designed to foster critical thinking and academic achievement across all subjects.",
      color: "bg-blue-500"
    },
    {
      icon: Microscope,
      title: "Modern Laboratories",
      description: "State-of-the-art science and computer labs equipped with latest technology for hands-on learning.",
      color: "bg-green-500"
    },
    {
      icon: Palette,
      title: "Arts & Culture",
      description: "Rich cultural programs including music, dance, drama, and visual arts to nurture creative expression.",
      color: "bg-purple-500"
    },
    {
      icon: Trophy,
      title: "Sports Excellence",
      description: "Professional coaching and modern facilities for various sports to build physical fitness and teamwork.",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated and qualified teachers committed to providing personalized attention to every student.",
      color: "bg-red-500"
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "International exchange programs and global curriculum to prepare students for the modern world.",
      color: "bg-cyan-500"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose Our School?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We provide a nurturing environment where students thrive academically, 
            socially, and personally through our comprehensive educational approach.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-primary rounded-2xl p-12 text-center animate-fade-in">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our community of learners and discover your potential in an environment 
              that celebrates excellence and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" className="group">
                Schedule a Visit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-background hover:text-primary">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;