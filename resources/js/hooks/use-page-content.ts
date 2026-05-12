import { usePage } from '@inertiajs/react';

type ContentEntry = { value: string | null; is_rich: boolean };
type PageContentsMap = Record<string, ContentEntry>;

export function usePageContent(
    section: string,
    key: string,
    fallback: string = '',
): string {
    const page = usePage<{ pageContents?: PageContentsMap }>();
    const map = page.props.pageContents ?? {};
    const entry = map[`${section}.${key}`];
    if (!entry || entry.value == null || entry.value === '') {
        return fallback;
    }
    return entry.value;
}

export function usePageContentRich(
    section: string,
    key: string,
): { value: string | null; is_rich: boolean } | null {
    const page = usePage<{ pageContents?: PageContentsMap }>();
    const map = page.props.pageContents ?? {};
    return map[`${section}.${key}`] ?? null;
}
