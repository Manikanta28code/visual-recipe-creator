import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Clock
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    "About Us",
    "Academic Programs", 
    "Admissions",
    "Faculty",
    "Campus Life",
    "Alumni"
  ];

  const importantLinks = [
    "Fee Payment",
    "Academic Calendar",
    "Examination Results",
    "Student Portal",
    "Parent Portal",
    "Career Opportunities"
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-accent rounded-xl p-3">
                <GraduationCap className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Sri Balaji Subrahmanveswara</h3>
                <p className="text-sm text-primary-foreground/80">English Medium High School</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed">
              Committed to excellence in education for over 25 years. We nurture young minds 
              with values, innovation, and academic rigor.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-light hover:text-accent transition-colors"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-accent transition-colors hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Important Links</h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-accent transition-colors hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/90">
                    123 Education Street,<br />
                    Banjara Hills, Hyderabad,<br />
                    Telangana - 500034
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-primary-foreground/90">+91 12345 67890</p>
                  <p className="text-primary-foreground/90">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <p className="text-primary-foreground/90">info@sribalajischool.edu.in</p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-accent mt-1" />
                <div>
                  <p className="text-primary-foreground/90">
                    <strong>Office Hours:</strong><br />
                    Mon - Fri: 8:00 AM - 4:00 PM<br />
                    Sat: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-light/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80">
                © 2024 Sri Balaji Subrahmanveswara English Medium High School. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Mandatory Disclosures
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;