import { useState, useEffect, useCallback } from 'react';
import { getAllGrievances, searchGrievances } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import SubmitGrievanceForm from '../components/SubmitGrievanceForm';
import GrievanceCard from '../components/GrievanceCard';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Academic', 'Hostel', 'Transport', 'Other'];
const STATUSES = ['All', 'Pending', 'Resolved'];

const Dashboard = () => {
  const { student } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isSearching, setIsSearching] = useState(false);

  const fetchGrievances = useCallback(async () => {
    try {
      const { data } = await getAllGrievances();
      setGrievances(data.grievances);
    } catch (err) {
      toast.error('Failed to load grievances');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrievances();
  }, [fetchGrievances]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setLoading(true);
    try {
      const params = {};
      if (searchTitle.trim()) params.title = searchTitle.trim();
      if (filterCategory !== 'All') params.category = filterCategory;
      if (filterStatus !== 'All') params.status = filterStatus;

      const { data } = await searchGrievances(params);
      setGrievances(data.grievances);
    } catch (err) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTitle('');
    setFilterCategory('All');
    setFilterStatus('All');
    setIsSearching(false);
    fetchGrievances();
  };

  const handleNewGrievance = (newGrievance) => {
    setGrievances((prev) => [newGrievance, ...prev]);
  };

  const handleUpdate = (updatedGrievance) => {
    setGrievances((prev) =>
      prev.map((g) => (g._id === updatedGrievance._id ? updatedGrievance : g))
    );
  };

  const handleDelete = (deletedId) => {
    setGrievances((prev) => prev.filter((g) => g._id !== deletedId));
  };

  const stats = {
    total: grievances.length,
    pending: grievances.filter((g) => g.status === 'Pending').length,
    resolved: grievances.filter((g) => g.status === 'Resolved').length,
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="surface mb-8 overflow-hidden p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="hero-chip mb-4 w-fit">Dashboard</div>
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                Hello, {student?.name?.split(' ')[0]}.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Manage your grievances from one place, keep track of responses, and submit new issues without losing context.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
                <p className="section-title">Total</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
                <p className="section-title">Pending</p>
                <p className="mt-2 text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
                <p className="section-title">Resolved</p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="stat-card md:col-span-1">
            <p className="section-title">At a glance</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">Everything in one place.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Submit a new grievance, search old requests, and update records as they move forward.</p>
          </div>
          <div className="stat-card">
            <p className="section-title">Pending</p>
            <p className="mt-3 text-4xl font-bold text-orange-600">{stats.pending}</p>
            <p className="mt-2 text-sm text-slate-500">Items waiting on review</p>
          </div>
          <div className="stat-card">
            <p className="section-title">Resolved</p>
            <p className="mt-3 text-4xl font-bold text-emerald-600">{stats.resolved}</p>
            <p className="mt-2 text-sm text-slate-500">Closed and completed cases</p>
          </div>
        </div>

        <SubmitGrievanceForm onSubmitted={handleNewGrievance} />

        <div className="surface mb-6 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="section-title">Search</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Find a grievance fast</h2>
            </div>
            {isSearching && (
              <button type="button" onClick={handleClearSearch} className="btn-secondary whitespace-nowrap">
                Clear filters
              </button>
            )}
          </div>
          <form onSubmit={handleSearch} className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="input-field"
              placeholder="Search by title..."
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button type="submit" className="btn-primary whitespace-nowrap">
              Search
            </button>
          </form>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="section-title">Grievances</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {isSearching ? 'Search Results' : 'My Grievances'}
              </h2>
            </div>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              {grievances.length} items
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-slate-900"></div>
            </div>
          ) : grievances.length === 0 ? (
            <div className="surface py-16 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-semibold text-slate-600">
                {isSearching ? 'No grievances match your search' : 'No grievances yet'}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {!isSearching && 'Click "Submit New Grievance" to get started'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {grievances.map((g) => (
                <GrievanceCard
                  key={g._id}
                  grievance={g}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
