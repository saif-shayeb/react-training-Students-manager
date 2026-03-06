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
      <div className="dashboard-header" style={{ marginBottom: '1rem' }}>
        <h2 className="dashboard-title" style={{ marginBottom: '0.125rem' }}>Dashboard Overview</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Overview of system metrics</p>
      </div>

      <div className="grid-base grid-stats" style={{ marginBottom: '1.25rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card glass stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
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

      <div className="grid-base grid-charts" style={{ flex: 1, minHeight: 0 }}>
        <div className="card glass chart-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.125rem' }}>GPA Distribution</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student performance</p>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
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

        <div className="card glass chart-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.125rem' }}>Gender Diversity</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Composition breakdown</p>
          </div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center' }}>
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
            gap: '1rem',
            marginTop: '0.75rem',
            padding: '0.5rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-lg)'
          }}>
            {genderData.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
