import { BarChart3, Bot, CircleDollarSign, LayoutDashboard, Map, Store, UsersRound } from "lucide-react";

export const navigation = [
  { id: "overview", label: "Tổng quan điều hành", icon: LayoutDashboard },
  { id: "area", label: "Hiệu quả khu vực", icon: Map },
  { id: "branches", label: "Hiệu suất chi nhánh", icon: Store },
  { id: "cost", label: "Chi phí & dự báo", icon: CircleDollarSign },
  { id: "customers", label: "Khách hàng & dịch vụ", icon: UsersRound },
  { id: "chatbot", label: "Chatbot phân tích", icon: Bot },
];

export const pageMeta = {
  overview: { shortLabel: "Tổng quan", icon: BarChart3 },
  area: { shortLabel: "Khu vực", icon: Map },
  branches: { shortLabel: "Chi nhánh", icon: Store },
  cost: { shortLabel: "Dự báo", icon: CircleDollarSign },
  customers: { shortLabel: "Dịch vụ", icon: UsersRound },
  chatbot: { shortLabel: "Chatbot", icon: Bot },
};
