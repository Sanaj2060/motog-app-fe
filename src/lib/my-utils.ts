export function toOrdinal(num: string | number): string {
    const n = typeof num === "number" ? num : parseInt(num);
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    const suffix =
        suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    return suffix;
}