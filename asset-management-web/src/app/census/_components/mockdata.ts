export type StatType = "active" | "success" | "warning" | "pending";

export interface Stat {
  label: string;
  value: number;
  subtext: string;
  type: StatType;
}

export interface Project {
  id: string | number;
  title: string;
  status: "Идэвхтэй" | "Дууссан";
  tag: string;
  progress: number;
  pending: number;
  error: number;
  createdBy: string;
  endDate: string;
}

export interface MockData {
  stats: Stat[];
  projects: Project[];
}

export const mockData: MockData = {
  stats: [
    {
      label: "Идэвхтэй тооллого",
      value: 2,
      subtext: "Одоо явагдаж байгаа",
      type: "active",
    },
    {
      label: "Баталгаажсан",
      value: 83,
      subtext: "65% гүйцэтгэл",
      type: "success",
    },
    {
      label: "Зөрүү",
      value: 5,
      subtext: "Анхаарах шаардлагатай",
      type: "warning",
    },
    {
      label: "Хүлээгдэж буй",
      value: 45,
      subtext: "Баталгаажих хүлээлттэй",
      type: "pending",
    },
  ],

  projects: [
    {
      id: 1,
      title: "2026 1-р улирлын бүрэн тооллого",
      status: "Идэвхтэй",
      tag: "All",
      progress: 65,
      pending: 45,
      error: 3,
      createdBy: "Бат-Эрдэнэ А.",
      endDate: "2026.03.15",
    },
    {
      id: 2,
      title: "Инженерийн хэлтсийн аудит",
      status: "Идэвхтэй",
      tag: "Engineering",
      progress: 71,
      pending: 13,
      error: 2,
      createdBy: "Оюунболд Д.",
      endDate: "2026.03.12",
    },
    {
      id: 3,
      title: "2025 оны жилийн эцсийн тооллого",
      status: "Дууссан",
      tag: "All",
      progress: 100,
      pending: 0,
      error: 0,
      createdBy: "Бат-Эрдэнэ А.",
      endDate: "2025.12.20",
    },
  ],
};
