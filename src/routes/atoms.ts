import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: String(localStorage.getItem("theme")) || "light",
});

export const priceInfo = atom({
  key: "price",
  default: [] as any,
});

export interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
