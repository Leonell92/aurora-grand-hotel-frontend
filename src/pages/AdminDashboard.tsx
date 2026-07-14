import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, BedDouble, Users, Settings, LogOut, Menu } from "lucide-react";
import { dashboardStats, mockBookings, rooms, mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminDashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { label: "Total Bookings", value: dashboardStats.totalBookings, change: "+12%" },
    { label: "Occupancy Rate", value: `${dashboardStats.occupancyRate}%`, change: "+5%" },
    { label: "Monthly Revenue", value: `₦${dashboardStats.monthlyRevenue.toLocaleString()}`, change: "+18%" },
    { label: "Avg. Rating", value: dashboardStats.averageRating, change: "+0.2" },
  ];

  return (
    <div className="min-h-screen flex bg-ivory-dark">
      {/* Sidebar */}
      <aside className={cn("bg-charcoal text-primary-foreground transition-all duration-300", sidebarOpen ? "w-64" : "w-20")}>
        <div className="p-6 border-b border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl">Aurora</span>
            {sidebarOpen && <span className="font-serif text-xl text-gold-light font-light">Grand</span>}
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} to={item.href} className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", location.pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-charcoal-light")}>
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-charcoal-light transition-colors">
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-secondary rounded-lg mr-4">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-serif text-3xl font-medium inline">Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Welcome, Admin</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6 rounded-xl luxury-shadow">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-serif font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-green-600 mt-2">{stat.change} vs last month</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-card rounded-xl luxury-shadow mb-8">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl font-medium">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Guest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Check-in</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-secondary/50">
                    <td className="px-6 py-4 text-sm font-medium">{booking.id}</td>
                    <td className="px-6 py-4 text-sm">{booking.guestName}</td>
                    <td className="px-6 py-4 text-sm">{booking.roomName}</td>
                    <td className="px-6 py-4 text-sm">{booking.checkIn}</td>
                    <td className="px-6 py-4"><span className={cn("px-2 py-1 text-xs rounded-full", booking.status === "confirmed" ? "bg-green-100 text-green-700" : booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700")}>{booking.status}</span></td>
                    <td className="px-6 py-4 text-sm font-medium">₦{booking.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl luxury-shadow p-6">
            <h3 className="font-serif text-lg font-medium mb-4">Room Types</h3>
            <div className="space-y-3">
              {rooms.slice(0, 3).map((room) => (
                <div key={room.id} className="flex items-center justify-between">
                  <span className="text-sm">{room.name}</span>
                  <span className="text-sm font-medium">₦{room.pricePerNight}/night</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl luxury-shadow p-6">
            <h3 className="font-serif text-lg font-medium mb-4">Recent Users</h3>
            <div className="space-y-3">
              {mockUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <span className="text-sm">{user.name}</span>
                  <span className={cn("px-2 py-1 text-xs rounded-full", user.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground")}>{user.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
