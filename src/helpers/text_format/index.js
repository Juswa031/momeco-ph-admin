export function toCurrency(value = 0, symbol = '', decimal = 2) {
    return symbol + ' ' + Number(value).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
