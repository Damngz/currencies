export interface Currency {
  currency_id: number;
  key_id: string;
  description: string;
  measurement: string;
  dolar: 'Y' | 'N';
  name: string;
  photo_url?: string;
  price?: number;
  rate?: number;
  series: number[];
}

export interface CurrencyFavorites {
  favorite_id: number;
  user: unknown;
  currency: Currency;
}
