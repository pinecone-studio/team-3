export type PendingAsset = {
  id: string
  name: string
  code: string
  serial: string
  description: string
  condition: string
  assignedDate: string
  assignedBy: string
}

export type ConfirmedAsset = {
  id: string
  name: string
  code: string
  date: string
}

export const pendingAssets: PendingAsset[] = [
  {
    id: "1",
    name: "Magic Keyboard",
    code: "PER-2026-008",
    serial: "FVFXXXQ1G5YK",
    description: "Touch ID, Numeric Keypad",
    condition: "Шинэ",
    assignedDate: "2026.03.08",
    assignedBy: "Бат-Эрдэнэ А."
  }
]

export const confirmedAssets: ConfirmedAsset[] = [
  {
    id: "1",
    name: "MacBook Pro 14”",
    code: "MAC-2026-005",
    date: "2026.01.15"
  },
  {
    id: "2",
    name: "Dell UltraSharp 27”",
    code: "MON-2026-012",
    date: "2026.01.15"
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    code: "PHN-2026-003",
    date: "2026.02.01"
  }
]