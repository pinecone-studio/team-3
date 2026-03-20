type mockStateProps  = {
  totalAssetCount: number | null | undefined,
  totalAssigmentCount: number | null | undefined,
  totalCensusTask: number | null | undefined
}

export const mockStats = ({
  totalAssetCount,
  totalAssigmentCount,
  totalCensusTask
}: mockStateProps) => [
  {
    label: "Миний хөрөнгө",
    value: totalAssetCount, 
    sublabel: "Хуваарилагдсан төхөөрөмж",
    iconBg: "#EBF3FD",
    type: "cube",
  },
  {
    label: "Гарын үсэг баталгаажуулалт",
    value: totalAssigmentCount,
    sublabel: "Хүлээгдэж буй гарын үсэг",
    iconBg: "#EAF3DE",
    type: "doc",
  },
  {
    label: "QR баталгаажуулалт",
    value: totalCensusTask,
    sublabel: "Баталгаажуулах шаардлагатай",
    iconBg: "#FEF3C7",
    type: "qr",
  },
  {
    label: "Асуудал",
    value: 0,
    sublabel: "Идэвхтэй мэдэгдэл",
    iconBg: "#FEE2E2",
    type: "warning",
  },
];

export const mockDevices = [
  {
    name: 'MacBook Pro 14"',
    model: "MAC-2026-005",
    code: "Захиалган компьютер",
    status: "Хуваарилагдсан",
    type: "laptop",
  },
  {
    name: 'Dell UltraSharp 27"',
    model: "MON-2026-021",
    code: "Монитор",
    status: "Хуваарилагдсан",
    type: "monitor",
  },
  {
    name: "iPhone 14 Pro",
    model: "PHN-2026-014",
    code: "Гар утас",
    status: "Хуваарилагдсан",
    type: "phone",
  },
];

export const mockProgress = {
  label: "Тооллогын баталгаажуулалт",
  sublabel: "2026 оны 1-р улирлын тооллогоо",
  value: 50,
  text: "2 / 4 хэрэглэх",
};

export const mockHistory = [
  {
    device: 'MacBook Air 13"',
    code: "MAC-2024-012",
    period: "2024.03.01 → 2026.01.14",
    usage: "1 жил 10 сар",
    status: "Шинэчлэлт",
    type: "laptop",
  },
  {
    device: 'MacBook Air 13"',
    code: "MAC-2024-013",
    period: "2023.06.01 → 2025.06.01",
    usage: "2 жил 0 сар",
    status: "Шинэчлэлт",
    type: "laptop",
  },
  {
    device: "iPhone 13 Pro",
    code: "PHN-2023-007",
    period: "2023.01.15 → 2025.01.15",
    usage: "2 жил 0 сар",
    status: "Буцаасан",
    type: "phone",
  },
];

export interface GarItem {
  name: string;
  code: string;
  description: string;
  location: string;
  date: string;
  owner: string;
  type: string;
}

export const mockGarItems: GarItem[] = [
  {
    name: "Magic Keyboard",
    code: "PER-2026-008 - FVFXX0IGSYK",
    description: "Touch ID, Numeric Keypad",
    location: "Шинэ",
    date: "2026.03.08",
    owner: "Бат-Эрдэнэ А.",
    type: "keyboard",
  },
  {
    name: "Magic Mouse",
    code: "PER-2026-009 - MM3XYLZW19V",
    description: "Multi-Touch Surface, Space Gray",
    location: "Шинэ",
    date: "2026.03.08",
    owner: "Бат-Эрдэнэ А.",
    type: "keyboard",
  },
  {
    name: 'MacBook Pro 14"',
    code: "MAC-2026-005 - XK9PLMW2TYQ",
    description: "M3 Pro, 18GB RAM, 512GB SSD",
    location: "Шинэ",
    date: "2026.03.10",
    owner: "Дорж Б.",
    type: "laptop",
  },
];

export interface QrItem {
  name: string;
  code: string;
  description: string;
  location: string;
  date: string;
  owner: string;
  type: string;
}

export const mockQrItems: QrItem[] = [
  {
    name: "Magic Keyboard",
    code: "PER-2026-008 - FVFXX0IGSYK",
    description: "Touch ID, Numeric Keypad",
    location: "Шинэ",
    date: "2026.03.08",
    owner: "Бат-Эрдэнэ А.",
    type: "keyboard",
  },
  {
    name: "iPhone 14 Pro",
    code: "PHN-2026-014 - GH7KL9MNPQR",
    description: "256GB, Space Black",
    location: "Шинэ",
    date: "2026.03.08",
    owner: "Бат-Эрдэнэ А.",
    type: "phone",
  },
  {
    name: 'MacBook Pro 14"',
    code: "MAC-2026-005 - XK9PLMW2TYQ",
    description: "M3 Pro, 18GB RAM, 512GB SSD",
    location: "Шинэ",
    date: "2026.03.10",
    owner: "Дорж Б.",
    type: "laptop",
  },
  {
    name: 'Dell UltraSharp 27"',
    code: "MON-2026-021 - DU27QHD9VBZ",
    description: "4K UHD, USB-C Hub",
    location: "Шинэ",
    date: "2026.03.10",
    owner: "Дорж Б.",
    type: "monitor",
  },
];
