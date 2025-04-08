import React, { useState } from 'react';
import { Calendar, Clock, User, Filter, X, ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, CheckCircle, Clock3, XCircle, LogOut, Settings, UserCircle } from 'lucide-react';

// Mock data for demonstration
const initialAppointments = [
  { id: 1, client: 'Sarah Johnson', service: 'Consultation', date: '2025-03-20', time: '10:00', status: 'confirmed' },
  { id: 2, client: 'Mike Chen', service: 'Follow-up', date: '2025-03-20', time: '14:30', status: 'pending' },
  { id: 3, client: 'Emma Davis', service: 'Review', date: '2025-03-21', time: '11:00', status: 'cancelled' },
  { id: 4, client: 'John Smith', service: 'Consultation', date: '2025-03-22', time: '09:00', status: 'confirmed' },
  { id: 5, client: 'Lisa Wong', service: 'Follow-up', date: '2025-03-22', time: '13:00', status: 'confirmed' },
  { id: 6, client: 'David Brown', service: 'Review', date: '2025-03-23', time: '15:30', status: 'pending' },
  { id: 7, client: 'Anna White', service: 'Consultation', date: '2025-03-24', time: '11:30', status: 'confirmed' },
  { id: 8, client: 'James Lee', service: 'Follow-up', date: '2025-03-24', time: '16:00', status: 'cancelled' },
  { id: 9, client: 'Maria Garcia', service: 'Review', date: '2025-03-25', time: '10:00', status: 'confirmed' },
  { id: 10, client: 'Robert Wilson', service: 'Consultation', date: '2025-03-26', time: '14:00', status: 'pending' }
];

const mockUser = {
  name: "Dr. Jane Smith",
  email: "jane.smith@example.com",
  role: "Senior Consultant",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

const KPICard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <Icon className={`${color} w-5 h-5`} />
    </div>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
  </div>
);

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-03-20'));
  const [view, setView] = useState('week');
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedService, setSelectedService] = useState('All Services');
  const [statusFilters, setStatusFilters] = useState({
    Confirmed: true,
    Pending: true,
    Cancelled: true
  });
  const [newAppointment, setNewAppointment] = useState({
    client: '',
    service: 'Consultation',
    date: '',
    time: '',
    status: 'pending'
  });

  const moveWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  const formatDateRange = () => {
    const start = new Date(selectedDate);
    const end = new Date(selectedDate);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}-${end.getDate()}, ${end.getFullYear()}`;
  };

  const handleNewAppointment = (e) => {
    e.preventDefault();
    const id = Math.max(...appointments.map(a => a.id)) + 1;
    const appointment = { ...newAppointment, id };
    setAppointments([...appointments, appointment]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      client: '',
      service: 'Consultation',
      date: '',
      time: '',
      status: 'pending'
    });
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const filteredAppointments = appointments.filter(apt => {
    const serviceMatch = selectedService === 'All Services' || apt.service === selectedService;
    const statusMatch = statusFilters[apt.status.charAt(0).toUpperCase() + apt.status.slice(1)];
    return serviceMatch && statusMatch;
  });

  const handleLogout = () => {
    // Add logout logic here
    alert('Logout clicked - Add your logout logic here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-teal-600" />
              <h1 className="text-xl font-semibold text-gray-800">AppointFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowNewAppointmentModal(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Appointment</span>
              </button>
              <div className="relative">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img 
                    src={mockUser.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                      <p className="text-xs text-gray-500">{mockUser.email}</p>
                    </div>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <UserCircle className="w-4 h-4 mr-2" />
                      Your Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard 
            title="Total Appointments" 
            value={appointments.length} 
            icon={CalendarIcon}
            color="text-teal-600"
          />
          <KPICard 
            title="Upcoming" 
            value={appointments.filter(a => a.status === 'pending').length} 
            icon={Clock3}
            color="text-blue-600"
          />
          <KPICard 
            title="Completed" 
            value={appointments.filter(a => a.status === 'confirmed').length} 
            icon={CheckCircle}
            color="text-green-600"
          />
        </div>

        {/* Calendar Section */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
                  <div className="flex rounded-lg border border-gray-200 p-1">
                    <button 
                      className={`flex-1 px-3 py-1.5 text-sm rounded-md ${view === 'week' ? 'bg-teal-600 text-white' : 'text-gray-600'}`}
                      onClick={() => setView('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`flex-1 px-3 py-1.5 text-sm rounded-md ${view === 'month' ? 'bg-teal-600 text-white' : 'text-gray-600'}`}
                      onClick={() => setView('month')}
                    >
                      Month
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select 
                    className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option>All Services</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="space-y-2">
                    {['Confirmed', 'Pending', 'Cancelled'].map((status) => (
                      <label key={status} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-teal-600"
                          checked={statusFilters[status]}
                          onChange={() => handleStatusFilterChange(status)}
                        />
                        <span className="ml-2 text-sm text-gray-600">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <button 
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => moveWeek(-1)}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">{formatDateRange()}</h2>
                <button 
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => moveWeek(1)}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <button 
                onClick={() => setSelectedDate(new Date('2025-03-20'))}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Today
              </button>
            </div>

            {/* Week View Grid */}
            <div className="grid grid-cols-7 gap-4">
              {/* Time Labels */}
              <div className="col-span-7 grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="py-2">{day}</div>
                ))}
              </div>

              {/* Appointment Slots */}
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const currentDate = new Date(selectedDate);
                currentDate.setDate(currentDate.getDate() + dayIndex);
                const dateStr = currentDate.toISOString().split('T')[0];
                
                return (
                  <div 
                    key={dayIndex}
                    className="bg-gray-50 rounded-lg p-2 min-h-[200px] relative hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm text-gray-400 mb-2">{currentDate.getDate()}</div>
                    {filteredAppointments
                      .filter(apt => apt.date === dateStr)
                      .map(apt => (
                        <div 
                          key={apt.id}
                          className={`
                            p-2 rounded-md mb-2 text-sm cursor-pointer hover:opacity-90 transition-opacity
                            ${apt.status === 'confirmed' ? 'bg-teal-100 text-teal-800' :
                              apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}
                          `}
                        >
                          <div className="font-medium">{apt.time}</div>
                          <div className="truncate">{apt.client}</div>
                          <div className="text-xs truncate">{apt.service}</div>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Appointment</h2>
              <button 
                onClick={() => setShowNewAppointmentModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleNewAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-200 p-2"
                  value={newAppointment.client}
                  onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select 
                  className="w-full rounded-lg border border-gray-200 p-2"
                  value={newAppointment.service}
                  onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                >
                  <option>Consultation</option>
                  <option>Follow-up</option>
                  <option>Review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  className="w-full rounded-lg border border-gray-200 p-2"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  required
                  className="w-full rounded-lg border border-gray-200 p-2"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;