const months = Array.from({ length: 18 }, (_, i) => {
  const d = new Date(2025, 6 + i, 1);
  return d.toLocaleString("default", { month: "short", year: "2-digit" });
});

export const products = ["P-101 · Lithium Cell Module", "P-102 · Precision Ball Bearing", "P-103 · Injection-Molded Housing", "P-107 · Wiring Harness Assembly"];
export const warehouses = ["All Warehouses", "WH-North", "WH-Central", "WH-East", "WH-South"];

export function buildForecast(productIndex = 0) {
  const base = 2000 + productIndex * 400;
  return months.map((month, i) => {
    const isForecast = i >= 12;
    const seasonal = Math.sin(i / 2.2) * base * 0.18;
    const trend = i * (isForecast ? 22 : 14);
    const value = Math.round(base + seasonal + trend);
    return {
      month,
      historical: isForecast ? null : value,
      predicted: isForecast ? value : (i === 11 ? value : null),
      upper: isForecast ? Math.round(value * 1.14) : null,
      lower: isForecast ? Math.round(value * 0.87) : null,
    };
  });
}
