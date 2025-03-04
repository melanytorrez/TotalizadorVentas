
const {
    ingresarCantidad,
    ingresarPrecio,
    calcularPrecioNeto,
    obtenerImpuesto,
    obtenerDescuento,
    calcularTotalFinal
} = require('./totalizador');

// Tests para ingresarCantidad
test('Cantidad válida retorna mismo valor', () => {
    expect(ingresarCantidad(5)).toBe(5);
});

test('Cantidad inválida lanza error', () => {
    expect(() => ingresarCantidad(-2)).toThrow();
    expect(() => ingresarCantidad(3.5)).toThrow();
    expect(() => ingresarCantidad(0)).toThrow();
    expect(() => ingresarCantidad("texto")).toThrow();
});

// Tests para ingresarPrecio
test('Precio válido retorna mismo valor', () => {
    expect(ingresarPrecio(10.5)).toBe(10.5);
    expect(ingresarPrecio(1)).toBe(1);
});

test('Precio inválido lanza error', () => {
    expect(() => ingresarPrecio(-10)).toThrow();
    expect(() => ingresarPrecio("texto")).toThrow();
    expect(() => ingresarPrecio(NaN)).toThrow();
});

// Tests para calcularPrecioNeto
test('Calcula correctamente precio neto', () => {
    expect(calcularPrecioNeto(3, 10.5)).toBe(31.5);
    expect(calcularPrecioNeto(10, 2)).toBe(20);
});

// Tests para obtenerImpuesto
test('Retorna impuesto correcto para estados válidos', () => {
    expect(obtenerImpuesto('TX')).toBe(6.25);
    expect(obtenerImpuesto('CA')).toBe(8.25);
    expect(obtenerImpuesto('NV')).toBe(8.00);
    expect(obtenerImpuesto('AL')).toBe(4.00);
    expect(obtenerImpuesto('UT')).toBe(6.65);
});

test('Estado inválido lanza error', () => {
    expect(() => obtenerImpuesto('XX')).toThrow();
    expect(() => obtenerImpuesto('NY')).toThrow();
    expect(() => obtenerImpuesto('')).toThrow();
});

// Tests para obtenerDescuento
test('Devuelve el descuento correcto según el precio con impuesto', () => {
    expect(obtenerDescuento(500)).toBe(0);
    expect(obtenerDescuento(1000)).toBe(3);
    expect(obtenerDescuento(3000)).toBe(5);
    expect(obtenerDescuento(7000)).toBe(7);
    expect(obtenerDescuento(10000)).toBe(10);
    expect(obtenerDescuento(30000)).toBe(15);
});

// Tests para calcularTotalFinal
test('Ejemplo del PDF: 20 items, $3, TX', () => {
    const resultado = calcularTotalFinal(20, 3, 'TX');
    expect(resultado).toEqual({
        precioNeto: 60,
        impuesto: "6.25% (+$3.75)",
        precioConImpuesto: 63.75,
        descuento: "0% (-$0.00)",
        total: 63.75
    });
});

test('Caso con descuento e impuesto', () => {
    const resultado = calcularTotalFinal(1000, 10, 'NV');
    expect(resultado).toEqual({
        precioNeto: 10000,
        impuesto: "8% (+$800.00)",
        precioConImpuesto: 10800.00,
        descuento: "10% (-$1080.00)",
        total: 9720.00
    });
});

test('Caso con el mayor descuento (15%)', () => {
    const resultado = calcularTotalFinal(2000, 15, 'CA');
    expect(resultado).toEqual({
        precioNeto: 30000,
        impuesto: "8.25% (+$2475.00)",
        precioConImpuesto: 32475.00,
        descuento: "15% (-$4871.25)",
        total: 27603.75
    });
});
