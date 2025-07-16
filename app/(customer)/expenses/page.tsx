"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, DollarSign, Calendar, Tag } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
}

const categories = [
  "Travel",
  "Meals",
  "Office Supplies",
  "Software",
  "Marketing",
  "Training",
  "Other",
];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      title: "Business Lunch",
      amount: 45.5,
      category: "Meals",
      date: "2024-01-15",
      description: "Client meeting lunch",
      status: "approved",
    },
    {
      id: "2",
      title: "Flight to Conference",
      amount: 320.0,
      category: "Travel",
      date: "2024-01-10",
      description: "Annual tech conference",
      status: "pending",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: editingExpense?.id || Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description,
      status: "pending",
    };

    if (editingExpense) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === editingExpense.id
            ? { ...newExpense, status: editingExpense.status }
            : exp
        )
      );
    } else {
      setExpenses([...expenses, newExpense]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    });
    setEditingExpense(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
      description: expense.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const getStatusBadge = (status: Expense["status"]) => {
    const variants = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const approvedAmount = expenses
    .filter((exp) => exp.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingExpense ? "Edit Expense" : "Add New Expense"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter expense title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Optional description"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingExpense ? "Update" : "Add"} Expense
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${approvedAmount.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenses.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{expense.title}</div>
                      {expense.description && (
                        <div className="text-sm text-muted-foreground">
                          {expense.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(expense)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
