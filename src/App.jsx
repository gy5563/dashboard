import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  CreditCard, 
  Activity, 
  MoreHorizontal,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

// --- Mock Data ---

const STATS = [
  { label: 'Total Revenue', value: '$54,230', change: '+12.5%', isPositive: true, icon: DollarSign, color: 'bg-blue-500' },
  { label: 'Total Orders', value: '1,245', change: '+8.2%', isPositive: true, icon: ShoppingCart, color: 'bg-indigo-500' },
  { label: 'New Customers', value: '342', change: '-2.4%', isPositive: false, icon: Users, color: 'bg-orange-500' },
  { label: 'Active Now', value: '573', change: '+5.1%', isPositive: true, icon: Activity, color: 'bg-emerald-500' },
];

const INVOICES = [
  { id: 'INV-001', user: 'Alice Freeman', date: '20 Oct, 2023', amount: '$1,200.00', status: 'Paid', img: 'https://i.pravatar.cc/150?u=a' },
  { id: 'INV-002', user: 'Bob Smith', date: '21 Oct, 2023', amount: '$850.00', status: 'Pending', img: 'https://i.pravatar.cc/150?u=b' },
  { id: 'INV-003', user: 'Charlie Kim', date: '22 Oct, 2023', amount: '$2,300.00', status: 'Overdue', img: 'https://i.pravatar.cc/150?u=c' },
  { id: 'INV-004', user: 'Diana Rose', date: '23 Oct, 2023', amount: '$450.00', status: 'Paid', img: 'https://i.pravatar.cc/150?u=d' },
  { id: 'INV-005', user: 'Ethan Hunt', date: '23 Oct, 2023', amount: '$3,100.00', status: 'Paid', img: 'https://i.pravatar.cc/150?u=e' },
];

const DELIVERIES = [
  { id: 'TRK-9821', product: 'MacBook Pro M2', destination: 'New York, NY', status: 'In Transit', progress: 75 },
  { id: 'TRK-9822', product: 'Nike Air Jordan', destination: 'Chicago, IL', status: 'Delivered', progress: 100 },
  { id: 'TRK-9823', product: 'Sony WH-1000XM5', destination: 'San Francisco, CA', status: 'Processing', progress: 25 },
  { id: 'TRK-9824', product: 'Samsung S23 Ultra', destination: 'Austin, TX', status: 'Delayed', progress: 40 },
];

const SALES_DATA = [45, 52, 38, 24, 33, 65, 85, 70, 55, 60, 50, 75]; // Mock chart data

// --- Components ---

const SidebarItem = ({ icon, label, active, onClick }) => {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 mb-1 transition-colors rounded-lg group ${
        active 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className={`w-5 h-5 mr-3 ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Overdue: 'bg-red-100 text-red-700',
    'In Transit': 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
    Processing: 'bg-gray-100 text-gray-700',
    Delayed: 'bg-red-100 text-red-700',
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

// A Simple SVG Line Chart Component
const SimpleLineChart = ({ data }) => {
  const max = Math.max(...data);
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (val / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-48 relative mt-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {/* Grid lines */}
        <line x1="0" y1="0" x2="100" y2="0" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="100" y2="100" stroke="#f3f4f6" strokeWidth="0.5" />
        
        {/* Area fill */}
        <path d={`M0,100 L0,${100 - (data[0]/max)*100} ${points.split(' ').map(p => 'L' + p).join(' ')} L100,100 Z`} fill="rgba(79, 70, 229, 0.1)" />
        
        {/* Line */}
        <polyline fill="none" stroke="#4f46e5" strokeWidth="2" points={points} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
        <span>Dec</span>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">ShopDash</span>
          </div>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <SidebarItem icon={Package} label="Orders" active={activeTab === 'Orders'} onClick={() => setActiveTab('Orders')} />
            <SidebarItem icon={Users} label="Customers" active={activeTab === 'Customers'} onClick={() => setActiveTab('Customers')} />
            <SidebarItem icon={BarChart3} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Support</p>
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 lg:hidden focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center ml-4 relative">
              <Search className="w-4 h-4 absolute left-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">Alex Morgan</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <img 
                src="https://i.pravatar.cc/150?u=admin" 
                alt="Profile" 
                className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover" 
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Here's what's happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STATS.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400 ml-1">vs last month</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Chart Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Sales Overview</h3>
                  <p className="text-sm text-gray-500">Monthly revenue performance</p>
                </div>
                <select className="text-sm border-gray-200 border rounded-md px-2 py-1 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Last 12 Months</option>
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              <SimpleLineChart data={SALES_DATA} />
            </div>

            {/* Product Delivery Status */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Delivery Status</h3>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-6">
                {DELIVERIES.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{item.product}</h4>
                        <p className="text-xs text-gray-500 flex items-center mt-0.5">
                          <Truck className="w-3 h-3 mr-1" /> {item.id}
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-gray-500">
                            {item.destination}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                        <div style={{ width: `${item.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Invoices Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Recent Invoices</h3>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500">
                  <Search className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Invoice ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {INVOICES.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                        #{invoice.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img className="h-8 w-8 rounded-full object-cover mr-3" src={invoice.img} alt="" />
                          <span className="text-sm font-medium text-gray-900">{invoice.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                View All Invoices
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}