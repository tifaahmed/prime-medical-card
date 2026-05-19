import { QRCodeSVG } from 'qrcode.react';
import type { CSSProperties } from 'react';

export type TextLayout = { top: number; left: number; fontSize: number };
export type ImageLayout = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export type CardLayout = {
    first_name: TextLayout;
    full_name: TextLayout;
    work_place: TextLayout;
    company: TextLayout;
    date: TextLayout;
    photo: ImageLayout;
    qr: ImageLayout;
};

export type MembershipCardFrontProps = {
    firstName: string;
    fullName: string;
    workPlace: string;
    companyName: string;
    expirationDate: string;
    photoUrl: string | null;
    qrValue: string;
    layout: CardLayout;
    className?: string;
};

const textStyle = (item: TextLayout): CSSProperties => ({
    top: `${item.top}%`,
    left: `${item.left}%`,
    right: '4%',
    fontSize: `${item.fontSize}cqi`,
    lineHeight: 1.1,
});

const imageStyle = (item: ImageLayout): CSSProperties => ({
    top: `${item.top}%`,
    left: `${item.left}%`,
    width: `${item.width}%`,
    height: `${item.height}%`,
});

export default function MembershipCardFront({
    firstName,
    fullName,
    workPlace,
    companyName,
    expirationDate,
    photoUrl,
    qrValue,
    layout,
    className,
}: MembershipCardFrontProps) {
    return (
        <div
            className={
                'relative w-full overflow-hidden rounded-2xl border shadow-sm select-none ' +
                (className ?? '')
            }
            style={{
                aspectRatio: '1096 / 686',
                containerType: 'inline-size',
            }}
            dir="ltr"
        >
            <img
                src="/images/card/front-empty.jpeg"
                alt=""
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div
                className="absolute whitespace-nowrap"
                style={{
                    ...textStyle(layout.first_name),
                    color: '#0d5b58',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.01em',
                }}
            >
                {firstName || ''}
            </div>

            <div
                className="absolute whitespace-nowrap"
                style={{
                    ...textStyle(layout.full_name),
                    color: '#0c1f24',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.01em',
                }}
            >
                {fullName || ''}
            </div>

            <div
                className="absolute whitespace-nowrap"
                style={{
                    ...textStyle(layout.work_place),
                    color: '#0c1f24',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                }}
            >
                {workPlace || ''}
            </div>

            <div
                className="absolute whitespace-nowrap"
                style={{
                    ...textStyle(layout.company),
                    color: '#0c1f24',
                    fontWeight: 700,
                }}
            >
                {companyName || ''}
            </div>

            <div
                className="absolute whitespace-nowrap"
                style={{
                    ...textStyle(layout.date),
                    color: '#0c1f24',
                    fontWeight: 600,
                }}
            >
                {formatDate(expirationDate)}
            </div>

            <div
                className="absolute overflow-hidden"
                style={imageStyle(layout.photo)}
            >
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt=""
                        draggable={false}
                        className="pointer-events-none h-full w-full object-cover"
                    />
                ) : null}
            </div>

            <div
                className="absolute flex items-center justify-center overflow-hidden bg-white"
                style={{ ...imageStyle(layout.qr), padding: '0.6%' }}
            >
                <QRCodeSVG
                    value={qrValue}
                    level="M"
                    marginSize={0}
                    style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
}

function formatDate(value: string): string {
    if (!value) {
        return '00/00/0000';
    }
    const [year, month, day] = value.split('-');
    if (!year || !month || !day) {
        return value;
    }
    return `${day}/${month}/${year}`;
}
