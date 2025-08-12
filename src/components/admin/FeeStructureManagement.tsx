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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Search, Edit, Trash2, DollarSign, History, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleFeeStructures, type FeeStructure, type FeeItem } from "@/data/sampleData";

const feeItemSchema = z.object({
  category: z.enum(["tuition", "library", "transport", "activity", "exam", "miscellaneous"]),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  isOptional: z.boolean(),
});

const feeStructureSchema = z.object({
  academicYear: z.string().min(1, "Academic year is required"),
  class: z.string().min(1, "Class is required"),
  term: z.string().min(1, "Term is required"),
  fees: z.array(feeItemSchema).min(1, "At least one fee item is required"),
});

type FeeStructureForm = z.infer<typeof feeStructureSchema>;

const FeeStructureManagement = () => {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(sampleFeeStructures);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [showHistorical, setShowHistorical] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStructure, setEditingStructure] = useState<FeeStructure | null>(null);
  const { toast } = useToast();

  const form = useForm<FeeStructureForm>({
    resolver: zodResolver(feeStructureSchema),
    defaultValues: {
      academicYear: "2024-25",
      class: "",
      term: "",
      fees: [{ category: "tuition", description: "", amount: 0, isOptional: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fees",
  });

  const filteredStructures = feeStructures.filter(structure => {
    const matchesSearch = structure.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.academicYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.term.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === "all" || structure.academicYear === selectedYear;
    const matchesHistorical = showHistorical || structure.isActive;
    
    return matchesSearch && matchesYear && matchesHistorical;
  });

  const academicYears = Array.from(new Set(feeStructures.map(fs => fs.academicYear)));

  const onSubmit = (data: FeeStructureForm) => {
    if (editingStructure) {
      setFeeStructures(feeStructures.map(structure => 
        structure.id === editingStructure.id 
          ? {
              ...structure,
              ...data,
              fees: data.fees.map((fee, index) => ({
                id: `fee-${Date.now()}-${index}`,
                category: fee.category,
                description: fee.description,
                amount: fee.amount,
                isOptional: fee.isOptional,
              })),
            }
          : structure
      ));
      toast({
        title: "Fee structure updated",
        description: "Fee structure has been updated successfully.",
      });
      setEditingStructure(null);
    } else {
      const newStructure: FeeStructure = {
        id: `fee-struct-${Date.now()}`,
        ...data,
        isActive: true,
        createdDate: new Date().toISOString().split('T')[0],
        fees: data.fees.map((fee, index) => ({
          id: `fee-${Date.now()}-${index}`,
          category: fee.category,
          description: fee.description,
          amount: fee.amount,
          isOptional: fee.isOptional,
        })),
      };
      setFeeStructures([...feeStructures, newStructure]);
      toast({
        title: "Fee structure created",
        description: "New fee structure has been created successfully.",
      });
    }
    form.reset();
    setIsDialogOpen(false);
  };

  const handleEdit = (structure: FeeStructure) => {
    setEditingStructure(structure);
    form.reset({
      academicYear: structure.academicYear,
      class: structure.class,
      term: structure.term,
      fees: structure.fees,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (structureId: string) => {
    setFeeStructures(feeStructures.map(structure => 
      structure.id === structureId 
        ? { ...structure, isActive: false }
        : structure
    ));
    toast({
      title: "Fee structure deactivated",
      description: "Fee structure has been deactivated successfully.",
    });
  };

  const handleCopyStructure = (structure: FeeStructure) => {
    form.reset({
      academicYear: "2024-25",
      class: structure.class,
      term: structure.term,
      fees: structure.fees.map(fee => ({
        category: fee.category,
        description: fee.description,
        amount: fee.amount,
        isOptional: fee.isOptional,
      })),
    });
    setIsDialogOpen(true);
    toast({
      title: "Structure copied",
      description: "Fee structure has been copied to the form. You can modify and save as new.",
    });
  };

  const getTotalAmount = (fees: FeeItem[]) => {
    return fees.reduce((sum, fee) => sum + fee.amount, 0);
  };

  const getCategoryColor = (category: string): "default" | "destructive" | "outline" | "secondary" => {
    const colors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      tuition: 'default',
      library: 'secondary',
      transport: 'outline',
      activity: 'destructive',
      exam: 'secondary',
      miscellaneous: 'outline',
    };
    return colors[category] || 'outline';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Fee Structure Management</h2>
          <p className="text-muted-foreground">Manage fee structures for different classes and academic years</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingStructure(null);
              form.reset();
            }}>
              <Plus className="h-4 w-4" />
              Create Fee Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStructure ? 'Edit Fee Structure' : 'Create New Fee Structure'}</DialogTitle>
              <DialogDescription>
                {editingStructure ? 'Update fee structure details' : 'Create a new fee structure for a class and term'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
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
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10" {...field} />
                        </FormControl>
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Fee Items</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ category: "tuition", description: "", amount: 0, isOptional: false })}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-2 items-center p-4 border rounded-lg">
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`fees.${index}.category`}
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
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name={`fees.${index}.description`}
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
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name={`fees.${index}.amount`}
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
                        <FormField
                          control={form.control}
                          name={`fees.${index}.isOptional`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-xs">Optional</FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
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
                    {editingStructure ? 'Update Structure' : 'Create Structure'}
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
            placeholder="Search fee structures..."
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
        <div className="flex items-center space-x-2">
          <Switch
            id="historical"
            checked={showHistorical}
            onCheckedChange={setShowHistorical}
          />
          <label htmlFor="historical" className="text-sm font-medium">
            Show Historical
          </label>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredStructures.map((structure) => (
          <Card key={structure.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Class {structure.class} - {structure.term} ({structure.academicYear})
                  </CardTitle>
                  <CardDescription>
                    Total Amount: ₹{getTotalAmount(structure.fees).toLocaleString()}
                    {!structure.isActive && " (Historical)"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {!structure.isActive && (
                    <Badge variant="outline" className="gap-1">
                      <History className="h-3 w-3" />
                      Historical
                    </Badge>
                  )}
                  <Badge variant={structure.isActive ? 'default' : 'secondary'}>
                    {structure.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyStructure(structure)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(structure)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(structure.id)}
                    disabled={!structure.isActive}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {structure.fees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>
                        <Badge variant={getCategoryColor(fee.category)}>
                          {fee.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={fee.isOptional ? 'outline' : 'secondary'}>
                          {fee.isOptional ? 'Optional' : 'Mandatory'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStructures.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No fee structures found</h3>
          <p className="text-muted-foreground">Create a new fee structure to get started.</p>
        </div>
      )}
    </div>
  );
};

export default FeeStructureManagement;