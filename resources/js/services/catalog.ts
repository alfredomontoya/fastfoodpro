export function formatCurrency(value: number | string): string {
    const amount = typeof value === 'string' ? Number.parseFloat(value) : value;

    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(Number.isNaN(amount) ? 0 : amount);
}

export function categoryGradient(name: string): string {
    const gradients = [
        'from-amber-300 via-orange-300 to-red-400',
        'from-lime-300 via-emerald-300 to-teal-400',
        'from-sky-300 via-cyan-300 to-blue-400',
        'from-fuchsia-300 via-pink-300 to-rose-400',
    ];

    const index = name.length % gradients.length;

    return gradients[index];
}
