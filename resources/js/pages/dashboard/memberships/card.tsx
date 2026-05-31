import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import {
    ArrowRightIcon,
    FileDownIcon,
    ImageDownIcon,
    Loader2Icon,
    MoveIcon,
    RotateCcwIcon,
    SaveIcon,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type FormEvent,
} from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import ImagePicker from '@/pages/dashboard/_components/image-picker';
import {
    CardFrontPreview,
    IMAGE_KEYS,
    LABELS,
    TEXT_KEYS,
    type CardLayout,
    type ImageLayout,
    type LayoutKey,
    type TextLayout,
} from '@/components/card-preview';
import { dashboard } from '@/routes';

interface CardMembership {
    id: number;
    membership_number: string;
    expiration_date: string | null;
    job_title_en: string | null;
    job_title_ar: string | null;
    company_name: string | null;
    card_first_name: string | null;
    card_full_name: string | null;
    card_membership_number: string | null;
    photo_url: string | null;
    holder_name: string | null;
    first_name: string | null;
    second_name: string | null;
    third_name: string | null;
    fourth_name: string | null;
    card_layout: CardLayout;
    card_template_id: number | null;
}

interface CardTemplateOption {
    id: number;
    name: string;
    is_default: boolean;
    front_empty_url: string | null;
    front_example_url: string | null;
    back_url: string | null;
    layout: CardLayout;
}

const FALLBACK_FRONT_EMPTY = '/images/card/front-empty.jpeg';
const FALLBACK_FRONT_EXAMPLE = '/images/card/front-example.jpeg';
const FALLBACK_BACK = '/images/card/back.jpeg';

function mergeLayout(
    base: CardLayout,
    override: Partial<CardLayout>,
): CardLayout {
    const result = { ...base };
    for (const key of Object.keys(result) as LayoutKey[]) {
        if (override[key]) {
            result[key] = { ...result[key], ...override[key] } as any;
        }
    }
    return result;
}

