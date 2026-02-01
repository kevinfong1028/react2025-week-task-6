export const toasting = () => {};

export const thousandNum = (n) => {
    const num = Number(n);
    if (isNaN(num)) return 0;
    return num.toLocaleString("zh-TW", {
        Style: "currency",
        currency: "TWD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
};
