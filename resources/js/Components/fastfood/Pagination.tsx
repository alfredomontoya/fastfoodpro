import { Link } from '@inertiajs/react';
import type { PaginationLink } from '@/types/catalog';

interface PaginationProps {
    links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
                <Link
                    key={`${link.label}-${link.url}`}
                    href={link.url ?? '#'}
                    preserveScroll
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                        link.active
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600'
                    } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
