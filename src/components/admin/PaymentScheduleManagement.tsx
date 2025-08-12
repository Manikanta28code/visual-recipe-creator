import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Search, Edit, Trash2, Calendar, Send, Bell, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { samplePaymentSchedules, sampleInvoices, type PaymentSchedule } from "@/data/sampleData";

const paymentScheduleSchema = z.object({
  academicYear: z.string().min(1, "Academic year is required"),
  term: z.string().min(1, "Term is required"),
  dueDate: z.string().min(1, "Due date is required"),
  reminderDate: z.string().min(1, "Reminder date is required"),
  description: z.string().min(1, "Description is required"),
});

type PaymentScheduleForm = z.infer<typeof paymentScheduleSchema>;

const PaymentScheduleManagement = () => {
  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedule[]>(samplePaymentSchedules);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<PaymentSchedule | null>(null);
  const { toast } = useToast();

  const form = useForm<PaymentScheduleForm>({
    resolver: zodResolver(paymentScheduleSchema),
    defaultValues: {
      academicYear: "2024-25",
      term: "",
      dueDate: "",
      reminderDate: "",
      description: "",
    },
  });

  const filteredSchedules = paymentSchedules.filter(schedule => {
    const matchesSearch = schedule.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.academicYear.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === "all" || schedule.academicYear === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  const academicYears = Array.from(new Set(paymentSchedules.map(ps => ps.academicYear)));

  const onSubmit = (data: PaymentScheduleForm) => {
    if (editingSchedule) {
      setPaymentSchedules(paymentSchedules.map(schedule => 
        schedule.id === editingSchedule.id 
          ? { ...schedule, ...data }
          : schedule
      ));
      toast({
        title: "Payment schedule updated",
        description: "Payment schedule has been updated successfully.",
      });
      setEditingSchedule(null);
    } else {
      const newSchedule: PaymentSchedule = {
        id: `schedule-${Date.now()}`,
        academicYear: data.academicYear,
        term: data.term,
        dueDate: data.dueDate,
        reminderDate: data.reminderDate,
        description: data.description,
        isActive: true,
      };
      setPaymentSchedules([...paymentSchedules, newSchedule]);
      toast({
        title: "Payment schedule created",
        description: "New payment schedule has been created successfully.",
      });
    }
    form.reset();
    setIsDialogOpen(false);
  };

  const handleEdit = (schedule: PaymentSchedule) => {
    setEditingSchedule(schedule);
    form.reset(schedule);
    setIsDialogOpen(true);
  };

  const handleDelete = (scheduleId: string) => {
    setPaymentSchedules(paymentSchedules.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, isActive: false }
        : schedule
    ));
    toast({
      title: "Payment schedule deactivated",
      description: "Payment schedule has been deactivated successfully.",
    });
  };

  const handleToggleActive = (scheduleId: string) => {
    setPaymentSchedules(paymentSchedules.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, isActive: !schedule.isActive }
        : schedule
    ));
    toast({
      title: "Schedule status updated",
      description: "Payment schedule status has been updated successfully.",
    });
  };

  const handleSendReminders = (scheduleId: string) => {
    // In a real app, this would send emails/SMS to students with pending payments
    const overdueInvoices = sampleInvoices.filter(invoice => 
      invoice.status === 'overdue' || invoice.status === 'pending'
    );
    
    toast({
      title: "Reminders sent",
      description: `Payment reminders sent to ${overdueInvoices.length} students with pending payments.`,
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (schedule: PaymentSchedule) => {
    const daysUntilDue = getDaysUntilDue(schedule.dueDate);
    const daysUntilReminder = getDaysUntilDue(schedule.reminderDate);
    
    if (!schedule.isActive) {
      return <Badge variant="outline">Inactive</Badge>;
    }
    
    if (daysUntilDue < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    
    if (daysUntilReminder <= 0 && daysUntilDue > 0) {
      return <Badge variant="secondary">Reminder Active</Badge>;
    }
    
    if (daysUntilDue <= 7) {
      return <Badge variant="default">Due Soon</Badge>;
    }
    
    return <Badge variant="outline">Scheduled</Badge>;
  };

  const getPendingPaymentsCount = (term: string) => {
    return sampleInvoices.filter(invoice => 
      invoice.term === term && (invoice.status === 'pending' || invoice.status === 'overdue' || invoice.status === 'partial')
    ).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payment Schedule Management</h2>
          <p className="text-muted-foreground">Manage payment schedules and send reminders</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingSchedule(null);
              form.reset();
            }}>
              <Plus className="h-4 w-4" />
              Create Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSchedule ? 'Edit Payment Schedule' : 'Create New Payment Schedule'}</DialogTitle>
              <DialogDescription>
                {editingSchedule ? 'Update payment schedule details' : 'Create a new payment schedule with due dates and reminders'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2024-25">2024-25</SelectItem>
                            <SelectItem value="2025-26">2025-26</SelectItem>
                            <SelectItem value="2023-24">2023-24</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Term</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select term" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Term 1">Term 1</SelectItem>
                            <SelectItem value="Term 2">Term 2</SelectItem>
                            <SelectItem value="Term 3">Term 3</SelectItem>
                            <SelectItem value="Annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reminderDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reminder Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter payment schedule description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search schedules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {academicYears.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Schedules</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSchedules.filter(s => s.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active payment schedules
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSchedules.filter(s => {
                const days = getDaysUntilDue(s.dueDate);
                return s.isActive && days >= 0 && days <= 7;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Payments due within 7 days
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleInvoices.filter(i => i.status === 'pending' || i.status === 'overdue' || i.status === 'partial').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Students with pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Payment Schedules ({filteredSchedules.length})
          </CardTitle>
          <CardDescription>Manage payment due dates and reminder schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Academic Year</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Reminder Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pending Payments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.academicYear}</TableCell>
                  <TableCell>{schedule.term}</TableCell>
                  <TableCell>{schedule.description}</TableCell>
                  <TableCell>
                    <div>
                      <div>{schedule.dueDate}</div>
                      <div className="text-xs text-muted-foreground">
                        {getDaysUntilDue(schedule.dueDate) >= 0 
                          ? `${getDaysUntilDue(schedule.dueDate)} days left`
                          : `${Math.abs(getDaysUntilDue(schedule.dueDate))} days overdue`
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{schedule.reminderDate}</div>
                      <div className="text-xs text-muted-foreground">
                        {getDaysUntilDue(schedule.reminderDate) >= 0 
                          ? `${getDaysUntilDue(schedule.reminderDate)} days to remind`
                          : "Reminder active"
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(schedule)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getPendingPaymentsCount(schedule.term)} pending
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendReminders(schedule.id)}
                        disabled={!schedule.isActive}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(schedule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(schedule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No payment schedules found</h3>
          <p className="text-muted-foreground">Create a new payment schedule to get started.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentScheduleManagement;