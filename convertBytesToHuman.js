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

    if (bytes < 1024) return bytes + " B";

    const inBytes = {
        TB: 1099511627776,
        GB: 1073741824,
        MB: 1048576,
        KB: 1024,
    };

    for (let key in inBytes) {
        if (bytes === inBytes[key]) {
            return bytes / inBytes[key] + ` ${key}`;
        } else if (bytes >= inBytes[key]) {
            return (bytes / inBytes[key]).toFixed(2) + ` ${key}`;
        }
    }
}
