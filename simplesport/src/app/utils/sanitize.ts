function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function sanitizeText(text: string): string {
    let tmpText = text.replace(/<[^>]*>?/gm, '');
    return toTitleCase(tmpText.replace("_", " "));
}