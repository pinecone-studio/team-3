

export const mockStats = [
  { 
    label: 'Миний хөрөнгө', 
    value: 4,
    sublabel: 'Хуваарилагдсан төхөөрөмж',
    icon: '🔍'
  },
  { 
    label: 'Гарын үсэг баталгаажуулалт', 
    value: 1,
    sublabel: 'Хүлээгдэж буй гарын үсэг',
    icon: '✍️'
  },
  { 
    label: 'QR баталгаажуулалт', 
    value: 2,
    sublabel: 'Баталгаажуулах шаардлагатай',
    icon: '📱'
  },
  { 
    label: 'Асуудал', 
    value: 0,
    sublabel: 'Идэвхтэй мэдэгдэл',
    icon: '⚠️'
  },
];

export const mockDevices = [
  { 
    name: 'MacBook Pro 14"', 
    model: 'MAC-2020-010',
    code: 'Захиалган компьютер',
    status: 'Худалдаагаасан'
  },
  { 
    name: 'Dell UltraSharp 27"', 
    model: 'MON-2020-012',
    code: 'Монитор',
    status: 'Худалдаагаасан'
  },
  { 
    name: 'iPhone 15 Pro', 
    model: 'PHN-2020-003',
    code: 'Гар утас',
    status: 'Худалдаагаасан'
  },
];

export const mockProgress = {
  label: 'Тооцоогон баталгаажуулалт',
  sublabel: '2026 оны 1-р улиралд төөлөөгөө',
  value: 50,
  text: '2 / 4 хэрэглэх',
};

export const mockHistory = [
  {
    device: 'MacBook Air 13"',
    code: 'MAC-2024-012',
    period: '2024.03.01 ÷ 2024.01.14',
    usage: '1 жил 10 сар',
    status: 'Шалгагдсан',
  },
  {
    device: 'MacBook Air 13"',
    code: 'MAC-2024-012',
    period: '2024.03.01 ÷ 2024.01.14',
    usage: '1 жил 10 сар',
    status: 'Шалгагдсан',
  },
  {
    device: 'MacBook Air 13"',
    code: 'MAC-2024-012',
    period: '2024.03.01 ÷ 2024.01.14',
    usage: '1 жил 10 сар',
    status: 'Шалгагдсан',
  },
];
export interface QrItem {
  name: string
  code: string
  description: string
  location: string
  date: string
  owner: string
}
    export interface Progress {
  label: string;
  sublabel: string;
  value: number;
  text: string;
}
export const mockQrItems: QrItem[] = [
  {
    name: "Magic Keyboard",
    code: "PER-2020-008 - FVFXX0IGSYK",
    description: "Touch ID, Numeric Keypad",
    location: "Шагг",
    date: "2026.03.08",
    owner: "Бот-Эрдэнэ А.",
  },
  {
    name: "Magic Keyboard",
    code: "PER-2020-008 - FVFXX0IGSYK",
    description: "Touch ID, Numeric Keypad",
    location: "Шагг",
    date: "2026.03.08",
    owner: "Бот-Эрдэнэ А.",
  },
]