export default function MembershipCard({
    membership,
    default_card_layout,
    cardTemplates = [],
}: {
    membership: CardMembership;
    default_card_layout: CardLayout;
    cardTemplates?: CardTemplateOption[];
}) {
    const { appUrl } = usePage<{ appUrl: string }>().props;
    const cardUrl = `${appUrl?.replace(/\/$/, '') ?? ''}/card/${membership.membership_number}`;

    const restOfName = [
        membership.second_name,
        membership.third_name,
        membership.fourth_name,
    ]
        .filter(Boolean)
        .join(' ');

    const defaultTemplate = cardTemplates.find((t) => t.is_default);
    const initialTemplateId =
        membership.card_template_id ?? defaultTemplate?.id ?? '';

    const initialTemplate = cardTemplates.find(
        (t) => t.id === Number(initialTemplateId),
    );

    const { data, setData, post, processing, errors } = useForm({
        card_first_name:
            membership.card_first_name ?? membership.first_name ?? '',
        card_full_name: membership.card_full_name ?? restOfName,
        card_membership_number:
            membership.card_membership_number ?? membership.membership_number ?? '',
        job_title_en: membership.job_title_en ?? '',
        company_name: membership.company_name ?? '',
        expiration_date: membership.expiration_date ?? '',
        photo: null as File | null,
        photo_remove: false,
        card_layout:
            membership.card_layout ??
            (initialTemplate?.layout
                ? mergeLayout(default_card_layout, initialTemplate.layout)
                : default_card_layout),
        card_template_id: initialTemplateId,
        _method: 'POST',
    });

    const selectedTemplate = cardTemplates.find(
        (t) => t.id === Number(data.card_template_id),
    );

    const frontEmptySrc =
        selectedTemplate?.front_empty_url ?? FALLBACK_FRONT_EMPTY;
    const frontExampleSrc =
        selectedTemplate?.front_example_url ?? FALLBACK_FRONT_EXAMPLE;
    const backSrc = selectedTemplate?.back_url ?? FALLBACK_BACK;

    const [selected, setSelected] = useState<LayoutKey | null>(null);
    const [downloading, setDownloading] = useState<
        'front-png' | 'back-png' | 'pdf' | 'qr-png' | 'save' | null
    >(null);

    const frontWrapRef = useRef<HTMLDivElement | null>(null);
    const backWrapRef = useRef<HTMLDivElement | null>(null);
    const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const captureNode = async (
        node: HTMLElement | null,
    ): Promise<string | null> => {
        if (!node) return null;
        setSelected(null);
        await new Promise((resolve) => requestAnimationFrame(resolve));
        return toPng(node, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
        });
    };

    const triggerDownload = (dataUrl: string, filename: string) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const downloadFrontPng = async () => {
        try {
            setDownloading('front-png');
            const url = await captureNode(frontWrapRef.current);
            if (url) {
                triggerDownload(
                    url,
                    `card-${membership.membership_number}-front.png`,
                );
            }
        } finally {
            setDownloading(null);
        }
    };

    const downloadBackPng = async () => {
        try {
            setDownloading('back-png');
            const url = await captureNode(backWrapRef.current);
            if (url) {
                triggerDownload(
                    url,
                    `card-${membership.membership_number}-back.png`,
                );
            }
        } finally {
            setDownloading(null);
        }
    };

    const downloadQrPng = () => {
        const canvas = qrCanvasRef.current;
        if (!canvas) return;
        try {
            setDownloading('qr-png');
            triggerDownload(
                canvas.toDataURL('image/png'),
                `card-${membership.membership_number}-qr.png`,
            );
        } finally {
            setDownloading(null);
        }
    };

    const saveCardSnapshot = async () => {
        setDownloading('save');
        let dataUrl: string | null = null;
        try {
            dataUrl = await captureNode(frontWrapRef.current);
        } catch (err) {
            console.error('Card capture failed', err);
            toast.error('تعذر إنشاء صورة البطاقة');
            setDownloading(null);
            return;
        }
        if (!dataUrl) {
            setDownloading(null);
            toast.error('تعذر إنشاء صورة البطاقة');
            return;
        }
        const file = new File([dataUrlToBlob(dataUrl)], 'card-front.png', {
            type: 'image/png',
        });
        router.post(
            `/dashboard/memberships/${membership.id}/card/snapshot`,
            { front: file },
            {
                forceFormData: true,
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success(
                        'تم حفظ البطاقة، يمكنك تنزيلها من صفحة العضوية',
                    );
                },
                onError: (errors) => {
                    const message =
                        Object.values(errors)[0] ?? 'تعذر حفظ البطاقة';
                    toast.error(String(message));
                },
                onFinish: () => setDownloading(null),
            },
        );
    };

    const downloadPdf = async () => {
        try {
            setDownloading('pdf');
            const front = await captureNode(frontWrapRef.current);
            const back = await captureNode(backWrapRef.current);
            if (!front || !back) return;

            const widthMm = 85.6;
            const heightMm = 53.98;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [widthMm, heightMm],
            });
            pdf.addImage(front, 'PNG', 0, 0, widthMm, heightMm);
            pdf.addPage([widthMm, heightMm], 'landscape');
            pdf.addImage(back, 'PNG', 0, 0, widthMm, heightMm);
            pdf.save(`card-${membership.membership_number}.pdf`);
        } finally {
            setDownloading(null);
        }
    };

    const photoPreview = useMemo(
        () => (data.photo ? URL.createObjectURL(data.photo) : null),
        [data.photo],
    );

    useEffect(
        () => () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        },
        [photoPreview],
    );

    const prevTemplateId = useRef(data.card_template_id);
    useEffect(() => {
        if (data.card_template_id === prevTemplateId.current) return;
        prevTemplateId.current = data.card_template_id;

        const tpl = cardTemplates.find(
            (t) => t.id === Number(data.card_template_id),
        );
        if (tpl?.layout) {
            setData(
                'card_layout',
                mergeLayout(default_card_layout, tpl.layout),
            );
        }
    }, [data.card_template_id]);

    const displayedPhoto = data.photo_remove
        ? null
        : photoPreview ?? sameOrigin(membership.photo_url);

    const updateLayout = useCallback(
        <K extends LayoutKey>(key: K, patch: Partial<CardLayout[K]>) => {
            setData('card_layout', {
                ...data.card_layout,
                [key]: { ...data.card_layout[key], ...patch },
            });
        },
        [data.card_layout, setData],
    );

    const resetToCardDefault = () => {
        setData(
            'card_layout',
            selectedTemplate?.layout
                ? mergeLayout(default_card_layout, selectedTemplate.layout)
                : default_card_layout,
        );
    };

    const resetToMemberDefault = () => {
        setData('card_layout', default_card_layout);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(`/dashboard/memberships/${membership.id}/card`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => toast.success('تم حفظ بيانات البطاقة'),
            onError: (errors) => {
                const message =
                    Object.values(errors)[0] ?? 'تعذر حفظ بيانات البطاقة';
                toast.error(String(message));
            },
        });
    };

    return (
        <>
            <Head title={`بطاقة ${membership.membership_number}`} />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Heading
                        title={membership.holder_name ?? 'تصميم البطاقة'}
                        description={`رقم العضوية: ${membership.membership_number}`}
                    />
                    <Button asChild variant="outline" className="gap-1.5">
                        <Link href="/dashboard/memberships">
                            <ArrowRightIcon className="size-4" />
                            عودة
                        </Link>
                    </Button>
                </div>

                <section className="rounded-3xl border bg-card p-5 shadow-sm">
                    <h3 className="mb-3 font-heading text-sm font-semibold text-muted-foreground">
                        أسماء العضو
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <NameField
                            label="الاسم الأول"
                            value={membership.first_name}
                        />
                        <NameField
                            label="الاسم الثاني"
                            value={membership.second_name}
                        />
                        <NameField
                            label="الاسم الثالث"
                            value={membership.third_name}
                        />
                        <NameField
                            label="الاسم الرابع"
                            value={membership.fourth_name}
                        />
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
                    <form
                        onSubmit={submit}
                        className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm"
                    >
                        <h3 className="font-heading text-lg font-semibold">
                            بيانات البطاقة
                        </h3>

                        {cardTemplates.length > 0 && (
                            <div className="grid gap-2">
                                <Label>قالب البطاقة</Label>
                                <Select
                                    value={String(data.card_template_id || '')}
                                    onValueChange={(v) => {
                                        setData('card_template_id', Number(v));
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="اختر القالب…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cardTemplates.map((t) => (
                                            <SelectItem
                                                key={t.id}
                                                value={String(t.id)}
                                            >
                                                {t.name}
                                                {t.is_default ? ' (افتراضي)' : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.card_template_id}
                                />
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label>الاسم الأول (كبير)</Label>
                            <Input
                                dir="ltr"
                                value={data.card_first_name}
                                onChange={(e) =>
                                    setData('card_first_name', e.target.value)
                                }
                                placeholder="MOHAMMED"
                            />
                            <InputError message={errors.card_first_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label>الاسم الكامل</Label>
                            <Input
                                dir="ltr"
                                value={data.card_full_name}
                                onChange={(e) =>
                                    setData('card_full_name', e.target.value)
                                }
                                placeholder="AHMED MOHAMMED ALI NASSAR"
                            />
                            <InputError message={errors.card_full_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label>رقم العضوية</Label>
                            <Input
                                dir="ltr"
                                value={data.card_membership_number}
                                onChange={(e) =>
                                    setData(
                                        'card_membership_number',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={errors.card_membership_number}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>جهة العمل (Work Place)</Label>
                            <Input
                                dir="ltr"
                                value={data.job_title_en}
                                onChange={(e) =>
                                    setData('job_title_en', e.target.value)
                                }
                                placeholder="ADMINISTRATIVE AFFAIRS MANAGER"
                            />
                            <InputError message={errors.job_title_en} />
                        </div>

                        <div className="grid gap-2">
                            <Label>اسم الشركة</Label>
                            <Input
                                value={data.company_name}
                                onChange={(e) =>
                                    setData('company_name', e.target.value)
                                }
                                placeholder="اسم الشركة"
                            />
                            <InputError message={errors.company_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label>تاريخ الانتهاء</Label>
                            <Input
                                type="date"
                                value={data.expiration_date}
                                onChange={(e) =>
                                    setData('expiration_date', e.target.value)
                                }
                            />
                            <InputError message={errors.expiration_date} />
                        </div>

                        <ImagePicker
                            label="صورة العضو"
                            file={data.photo}
                            existingUrl={membership.photo_url}
                            isRemoved={data.photo_remove}
                            onFileChange={(f) => setData('photo', f)}
                            onRemoveExistingChange={(rm) =>
                                setData('photo_remove', rm)
                            }
                            error={errors.photo}
                            aspect="square"
                            size="sm"
                        />

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full gap-1.5"
                        >
                            <SaveIcon className="size-4" />
                            حفظ البطاقة
                        </Button>
                    </form>

                    <div className="space-y-6">
                        <section className="space-y-3 rounded-3xl border bg-card shadow-sm">
                            <header className="flex flex-wrap items-center justify-between gap-2 px-6 pt-6">
                                <h3 className="font-heading text-lg font-semibold">
                                    معاينة البطاقة
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MoveIcon className="size-3.5" />
                                    اسحب العناصر لتغيير مكانها
                                </div>
                            </header>
                            <div ref={frontWrapRef}>
                                <CardFrontPreview
                                    backgroundSrc={frontEmptySrc}
                                    firstName={data.card_first_name}
                                    fullName={data.card_full_name}
                                    workPlace={data.job_title_en}
                                    companyName={data.company_name}
                                    expirationDate={data.expiration_date}
                                    membershipNumber={
                                        data.card_membership_number
                                    }
                                    photoUrl={displayedPhoto}
                                    qrValue={cardUrl}
                                    layout={data.card_layout}
                                    onLayoutChange={updateLayout}
                                    selected={selected}
                                    onSelect={setSelected}
                                />
                            </div>
                            <p
                                className="break-all text-center text-xs text-muted-foreground"
                                dir="ltr"
                            >
                                QR → {cardUrl}
                            </p>
                            <div
                                aria-hidden
                                className="pointer-events-none fixed -left-[9999px] top-0"
                            >
                                <QRCodeCanvas
                                    ref={qrCanvasRef}
                                    value={cardUrl}
                                    level="M"
                                    marginSize={0}
                                    size={1024}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 border-t pt-4">
                                <Button
                                    type="button"
                                    size="sm"
                                    className="gap-1.5"
                                    disabled={downloading !== null}
                                    onClick={saveCardSnapshot}
                                >
                                    {downloading === 'save' ? (
                                        <Loader2Icon className="size-3.5 animate-spin" />
                                    ) : (
                                        <SaveIcon className="size-3.5" />
                                    )}
                                    حفظ البطاقة كصورة
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                    disabled={downloading !== null}
                                    onClick={downloadFrontPng}
                                >
                                    {downloading === 'front-png' ? (
                                        <Loader2Icon className="size-3.5 animate-spin" />
                                    ) : (
                                        <ImageDownIcon className="size-3.5" />
                                    )}
                                    تنزيل الوجه الأمامي (PNG)
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                    disabled={downloading !== null}
                                    onClick={downloadBackPng}
                                >
                                    {downloading === 'back-png' ? (
                                        <Loader2Icon className="size-3.5 animate-spin" />
                                    ) : (
                                        <ImageDownIcon className="size-3.5" />
                                    )}
                                    تنزيل الوجه الخلفي (PNG)
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                    disabled={downloading !== null}
                                    onClick={downloadQrPng}
                                >
                                    {downloading === 'qr-png' ? (
                                        <Loader2Icon className="size-3.5 animate-spin" />
                                    ) : (
                                        <ImageDownIcon className="size-3.5" />
                                    )}
                                    تنزيل رمز QR (PNG)
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    className="gap-1.5"
                                    disabled={downloading !== null}
                                    onClick={downloadPdf}
                                >
                                    {downloading === 'pdf' ? (
                                        <Loader2Icon className="size-3.5 animate-spin" />
                                    ) : (
                                        <FileDownIcon className="size-3.5" />
                                    )}
                                    تنزيل البطاقة (PDF)
                                </Button>
                            </div>
                        </section>

                        <section className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
                            <header className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="font-heading text-lg font-semibold">
                                    التخطيط (الموقع والحجم)
                                </h3>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5"
                                        onClick={resetToMemberDefault}
                                    >
                                        <RotateCcwIcon className="size-3.5" />
                                        إعادة تعيين
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5"
                                        onClick={resetToCardDefault}
                                    >
                                        <RotateCcwIcon className="size-3.5" />
                                        القيم الافتراضية للقالب
                                    </Button>
                                </div>
                            </header>

                            <div className="grid gap-4 md:grid-cols-2">
                                {TEXT_KEYS.map((key) => (
                                    <TextLayoutControls
                                        key={key}
                                        label={LABELS[key]}
                                        active={selected === key}
                                        onActivate={() => setSelected(key)}
                                        value={data.card_layout[key]}
                                        onChange={(patch) =>
                                            updateLayout(key, patch)
                                        }
                                    />
                                ))}
                                {IMAGE_KEYS.map((key) => (
                                    <ImageLayoutControls
                                        key={key}
                                        label={LABELS[key]}
                                        active={selected === key}
                                        onActivate={() => setSelected(key)}
                                        value={data.card_layout[key]}
                                        onChange={(patch) =>
                                            updateLayout(key, patch)
                                        }
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="space-y-3 rounded-3xl border bg-card p-6 shadow-sm">
                            <header className="flex items-center justify-between">
                                <h3 className="font-heading text-lg font-semibold">
                                    الوجه الخلفي
                                </h3>
                            </header>
                            <div
                                ref={backWrapRef}
                                className="relative w-full overflow-hidden rounded-2xl border shadow-sm"
                                style={{ aspectRatio: '1096 / 686' }}
                            >
                                <img
                                    src={backSrc}
                                    alt=""
                                    crossOrigin="anonymous"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </section>

                        <section className="space-y-3 rounded-3xl border bg-card p-6 shadow-sm">
                            <header className="flex items-center justify-between">
                                <h3 className="font-heading text-lg font-semibold">
                                    قالب مرجعي
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                    Example
                                </span>
                            </header>
                            <div
                                className="relative w-full overflow-hidden rounded-2xl border shadow-sm"
                                style={{ aspectRatio: '1096 / 686' }}
                            >
                                <img
                                    src={frontExampleSrc}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

function NameField({
    label,
    value,
}: {
    label: string;
    value: string | null;
}) {
    return (
        <div className="rounded-2xl border bg-muted/30 px-3 py-2">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
                {label}
            </p>
            <p className="mt-0.5 font-medium" dir="rtl">
                {value || '—'}
            </p>
        </div>
    );
}


function TextLayoutControls({
    label,
    value,
    onChange,
    active,
    onActivate,
}: {
    label: string;
    value: TextLayout;
    onChange: (patch: Partial<TextLayout>) => void;
    active: boolean;
    onActivate: () => void;
}) {
    return (
        <div
            onClick={onActivate}
            className={cn(
                'cursor-pointer space-y-2 rounded-2xl border bg-muted/20 p-3',
                active && 'border-blue-500 bg-blue-50/40',
            )}
        >
            <p className="text-xs font-semibold">{label}</p>
            <div className="grid grid-cols-3 gap-2">
                <NumberField
                    label="أعلى"
                    value={value.top}
                    onChange={(v) => onChange({ top: v })}
                />
                <NumberField
                    label="يسار"
                    value={value.left}
                    onChange={(v) => onChange({ left: v })}
                />
                <NumberField
                    label="الحجم"
                    value={value.fontSize}
                    step={0.1}
                    onChange={(v) => onChange({ fontSize: v })}
                />
            </div>
            <label
                className="mt-1 flex items-center gap-1.5 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="checkbox"
                    checked={value.hidden ?? false}
                    onChange={(e) =>
                        onChange({ hidden: e.target.checked })
                    }
                    className="size-3.5"
                />
                <span className="text-[10px] text-muted-foreground">
                    مخفي
                </span>
            </label>
        </div>
    );
}

function ImageLayoutControls({
    label,
    value,
    onChange,
    active,
    onActivate,
}: {
    label: string;
    value: ImageLayout;
    onChange: (patch: Partial<ImageLayout>) => void;
    active: boolean;
    onActivate: () => void;
}) {
    return (
        <div
            onClick={onActivate}
            className={cn(
                'cursor-pointer space-y-2 rounded-2xl border bg-muted/20 p-3',
                active && 'border-blue-500 bg-blue-50/40',
            )}
        >
            <p className="text-xs font-semibold">{label}</p>
            <div className="grid grid-cols-2 gap-2">
                <NumberField
                    label="أعلى"
                    value={value.top}
                    onChange={(v) => onChange({ top: v })}
                />
                <NumberField
                    label="يسار"
                    value={value.left}
                    onChange={(v) => onChange({ left: v })}
                />
                <NumberField
                    label="العرض"
                    value={value.width}
                    onChange={(v) => onChange({ width: v })}
                />
                <NumberField
                    label="الارتفاع"
                    value={value.height}
                    onChange={(v) => onChange({ height: v })}
                />
            </div>
            <label
                className="mt-1 flex items-center gap-1.5 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="checkbox"
                    checked={value.hidden ?? false}
                    onChange={(e) =>
                        onChange({ hidden: e.target.checked })
                    }
                    className="size-3.5"
                />
                <span className="text-[10px] text-muted-foreground">
                    مخفي
                </span>
            </label>
        </div>
    );
}

function NumberField({
    label,
    value,
    onChange,
    step = 0.5,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    step?: number;
}) {
    return (
        <label className="block text-[10px] text-muted-foreground">
            {label}
            <Input
                type="number"
                step={step}
                value={Number.isFinite(value) ? value : 0}
                onChange={(e) => {
                    const next = parseFloat(e.target.value);
                    onChange(Number.isFinite(next) ? next : 0);
                }}
                onClick={(e) => e.stopPropagation()}
                className="mt-1 h-8 px-2 text-xs"
                dir="ltr"
            />
        </label>
    );
}

function sameOrigin(url: string | null | undefined): string | null {
    if (!url) return null;
    if (typeof window === 'undefined') return url;
    try {
        const u = new URL(url, window.location.origin);
        if (u.host === window.location.host) return url;
        return `${window.location.origin}${u.pathname}${u.search}${u.hash}`;
    } catch {
        return url;
    }
}

function dataUrlToBlob(dataUrl: string): Blob {
    const [meta, b64] = dataUrl.split(',');
    const mime = /data:(.+);base64/.exec(meta ?? '')?.[1] ?? 'image/png';
    const binary = atob(b64 ?? '');
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
}

MembershipCard.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'العضويات', href: '/dashboard/memberships' },
        { title: 'البطاقة', href: '#' },
    ],
};
