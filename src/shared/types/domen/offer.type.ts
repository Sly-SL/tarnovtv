export type OfferType = {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    priceNote?: string;
    features: string[];
    badge?: string;
    highlight?: boolean;
    order: number;
};