export const colors = {
  primary: "#5D7CF4",
  primaryDark: "#425FE0",
  softBlue: "#8EA2FF",
  purple: "#8E55CF",
  pink: "#F05A9D",
  softPink: "#F7A7C9",
  success: "#4EBE91",
  warning: "#F5B84B",
  danger: "#F05A7A",
  text: "#17151F",
  textSecondary: "#6E7280",
  muted: "#A1A6B5",
  border: "#E5E8F3",
  card: "#FFFFFF",
};

export const areaColors = {
  "Nội thành": colors.primary,
  "Ngoại thành": colors.pink,
};

export const serviceColors = {
  Tốt: colors.success,
  Khá: colors.warning,
  "Trung bình": colors.pink,
};

export const statusColors = {
  "Vượt trung bình": colors.success,
  "Dưới trung bình": colors.pink,
};

export const tooltipStyle = {
  contentStyle: {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 14,
    boxShadow: "0 18px 45px rgba(37, 50, 107, 0.16)",
    color: colors.text,
    fontSize: 13,
  },
  labelStyle: {
    color: colors.text,
    fontWeight: 700,
    marginBottom: 4,
  },
};
