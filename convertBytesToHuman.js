/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
    if (typeof bytes !== "number" || bytes < 0 || bytes % 1 !== 0) return false;
    if (bytes === 0) return "0 B";

    const values = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    const ans = bytes / Math.pow(1024, e);

    return Number.isInteger(ans) ? ans + " " + values[e] : ans.toFixed(2) + " " + values[e];
}
