import { FaPlus, FaTable, FaUserGraduate, FaBook } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useContext } from "react";
import { StudentsListContext } from "../contexts/StudentContext";
import { useCourses } from "../contexts/CourseContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { studentsList, loading, error } = useContext(StudentsListContext);
  const { courses } = useCourses();

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <div className="empty-state">
          <div className="loading-content">
            <AiOutlineLoading3Quarters className="spinner" />
            <p>Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Students",
      value: studentsList.length,
      icon: <FaUserGraduate />,
      color: "var(--primary)",
    },
    {
      label: "Average GPA",
      value: studentsList.length
        ? (
          studentsList.reduce((acc, s) => acc + parseFloat(s.gpa), 0) /
          studentsList.length
        ).toFixed(2)
        : "0.00",
      icon: <FaTable />,
      color: "var(--secondary)",
    },
    {
      label: "Courses Available",
      value: courses.length,
      icon: <FaBook />,
      color: "var(--accent)",
    },
  ];

  // Prepare chart data
  const gpaData = [
    { range: '0-1', count: studentsList.filter(s => s.gpa < 1).length },
    { range: '1-2', count: studentsList.filter(s => s.gpa >= 1 && s.gpa < 2).length },
    { range: '2-3', count: studentsList.filter(s => s.gpa >= 2 && s.gpa < 3).length },
    { range: '3-4', count: studentsList.filter(s => s.gpa >= 3).length },
  ];

  const genderData = [
    { name: 'Male', value: studentsList.filter(s => s.gender?.toLowerCase() === 'male').length },
    { name: 'Female', value: studentsList.filter(s => s.gender?.toLowerCase() === 'female').length },
    { name: 'Other', value: studentsList.filter(s => !['male', 'female'].includes(s.gender?.toLowerCase())).length },
  ].filter(d => d.value > 0);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
        <h2 className="dashboard-title" style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h2>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
              className="stat-icon"
              style={{
                backgroundColor: stat.color + "15",
                color: stat.color,
                borderRadius: '1rem',
                fontSize: '1.25rem'
              }}
            >
              {stat.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value" style={{ fontSize: '1.75rem' }}>{stat.value}</h3>
            </div>
            {/* Subtle background decoration */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: stat.color + '05',
              zIndex: 0
            }}></div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '2rem'
      }}>
        <div className="card chart-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>GPA Distribution</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Student performance across all departments</p>
          </div>
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gpaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="range"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: 'var(--primary-light)', opacity: 0.4 }}
                  contentStyle={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Gender Diversity</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Student body composition breakdown</p>
          </div>
          <div style={{ flex: 1, minHeight: '300px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-lg)'
          }}>
            {genderData.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{d.name}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
