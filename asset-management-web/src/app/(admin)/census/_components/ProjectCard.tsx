import { Project } from "./mockdata";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-sm transition">
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{project.title}</h3>

          {/* TAGS */}
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
              {project.status}
            </span>

            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {project.tag}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-xs text-gray-500 mt-2">
            Эцсийн хугацаа: {project.endDate} · Хүлээгдэж буй: {project.pending}{" "}
            · Зөрүү: {project.error} · Үүсгэсэн: {project.createdBy}
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <p className="font-semibold text-gray-900">{project.progress}%</p>

          <button className="text-gray-400 hover:text-gray-600 mt-1">
            •••
          </button>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: `${project.progress}%` }}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-end mt-4">
        <button className="text-sm border px-3 py-1 rounded-md hover:bg-gray-50">
          Скан хийх
        </button>
      </div>
    </div>
  );
}
