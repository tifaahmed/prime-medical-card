import { useSiteSettings } from '@/hooks/use-site-settings';

export default function AnnounceBar() {
    const s = useSiteSettings();

    if (!s.announce_enabled) {
        return null;
    }

    const hasContent =
        (s.announce_lead && s.announce_lead.trim()) ||
        (s.announce_body && s.announce_body.trim()) ||
        (s.announce_tail && s.announce_tail.trim());

    if (!hasContent) {
        return null;
    }

    return (
        <div className="announce">
            {s.announce_lead && <strong>{s.announce_lead}</strong>}
            {s.announce_lead && s.announce_body && <span> — </span>}
            {s.announce_body && <span>{s.announce_body}</span>}
            {s.announce_tail && (
                <>
                    <span className="dot"></span>
                    {s.announce_tail}
                </>
            )}
        </div>
    );
}
