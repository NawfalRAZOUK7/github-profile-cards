export function escapeText(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}
export function formatNumber(n) {
    return n.toLocaleString('en-US');
}
//# sourceMappingURL=types.js.map