'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import StatCard from '@/app/census/_components/Statcard';
import ProjectCard from '@/app/census/_components/ProjectCard';
import CreateModal from '@/app/census/_components/CreateModal';
import { mockData } from '@/app/census/_components/mockdata';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
     
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Тооллого</h1>
          <p className="text-sm text-gray-500">
            Хөрөнгийн баталгаажуулалт, аудитын менежмент
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2"
        >
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
        {mockData.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* MODAL */}
      {open && <CreateModal onClose={() => setOpen(false)} />}
    </div>
  );
}