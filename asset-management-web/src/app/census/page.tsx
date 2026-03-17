'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import StatCard from './_components/Statcard';
import ProjectCard from './_components/ProjectCard';
import CreateModal from './_components/CreateModal';
import { mockData, Project } from './_components/mockdata';

export default function Page() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockData.projects);

  const handleCreate = (data: any) => {
    const newProject: Project = {
      id: Date.now(),
      title: data.name,
      status: 'Идэвхтэй',
      tag: data.type || 'All',
      progress: 0,
      pending: 0,
      error: 0,
      createdBy: 'Та',
      endDate: data.endDate
    };

    setProjects([newProject, ...projects]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Тооллого</h1>
        </div>

        <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2">
          <Plus size={18} />
          Тооллого үүсгэх
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {mockData.stats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      {/* PROJECTS */}
      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* MODAL */}
      {open && <CreateModal onClose={() => setOpen(false)} onCreate={handleCreate} />}
    </div>
  );
}