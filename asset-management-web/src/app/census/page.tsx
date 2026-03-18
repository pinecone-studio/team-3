"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import StatCard from "./_components/Statcard";
import ProjectCard from "./_components/ProjectCard";
import CreateModal from "./_components/CreateModal";
import { mockData, Project } from "./_components/mockdata";
// Ensure these types and hooks match your generated file paths
import {
  useCreateCensusEventMutation,
  CreateCensusEventInput,
} from "@/gql/graphql";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockData.projects);

  // 1. Correct hook usage: [mutateFunction, { loading, error, data }]
  const [createCensusEvent, { loading, error }] =
    useCreateCensusEventMutation();

  const handleCreate = async (formData: any) => {
    try {
      // 2. Prepare the input based on your CreateCensusEventInput type
      const input: CreateCensusEventInput = {
        name: formData.name,
        scope: formData.type || "General",
        createdBy: "CiFEKJf2HK6qDJiLwObjy", // Replace with actual user context/ID
        startedAt: new Date().toISOString(),
        closedAt: formData.closedAt,
        // scopeFilter and closedAt are optional per your type definition
      };

      // 3. Execute the mutation
      const result = await createCensusEvent({
        variables: {
          input: input,
        },
      });

      // 4. Update UI only if request succeeded
      if (result.data?.createCensusEvent) {
        const newProject: Project = {
          id: Date.now(), // Or use result.data.createCensusEvent.id if available
          title: formData.name,
          status: "Идэвхтэй",
          tag: formData.type || "All",
          progress: 0,
          pending: 0,
          error: 0,
          createdBy: "Та",
          endDate: formData.endDate,
        };

        setProjects([newProject, ...projects]);
        setOpen(false);
      }
    } catch (err) {
      // Handle network or GraphQL errors
      console.error("Mutation failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Тооллого</h1>
          {error && (
            <p className="text-red-500 text-sm">Алдаа: {error.message}</p>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg flex gap-2 items-center transition-colors"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Plus size={18} />
          )}
          Тооллого үүсгэх
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
      {open && (
        <CreateModal
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          // You might want to pass 'loading' to the modal to show a spinner on its internal button
        />
      )}
    </div>
  );
}
