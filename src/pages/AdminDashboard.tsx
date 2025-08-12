import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, DollarSign, Calendar, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserManagement from "@/components/admin/UserManagement";
import InvoiceManagement from "@/components/admin/InvoiceManagement";
import FeeStructureManagement from "@/components/admin/FeeStructureManagement";
import PaymentScheduleManagement from "@/components/admin/PaymentScheduleManagement";
import AdminProfile from "@/components/admin/AdminProfile";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    navigate("/admin-login");
  };

  const dashboardStats = [
    {
      title: "Total Users",
      value: "847",
      description: "Active users in system",
      icon: Users,
      trend: "+12 this month"
    },
    {
      title: "Pending Invoices",
      value: "23",
      description: "Awaiting payment",
      icon: FileText,
      trend: "-5 from last week"
    },
    {
      title: "Revenue",
      value: "₹2,45,000",
      description: "This month",
      icon: DollarSign,
      trend: "+8% from last month"
    },
    {
      title: "Due Reminders",
      value: "156",
      description: "Pending notifications",
      icon: Calendar,
      trend: "12 sent today"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">School Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Administrator
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="gap-2">
              <Settings className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="invoices" className="gap-2">
              <FileText className="h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="fees" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Fee Structure
            </TabsTrigger>
            <TabsTrigger value="schedules" className="gap-2">
              <Calendar className="h-4 w-4" />
              Payment Schedules
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Settings className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="shadow-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                      <p className="text-xs text-primary mt-1">
                        {stat.trend}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New parent registration</p>
                      <p className="text-sm text-muted-foreground">Mary Parent joined</p>
                    </div>
                    <Badge variant="secondary">2 min ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-sm text-muted-foreground">₹12,000 from Bob Smith</p>
                    </div>
                    <Badge variant="secondary">15 min ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Invoice generated</p>
                      <p className="text-sm text-muted-foreground">Term 1 fees for Class 10</p>
                    </div>
                    <Badge variant="secondary">1 hour ago</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("users")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("invoices")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Invoice
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("schedules")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Send Payment Reminders
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("fees")}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Update Fee Structure
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoiceManagement />
          </TabsContent>

          <TabsContent value="fees">
            <FeeStructureManagement />
          </TabsContent>

          <TabsContent value="schedules">
            <PaymentScheduleManagement />
          </TabsContent>

          <TabsContent value="profile">
            <AdminProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;