import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  User,
  Users
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/admissions", label: "Admissions" },
    { to: "/disclosures", label: "Mandatory Disclosures" },
    { to: "/gallery", label: "Gallery" },
    { to: "/fees", label: "Fees Structure" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+91 12345 67890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@sribalajisubrahmanyeswara.edu.in</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Srisailam Project, Andhra Pradesh</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light" asChild>
              <NavLink to="/admin-login">
                <User className="h-4 w-4 mr-2" />
                Admin Login
              </NavLink>
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light" asChild>
              <NavLink to="/staff-login">
                <Users className="h-4 w-4 mr-2" />
                Staff Login
              </NavLink>
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light" asChild>
              <NavLink to="/parent-login">
                <User className="h-4 w-4 mr-2" />
                Parent Login
              </NavLink>
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-background shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-3 rounded-xl">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Sri Balaji Subrahmanyeswara
                </h1>
                <p className="text-sm text-muted-foreground">English Medium High School</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 animate-fade-in">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg ${
                        isActive ? "text-primary bg-accent" : "text-foreground"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;