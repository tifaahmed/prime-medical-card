import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, CardIcon } from './icons';

export default function CardLookupModal({ onClose }: { onClose: () => void }) {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        inputRef.current?.focus();

        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const formatted = formatCardNumber(value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const digits = value.replace(/\D/g, '');

        if (digits.length < 8) {
            setError('من فضلك أدخل رقم كارت صحيح');
            return;
        }

        setError(null);
        onClose();
        router.visit(`/card/${digits}`);
    };

    return (
        <div
            className="card-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-modal-title"
            onClick={onClose}
        >
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="card-modal-close"
                    onClick={onClose}
                    aria-label="إغلاق"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                    </svg>
                </button>

                <div className="card-modal-icon">
                    <CardIcon />
                </div>

                <h2 id="card-modal-title" className="card-modal-title">
                    تحقق من رقم الكارت
                </h2>
                <p className="card-modal-subtitle">
                    أدخل رقم كارت العضوية للتأكد من صلاحيته والاستفادة من
                    المميزات
                </p>

                <form onSubmit={handleSubmit} className="card-modal-form">
                    <label className="card-modal-label" htmlFor="card-number">
                        رقم الكارت
                    </label>
                    <div className="card-modal-input-wrap">
                        <input
                            id="card-number"
                            ref={inputRef}
                            type="text"
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="0000 0000 0000"
                            value={formatted}
                            onChange={(e) => {
                                setError(null);
                                setValue(e.target.value);
                            }}
                            className="card-modal-input"
                            dir="ltr"
                        />
                        <CardIcon className="card-modal-input-icon" />
                    </div>
                    {error && (
                        <p className="card-modal-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="card-modal-actions">
                        <button
                            type="button"
                            className="btn btn-ghost card-modal-cancel"
                            onClick={onClose}
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary card-modal-submit"
                        >
                            تأكيد
                            <ArrowLeftIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function formatCardNumber(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 16);

    return digits.replace(/(.{4})/g, '$1 ').trim();
}
