import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Search, Edit, Trash2, FileText, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleInvoices, sampleStudents, type Invoice, type InvoiceItem } from "@/data/sampleData";

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  category: z.enum(["tuition", "library", "transport", "activity", "exam", "miscellaneous"]),
});

const invoiceSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  term: z.string().min(1, "Term is required"),
  dueDate: z.string().min(1, "Due date is required"),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

type InvoiceForm = z.infer<typeof invoiceSchema>;

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(sampleInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const form = useForm<InvoiceForm>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      studentId: "",
      academicYear: "2024-25",
      term: "",
      dueDate: "",
      items: [{ description: "", amount: 0, category: "tuition" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const filteredInvoices = invoices.filter(invoice =>
    invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.academicYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: InvoiceForm) => {
    const student = sampleStudents.find(s => s.id === data.studentId);
    if (!student) return;

    const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);

    if (editingInvoice) {
      setInvoices(invoices.map(invoice => 
        invoice.id === editingInvoice.id 
          ? {
              ...invoice,
              ...data,
              studentName: student.name,
              totalAmount,
              dueAmount: totalAmount - invoice.paidAmount,
              items: data.items.map((item, index) => ({
                id: `item-${Date.now()}-${index}`,
                description: item.description,
                amount: item.amount,
                category: item.category,
              })),
            }
          : invoice
      ));
      toast({
        title: "Invoice updated",
        description: "Invoice has been updated successfully.",
      });
      setEditingInvoice(null);
    } else {
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        studentId: data.studentId,
        studentName: student.name,
        academicYear: data.academicYear,
        term: data.term,
        dueDate: data.dueDate,
        totalAmount,
        paidAmount: 0,
        dueAmount: totalAmount,
        status: 'pending',
        createdDate: new Date().toISOString().split('T')[0],
        items: data.items.map((item, index) => ({
          id: `item-${Date.now()}-${index}`,
          description: item.description,
          amount: item.amount,
          category: item.category,
        })),
      };
      setInvoices([...invoices, newInvoice]);
      toast({
        title: "Invoice created",
        description: "New invoice has been created successfully.",
      });
    }
    form.reset();
    setIsDialogOpen(false);
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    form.reset({
      studentId: invoice.studentId,
      academicYear: invoice.academicYear,
      term: invoice.term,
      dueDate: invoice.dueDate,
      items: invoice.items,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (invoiceId: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    toast({
      title: "Invoice deleted",
      description: "Invoice has been deleted successfully.",
    });
  };

  const handleUpdatePayment = (invoiceId: string, paidAmount: number) => {
    setInvoices(invoices.map(invoice => {
      if (invoice.id === invoiceId) {
        const newDueAmount = invoice.totalAmount - paidAmount;
        let status: Invoice['status'] = 'pending';
        
        if (paidAmount >= invoice.totalAmount) {
          status = 'paid';
        } else if (paidAmount > 0) {
          status = 'partial';
        } else if (new Date(invoice.dueDate) < new Date()) {
          status = 'overdue';
        }

        return {
          ...invoice,
          paidAmount,
          dueAmount: newDueAmount,
          status,
        };
      }
      return invoice;
    }));
    toast({
      title: "Payment updated",
      description: "Payment status has been updated successfully.",
    });
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'default';
      case 'partial': return 'secondary';
      case 'overdue': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Invoice Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage student invoices</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingInvoice(null);
              form.reset();
            }}>
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
              <DialogDescription>
                {editingInvoice ? 'Update invoice details' : 'Create a new invoice for a student'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sampleStudents.map((student) => (
                              <SelectItem key={student.id} value={student.id}>
                                {student.name} ({student.class}-{student.section})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2024-25">2024-25</SelectItem>
                            <SelectItem value="2023-24">2023-24</SelectItem>
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
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Invoice Items</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ description: "", amount: 0, category: "tuition" })}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Fee description" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3">
                        <FormField
                          control={form.control}
                          name={`items.${index}.category`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="tuition">Tuition</SelectItem>
                                  <SelectItem value="library">Library</SelectItem>
                                  <SelectItem value="transport">Transport</SelectItem>
                                  <SelectItem value="activity">Activity</SelectItem>
                                  <SelectItem value="exam">Exam</SelectItem>
                                  <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-3">
                        <FormField
                          control={form.control}
                          name={`items.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  {...field}
                                  onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2">
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
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
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoices ({filteredInvoices.length})
          </CardTitle>
          <CardDescription>Manage student fee invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Due Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.studentName}</TableCell>
                  <TableCell>{invoice.academicYear}</TableCell>
                  <TableCell>{invoice.term}</TableCell>
                  <TableCell>₹{invoice.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>₹{invoice.dueAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingInvoice(invoice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(invoice)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(invoice.id)}
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

      {/* View Invoice Dialog */}
      <Dialog open={!!viewingInvoice} onOpenChange={() => setViewingInvoice(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              Complete invoice information and payment options
            </DialogDescription>
          </DialogHeader>
          {viewingInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Student</h4>
                  <p className="font-medium">{viewingInvoice.studentName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Invoice ID</h4>
                  <p className="font-medium">{viewingInvoice.id}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Academic Year</h4>
                  <p>{viewingInvoice.academicYear}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Term</h4>
                  <p>{viewingInvoice.term}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Invoice Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingInvoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Total Amount</h4>
                  <p className="text-lg font-bold">₹{viewingInvoice.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Paid Amount</h4>
                  <p className="text-lg font-bold text-green-600">₹{viewingInvoice.paidAmount.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Due Amount</h4>
                  <p className="text-lg font-bold text-red-600">₹{viewingInvoice.dueAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Update Payment</label>
                  <Input
                    type="number"
                    placeholder="Enter paid amount"
                    defaultValue={viewingInvoice.paidAmount}
                    onBlur={(e) => {
                      const amount = parseFloat(e.target.value) || 0;
                      if (amount !== viewingInvoice.paidAmount) {
                        handleUpdatePayment(viewingInvoice.id, amount);
                      }
                    }}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceManagement;