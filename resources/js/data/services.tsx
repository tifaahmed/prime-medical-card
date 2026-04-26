import type { ReactNode } from 'react';

export type Project = {
    title: string;
    image: string;
    year: string;
};

export type Service = {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    discount: string;
    image: string;
    accent: string;
    icon: ReactNode;
    projects: Project[];
};

const HOSPITAL_ICON: ReactNode = (
    <>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
    </>
);

const PHARMACY_ICON: ReactNode = (
    <>
        <path d="M10.5 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
        <path d="M8 7v10" />
        <path d="M12 7v10" />
    </>
);

const LAB_ICON: ReactNode = (
    <>
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
    </>
);

const RADIOLOGY_ICON: ReactNode = (
    <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </>
);

const DENTAL_ICON: ReactNode = (
    <path d="M19 10H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2.5L9 21h6l1.5-7H19a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2z" />
);

const OPTICS_ICON: ReactNode = (
    <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
    </>
);

const MENTAL_ICON: ReactNode = (
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
);

const PHYSIO_ICON: ReactNode = (
    <>
        <path d="M6 2l.01 20" />
        <path d="M18 2l.01 20" />
        <path d="M2 6h20" />
        <path d="M2 18h20" />
    </>
);

function projects(slug: string, titles: [string, string][]): Project[] {
    return titles.map(([title, year], i) => ({
        title,
        year,
        image: `/images/services/${slug}/projects/${i + 1}.jpg`,
    }));
}

export const SERVICES: Service[] = [
    {
        id: 'clinics',
        title: 'العيادات والمستشفيات',
        desc: 'كشف طبي وعمليات وإقامة في أفضل المستشفيات والعيادات التخصصية',
        longDesc:
            'شبكة واسعة من المستشفيات والعيادات التخصصية في كل المحافظات. خصومات على الكشف والعمليات والإقامة وغرف العناية المركزة، مع تجربة موحّدة عبر بطاقة واحدة لكل أفراد العائلة.',
        discount: 'حتى ٦٠٪ خصم',
        image: '/images/services/clinics.jpg',
        accent: '#236b64',
        icon: HOSPITAL_ICON,
        projects: projects('clinics', [
            ['افتتاح وحدة جراحات اليوم الواحد', '٢٠٢٥'],
            ['شراكة مع مستشفى السلام الدولي', '٢٠٢٤'],
            ['إطلاق خط ساخن للحجوزات', '٢٠٢٤'],
            ['قسم رعاية كبار السن', '٢٠٢٣'],
        ]),
    },
    {
        id: 'pharmacy',
        title: 'الصيدليات',
        desc: 'خصومات على الأدوية والمستلزمات الطبية في أكبر شبكات الصيدليات',
        longDesc:
            'تغطية لأكثر من ٣٠٠ صيدلية في كل المحافظات. خصومات تصل إلى ٤٠٪ على الأدوية الموصوفة والمستلزمات الطبية ومنتجات العناية، مع توصيل مجاني لطلبات الكارت.',
        discount: 'حتى ٤٠٪ خصم',
        image: '/images/services/pharmacy.jpg',
        accent: '#d68228',
        icon: PHARMACY_ICON,
        projects: projects('pharmacy', [
            ['شراكة مع صيدليات العزبي', '٢٠٢٥'],
            ['برنامج توصيل الأدوية المزمنة', '٢٠٢٤'],
            ['إضافة صيدليات سيف للشبكة', '٢٠٢٤'],
            ['خصم إضافي على الفيتامينات', '٢٠٢٣'],
        ]),
    },
    {
        id: 'labs',
        title: 'معامل التحاليل',
        desc: 'جميع أنواع التحاليل الطبية والفحوصات المخبرية بأسعار مخفضة',
        longDesc:
            'تحاليل شاملة من الفحوصات الدورية إلى التحاليل المتخصصة. شبكة من البرج، المختبر، ألفا، وغيرها، مع نتائج إلكترونية فورية وسحب عينات منزلي بأسعار مخفضة.',
        discount: 'حتى ٥٠٪ خصم',
        image: '/images/services/labs.jpg',
        accent: '#1a544f',
        icon: LAB_ICON,
        projects: projects('labs', [
            ['إطلاق خدمة سحب العينات المنزلي', '٢٠٢٥'],
            ['شراكة مع معامل البرج', '٢٠٢٤'],
            ['تحاليل مناعية متخصصة', '٢٠٢٤'],
            ['تكامل النتائج مع تطبيق الكارت', '٢٠٢٣'],
        ]),
    },
    {
        id: 'radiology',
        title: 'الأشعة والتصوير',
        desc: 'أشعة عادية ومقطعية ورنين مغناطيسي وسونار في أحدث المراكز',
        longDesc:
            'مراكز أشعة بأحدث التقنيات: رنين مغناطيسي، أشعة مقطعية، سونار رباعي الأبعاد، ماموجرام. تقارير إلكترونية وحجز موعد سريع، مع خصومات حصرية لحاملي الكارت.',
        discount: 'حتى ٥٥٪ خصم',
        image: '/images/services/radiology.jpg',
        accent: '#e8a84a',
        icon: RADIOLOGY_ICON,
        projects: projects('radiology', [
            ['مركز الأشعة الذهبي - فرع جديد', '٢٠٢٥'],
            ['تحديث أجهزة الرنين', '٢٠٢٤'],
            ['شراكة مع مركز الإشعاع التشخيصي', '٢٠٢٤'],
            ['خدمة سونار رباعي الأبعاد', '٢٠٢٣'],
        ]),
    },
    {
        id: 'dental',
        title: 'الأسنان',
        desc: 'تنظيف وحشو وزراعة وتقويم في أفضل مراكز الأسنان المتخصصة',
        longDesc:
            'مراكز أسنان متخصصة في التنظيف والحشو والتقويم وزراعة الأسنان وتجميل الابتسامة. خصومات تصل إلى ٧٠٪ مع خطط دفع مرنة لخدمات الزراعة.',
        discount: 'حتى ٧٠٪ خصم',
        image: '/images/services/dental.jpg',
        accent: '#236b64',
        icon: DENTAL_ICON,
        projects: projects('dental', [
            ['إطلاق برنامج زراعة الأسنان', '٢٠٢٥'],
            ['مراكز سمايل - افتتاح فروع جديدة', '٢٠٢٤'],
            ['شراكة مع وايت لاين للتجميل', '٢٠٢٤'],
            ['عيادة تقويم الأطفال', '٢٠٢٣'],
        ]),
    },
    {
        id: 'optics',
        title: 'البصريات',
        desc: 'فحص نظر ونظارات وعدسات لاصقة وعمليات تصحيح الإبصار',
        longDesc:
            'فحص نظر مجاني، خصومات على النظارات الطبية والشمسية والعدسات اللاصقة، وعروض خاصة على عمليات الليزك وتصحيح الإبصار في أحدث المراكز.',
        discount: 'حتى ٤٥٪ خصم',
        image: '/images/services/optics.jpg',
        accent: '#d68228',
        icon: OPTICS_ICON,
        projects: projects('optics', [
            ['شراكة مع المغربي للعيون', '٢٠٢٥'],
            ['عروض الليزك الموسمية', '٢٠٢٤'],
            ['بصريات المهندس - فروع جديدة', '٢٠٢٤'],
            ['عدسات أطفال مخفّضة', '٢٠٢٣'],
        ]),
    },
    {
        id: 'mental',
        title: 'الصحة النفسية',
        desc: 'جلسات علاج نفسي واستشارات مع أفضل الأطباء والمعالجين',
        longDesc:
            'جلسات علاج نفسي فردية وعائلية مع نخبة من الأطباء والمعالجين النفسيين. جلسات حضورية وأونلاين، مع سرية تامة وأسعار مخفضة لحاملي الكارت.',
        discount: 'حتى ٤٠٪ خصم',
        image: '/images/services/mental.jpg',
        accent: '#0b2e2c',
        icon: MENTAL_ICON,
        projects: projects('mental', [
            ['إطلاق جلسات الأونلاين', '٢٠٢٥'],
            ['برنامج الصحة النفسية للموظفين', '٢٠٢٤'],
            ['شراكة مع مراكز استشارية', '٢٠٢٤'],
            ['مجموعات دعم نفسي', '٢٠٢٣'],
        ]),
    },
    {
        id: 'physio',
        title: 'العلاج الطبيعي',
        desc: 'جلسات علاج طبيعي وإعادة تأهيل في أحدث المراكز المتخصصة',
        longDesc:
            'جلسات علاج طبيعي وإعادة تأهيل لإصابات الملاعب وآلام الظهر والعمود الفقري. مراكز متخصصة بأحدث الأجهزة وفريق طبي مدرّب على أحدث البروتوكولات.',
        discount: 'حتى ٥٠٪ خصم',
        image: '/images/services/physio.jpg',
        accent: '#2e867e',
        icon: PHYSIO_ICON,
        projects: projects('physio', [
            ['مركز فيزيو كير - فرع المعادي', '٢٠٢٥'],
            ['برنامج إعادة تأهيل الرياضيين', '٢٠٢٤'],
            ['شراكة مع ريهاب بلس', '٢٠٢٤'],
            ['جلسات منزلية لكبار السن', '٢٠٢٣'],
        ]),
    },
];

export function findService(id: string): Service | undefined {
    return SERVICES.find((s) => s.id === id);
}
