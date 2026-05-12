import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormActions from '@/pages/dashboard/_components/form-actions';
import { dashboard } from '@/routes';

interface Settings {
    contact_phone: string | null;
    contact_phone_display: string | null;
    contact_whatsapp: string | null;
    contact_email: string | null;
    contact_address: string | null;
    business_hours: string | null;
    support_hours_note: string | null;
    hotline_number: string | null;
    hotline_caption: string | null;
    map_latitude: string | null;
    map_longitude: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    twitter_url: string | null;
    youtube_url: string | null;
    announce_enabled: boolean;
    announce_lead: string | null;
    announce_body: string | null;
    announce_tail: string | null;
    stat1_value: string | null;
    stat1_label: string | null;
    stat2_value: string | null;
    stat2_label: string | null;
    stat3_value: string | null;
    stat3_label: string | null;
    footer_description: string | null;
    copyright_text: string | null;
    made_in_text: string | null;
}

type SettingsForm = { [K in keyof Settings]: Settings[K] extends boolean ? boolean : string };

function toForm(s: Settings): SettingsForm {
    const out: Record<string, string | boolean> = {};
    (Object.keys(s) as (keyof Settings)[]).forEach((k) => {
        const v = s[k];
        out[k] = typeof v === 'boolean' ? v : (v ?? '');
    });
    return out as SettingsForm;
}

