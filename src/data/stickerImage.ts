import { getStickerImage as getImage } from './stickerImages';

export function getStickerImageUrl(stickerId: string, size?: 'card' | 'modal'): string | undefined {
  const url = getImage(stickerId);
  if (!url) return undefined;

  // Shopify supports size parameters: _200x, _400x, etc.
  if (size === 'card') {
    return url.replace(/\.webp(?=\?|$)/, '_200x.webp');
  }
  if (size === 'modal') {
    return url.replace(/\.webp(?=\?|$)/, '_400x.webp');
  }

  return url;
}
