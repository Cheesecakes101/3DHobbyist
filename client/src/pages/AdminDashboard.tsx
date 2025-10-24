import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Order, CustomPrintRequest, Product, InsertProduct } from "@shared/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, FileText, ShoppingBag, CheckCircle, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { useCart } from "@/contexts/CartContext"; // Not needed for admin
import { format } from "date-fns";

export default function AdminDashboard() {
  const formatDate = (date: Date | string) => {
    try {
      return format(new Date(date), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };
  const [activeTab, setActiveTab] = useState("orders");
  const { toast } = useToast();

  // Fetch orders
  const { data: orders = [], isLoading: ordersLoading, error: ordersError } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    retry: false,
  });

  // Fetch custom print requests
  const { data: customPrintRequests = [], isLoading: requestsLoading, error: requestsError } = useQuery<CustomPrintRequest[]>({
    queryKey: ["/api/custom-print-requests"],
    retry: false,
  });

  // Fetch products for stats
  const { data: products = [], error: productsError } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    retry: false,
  });

  // Log errors for debugging
  if (ordersError) console.error("Orders error:", ordersError);
  if (requestsError) console.error("Requests error:", requestsError);
  if (productsError) console.error("Products error:", productsError);

  // Update order status
  const updateOrderStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest(`/api/orders/${id}/status`, "PATCH", { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({ title: "Order status updated" });
    },
    onError: () => {
      toast({ title: "Failed to update order status", variant: "destructive" });
    },
  });

  // Update custom print request status
  const updateRequestStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest(`/api/custom-print-requests/${id}/status`, "PATCH", { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/custom-print-requests"] });
      toast({ title: "Request status updated" });
    },
    onError: () => {
      toast({ title: "Failed to update request status", variant: "destructive" });
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      processing: "default",
      completed: "outline",
      cancelled: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      description: `${orders.filter(o => o.status === "pending").length} pending`,
    },
    {
      title: "Custom Requests",
      value: customPrintRequests.length,
      icon: FileText,
      description: `${customPrintRequests.filter(r => r.status === "pending").length} pending`,
    },
    {
      title: "Products",
      value: products.length,
      icon: Package,
      description: `${products.filter(p => p.stock > 0).length} in stock`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={0} onCartClick={() => {}} />

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage orders, custom print requests, and products
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="requests">Custom Requests</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Orders</CardTitle>
                  <CardDescription>
                    View and manage all customer orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Loading orders...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No orders yet
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">
                              {order.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell className="font-medium">
                              {order.customerName}
                            </TableCell>
                            <TableCell>{order.customerEmail}</TableCell>
                            <TableCell>{order.customerPhone}</TableCell>
                            <TableCell>₹{parseFloat(order.total).toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              {formatDate(order.createdAt)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {order.status === "pending" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateOrderStatus.mutate({
                                        id: order.id,
                                        status: "processing",
                                      })
                                    }
                                  >
                                    <Clock className="h-3 w-3 mr-1" />
                                    Process
                                  </Button>
                                )}
                                {order.status === "processing" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateOrderStatus.mutate({
                                        id: order.id,
                                        status: "completed",
                                      })
                                    }
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Custom Print Requests Tab */}
            <TabsContent value="requests" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Print Requests</CardTitle>
                  <CardDescription>
                    View and manage custom 3D printing requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {requestsLoading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Loading requests...
                    </div>
                  ) : customPrintRequests.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No custom print requests yet
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>File</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customPrintRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-mono text-xs">
                              {request.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell className="font-medium">
                              {request.name}
                            </TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {request.projectDescription}
                            </TableCell>
                            <TableCell>
                              {request.fileUrl ? (
                                <a
                                  href={request.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-sm"
                                >
                                  View File
                                </a>
                              ) : (
                                <span className="text-muted-foreground text-sm">
                                  No file
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                            <TableCell>
                              {formatDate(request.createdAt)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {request.status === "pending" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateRequestStatus.mutate({
                                        id: request.id,
                                        status: "processing",
                                      })
                                    }
                                  >
                                    <Clock className="h-3 w-3 mr-1" />
                                    Process
                                  </Button>
                                )}
                                {request.status === "processing" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateRequestStatus.mutate({
                                        id: request.id,
                                        status: "completed",
                                      })
                                    }
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>
                    Manage products from the existing admin page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Product management is available on the dedicated admin page
                    </p>
                    <Button asChild>
                      <a href="/admin/products">Go to Product Management</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