export default function SiteSettingsEdit({ settings }: { settings: Settings }) {
    const { data, setData, put, processing, errors } = useForm<SettingsForm>(
        toForm(settings),
    );

    const save = (intent: 'stay' | 'return') => {
        put(`/dashboard/site-settings?redirect=${intent}`);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        save('stay');
    };

    return (
        <>
            <Head title="إعدادات الموقع" />
            <div className="w-full space-y-6 p-6" dir="rtl">
                <Heading
                    title="إعدادات الموقع"
                    description="بيانات التواصل، الروابط الاجتماعية، شريط الإعلانات، الإحصائيات، والفوتر."
                />
                <form onSubmit={submit} className="w-full space-y-6">
                    <Section title="بيانات التواصل">
                        <Field
                            label="رقم الهاتف"
                            name="contact_phone"
                            value={data.contact_phone}
                            onChange={(v) => setData('contact_phone', v)}
                            error={errors.contact_phone}
                            dir="ltr"
                            processing={processing}
                        />
                        <Field
                            label="رقم الهاتف للعرض"
                            name="contact_phone_display"
                            value={data.contact_phone_display}
                            onChange={(v) => setData('contact_phone_display', v)}
                            error={errors.contact_phone_display}
                            dir="ltr"
                            processing={processing}
                        />
                        <Field
                            label="رقم الواتساب"
                            name="contact_whatsapp"
                            value={data.contact_whatsapp}
                            onChange={(v) => setData('contact_whatsapp', v)}
                            error={errors.contact_whatsapp}
                            dir="ltr"
                            processing={processing}
                            hint="بدون + أو رموز، مثال: 201234567890"
                        />
                        <Field
                            label="البريد الإلكتروني"
                            name="contact_email"
                            value={data.contact_email}
                            onChange={(v) => setData('contact_email', v)}
                            error={errors.contact_email}
                            dir="ltr"
                            processing={processing}
                            type="email"
                        />
                        <Field
                            label="العنوان"
                            name="contact_address"
                            value={data.contact_address}
                            onChange={(v) => setData('contact_address', v)}
                            error={errors.contact_address}
                            processing={processing}
                            full
                        />
                        <Field
                            label="ساعات العمل"
                            name="business_hours"
                            value={data.business_hours}
                            onChange={(v) => setData('business_hours', v)}
                            error={errors.business_hours}
                            processing={processing}
                            full
                        />
                        <Field
                            label="ملاحظة دعم الأعضاء"
                            name="support_hours_note"
                            value={data.support_hours_note}
                            onChange={(v) => setData('support_hours_note', v)}
                            error={errors.support_hours_note}
                            processing={processing}
                            full
                        />
                    </Section>

                    <Section title="الخط الساخن (يظهر في شريط الدعوة بالصفحة الرئيسية)">
                        <Field
                            label="رقم الخط الساخن"
                            name="hotline_number"
                            value={data.hotline_number}
                            onChange={(v) => setData('hotline_number', v)}
                            error={errors.hotline_number}
                            dir="ltr"
                            processing={processing}
                        />
                        <Field
                            label="وصف الخط الساخن"
                            name="hotline_caption"
                            value={data.hotline_caption}
                            onChange={(v) => setData('hotline_caption', v)}
                            error={errors.hotline_caption}
                            processing={processing}
                        />
                    </Section>

                    <Section title="إحداثيات الخريطة">
                        <Field
                            label="خط العرض (Latitude)"
                            name="map_latitude"
                            value={data.map_latitude}
                            onChange={(v) => setData('map_latitude', v)}
                            error={errors.map_latitude}
                            dir="ltr"
                            processing={processing}
                        />
                        <Field
                            label="خط الطول (Longitude)"
                            name="map_longitude"
                            value={data.map_longitude}
                            onChange={(v) => setData('map_longitude', v)}
                            error={errors.map_longitude}
                            dir="ltr"
                            processing={processing}
                        />
                    </Section>

                    <Section title="روابط السوشيال ميديا">
                        <Field
                            label="فيسبوك"
                            name="facebook_url"
                            value={data.facebook_url}
                            onChange={(v) => setData('facebook_url', v)}
                            error={errors.facebook_url}
                            dir="ltr"
                            processing={processing}
                            full
                        />
                        <Field
                            label="إنستجرام"
                            name="instagram_url"
                            value={data.instagram_url}
                            onChange={(v) => setData('instagram_url', v)}
                            error={errors.instagram_url}
                            dir="ltr"
                            processing={processing}
                            full
                        />
                        <Field
                            label="تويتر / إكس"
                            name="twitter_url"
                            value={data.twitter_url}
                            onChange={(v) => setData('twitter_url', v)}
                            error={errors.twitter_url}
                            dir="ltr"
                            processing={processing}
                            full
                        />
                        <Field
                            label="يوتيوب"
                            name="youtube_url"
                            value={data.youtube_url}
                            onChange={(v) => setData('youtube_url', v)}
                            error={errors.youtube_url}
                            dir="ltr"
                            processing={processing}
                            full
                        />
                    </Section>

                    <Section title="شريط الإعلانات (أعلى الصفحة)">
                        <div className="flex items-center gap-2 sm:col-span-2">
                            <Checkbox
                                id="announce_enabled"
                                checked={data.announce_enabled}
                                onCheckedChange={(v) =>
                                    setData('announce_enabled', v === true)
                                }
                                disabled={processing}
                            />
                            <Label htmlFor="announce_enabled" className="cursor-pointer">
                                إظهار شريط الإعلانات
                            </Label>
                        </div>
                        <Field
                            label="عنوان مختصر (Lead)"
                            name="announce_lead"
                            value={data.announce_lead}
                            onChange={(v) => setData('announce_lead', v)}
                            error={errors.announce_lead}
                            processing={processing}
                            hint="مثال: 🎉 عرض حصري"
                        />
                        <Field
                            label="نص جانبي (Tail)"
                            name="announce_tail"
                            value={data.announce_tail}
                            onChange={(v) => setData('announce_tail', v)}
                            error={errors.announce_tail}
                            processing={processing}
                            hint="مثال: ينتهي العرض خلال ٣ أيام"
                        />
                        <Field
                            label="النص الأساسي"
                            name="announce_body"
                            value={data.announce_body}
                            onChange={(v) => setData('announce_body', v)}
                            error={errors.announce_body}
                            processing={processing}
                            full
                        />
                    </Section>

                    <Section title="إحصائيات صفحة البطل (Hero)">
                        <Field
                            label="إحصائية ١ — القيمة"
                            name="stat1_value"
                            value={data.stat1_value}
                            onChange={(v) => setData('stat1_value', v)}
                            error={errors.stat1_value}
                            processing={processing}
                        />
                        <Field
                            label="إحصائية ١ — الوصف"
                            name="stat1_label"
                            value={data.stat1_label}
                            onChange={(v) => setData('stat1_label', v)}
                            error={errors.stat1_label}
                            processing={processing}
                        />
                        <Field
                            label="إحصائية ٢ — القيمة"
                            name="stat2_value"
                            value={data.stat2_value}
                            onChange={(v) => setData('stat2_value', v)}
                            error={errors.stat2_value}
                            processing={processing}
                        />
                        <Field
                            label="إحصائية ٢ — الوصف"
                            name="stat2_label"
                            value={data.stat2_label}
                            onChange={(v) => setData('stat2_label', v)}
                            error={errors.stat2_label}
                            processing={processing}
                        />
                        <Field
                            label="إحصائية ٣ — القيمة"
                            name="stat3_value"
                            value={data.stat3_value}
                            onChange={(v) => setData('stat3_value', v)}
                            error={errors.stat3_value}
                            processing={processing}
                        />
                        <Field
                            label="إحصائية ٣ — الوصف"
                            name="stat3_label"
                            value={data.stat3_label}
                            onChange={(v) => setData('stat3_label', v)}
                            error={errors.stat3_label}
                            processing={processing}
                        />
                    </Section>

                    <Section title="الفوتر">
                        <div className="sm:col-span-2 grid gap-2">
                            <Label htmlFor="footer_description">وصف الشركة</Label>
                            <textarea
                                id="footer_description"
                                dir="rtl"
                                rows={4}
                                value={data.footer_description}
                                onChange={(e) =>
                                    setData(
                                        'footer_description',
                                        e.target.value,
                                    )
                                }
                                disabled={processing}
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
                            />
                            <InputError message={errors.footer_description} />
                        </div>
                        <Field
                            label="نص حقوق النشر"
                            name="copyright_text"
                            value={data.copyright_text}
                            onChange={(v) => setData('copyright_text', v)}
                            error={errors.copyright_text}
                            processing={processing}
                            full
                        />
                        <Field
                            label="نص ”صُنع في“"
                            name="made_in_text"
                            value={data.made_in_text}
                            onChange={(v) => setData('made_in_text', v)}
                            error={errors.made_in_text}
                            processing={processing}
                        />
                    </Section>

                    <FormActions
                        processing={processing}
                        cancelHref="/dashboard"
                        onSave={save}
                    />
                </form>
            </div>
        </>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="grid gap-4 sm:grid-cols-2">{children}</div>
        </div>
    );
}

function Field({
    label,
    name,
    value,
    onChange,
    error,
    processing,
    type = 'text',
    dir,
    hint,
    full,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    processing: boolean;
    type?: string;
    dir?: 'ltr' | 'rtl';
    hint?: string;
    full?: boolean;
}) {
    return (
        <div className={`grid gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                dir={dir}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={processing}
            />
            {hint && (
                <p className="text-xs text-muted-foreground">{hint}</p>
            )}
            <InputError message={error} />
        </div>
    );
}

SiteSettingsEdit.layout = {
    breadcrumbs: [
        { title: 'لوحة التحكم', href: dashboard() },
        { title: 'إعدادات الموقع', href: '/dashboard/site-settings' },
    ],
};
