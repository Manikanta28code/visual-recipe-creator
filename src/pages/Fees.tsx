import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, Calendar, AlertCircle } from "lucide-react";

const Fees = () => {
  const termWiseFees = [
    { class: "Nursery", term1: "2200", term2: "2200", term3: "1700", total: "5900" },
    { class: "L.K.G", term1: "2400", term2: "2200", term3: "1900", total: "6500" },
    { class: "U.K.G", term1: "2500", term2: "2300", term3: "2000", total: "7000" },
    { class: "1st Class", term1: "3200", term2: "2400", term3: "2100", total: "7700" },
    { class: "2nd Class", term1: "3200", term2: "2400", term3: "2100", total: "7700" },
    { class: "3rd Class", term1: "3400", term2: "2600", term3: "2300", total: "8300" },
    { class: "4th Class", term1: "3400", term2: "2600", term3: "2300", total: "8300" },
    { class: "5th Class", term1: "3400", term2: "2600", term3: "2300", total: "8300" },
    { class: "6th Class", term1: "3400", term2: "3000", term3: "2500", total: "8900" },
    { class: "7th Class", term1: "3500", term2: "3200", term3: "2800", total: "9500" },
    { class: "8th Class", term1: "4000", term2: "3700", term3: "2400", total: "10,100" },
    { class: "9th Class", term1: "4200", term2: "4000", term3: "2500", total: "10,700" },
    { class: "10th Class", term1: "4500", term2: "4200", term3: "3000", total: "11,500" },
  ];

  const feeCategories = [
    { category: "Tuition Fee", nursery: "1500", kg: "1500", primary: "2700", middle: "3250", high: "3450" },
    { category: "Maintenance Fee", nursery: "1500", kg: "1500", primary: "2700", middle: "3250", high: "3450" },
    { category: "Books", nursery: "1020", kg: "1130", primary: "2010", middle: "2420", high: "2970" },
    { category: "Admission Fee", nursery: "6100", kg: "6150", primary: "6215", middle: "6497", high: "7190" },
    { category: "Development Fund", nursery: "6300", kg: "6335", primary: "6535", middle: "6142", high: "6650" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <IndianRupee className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Fee Structure
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Academic Year 2025-2026 - Transparent and affordable education for all
          </p>
          <Badge variant="secondary" className="mt-4">
            <Calendar className="h-4 w-4 mr-2" />
            Academic Year 2025-26
          </Badge>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  Payment Instructions
                </h3>
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  Payment to be made all together or in three installments terms as mentioned below. 
                  Every class maintenance fee includes Exam fees, S.D.F (School Development Fund), 
                  Identity card, and Dairy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Term-wise Fee Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <IndianRupee className="h-5 w-5 mr-2 text-primary" />
              Term-wise Payment Schedule
            </CardTitle>
            <CardDescription>
              Fee structure divided into three terms for the academic year 2025-2026
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="text-center font-semibold">Term 1</TableHead>
                    <TableHead className="text-center font-semibold">Term 2</TableHead>
                    <TableHead className="text-center font-semibold">Term 3</TableHead>
                    <TableHead className="text-center font-semibold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {termWiseFees.map((fee, index) => (
                    <TableRow key={index} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{fee.class}</TableCell>
                      <TableCell className="text-center">₹{fee.term1}</TableCell>
                      <TableCell className="text-center">₹{fee.term2}</TableCell>
                      <TableCell className="text-center">₹{fee.term3}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">
                        ₹{fee.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Fee Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Fee Breakdown</CardTitle>
            <CardDescription>
              Category-wise fee structure across different class groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fee Category</TableHead>
                    <TableHead className="text-center font-semibold">Nursery</TableHead>
                    <TableHead className="text-center font-semibold">K.G</TableHead>
                    <TableHead className="text-center font-semibold">1st-4th Class</TableHead>
                    <TableHead className="text-center font-semibold">5th-7th Class</TableHead>
                    <TableHead className="text-center font-semibold">8th-10th Class</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeCategories.map((category, index) => (
                    <TableRow key={index} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell className="text-center">₹{category.nursery}</TableCell>
                      <TableCell className="text-center">₹{category.kg}</TableCell>
                      <TableCell className="text-center">₹{category.primary}</TableCell>
                      <TableCell className="text-center">₹{category.middle}</TableCell>
                      <TableCell className="text-center">₹{category.high}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Guidelines */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Fees can be paid in full or in three installments as per the term schedule
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Late payment charges may apply after the due date
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Fee receipts must be preserved for future reference
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact for Fee Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Accounts Office</p>
                <p className="text-muted-foreground">Phone: +91 12345 67890</p>
                <p className="text-muted-foreground">Email: accounts@sribalajischool.edu.in</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Office Hours</p>
                <p className="text-muted-foreground">Monday to Saturday: 9:00 AM - 4:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fees;