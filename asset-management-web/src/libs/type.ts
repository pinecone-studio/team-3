export type AssetStatus = "Хуваарилагдсан" | "Засвартай" | "Ашиглалтад ороогүй";

export type AssetLimitType = {
  name: string;
  serial: string;
  type: string;
  status: AssetStatus;
  condition: string;
  date: string;
};
