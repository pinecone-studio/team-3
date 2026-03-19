import { renderSVG } from 'uqr';

export async function generateQRBuffer(assetId: string): Promise<Buffer> {
    const svg = renderSVG(assetId, {
        ecc: 'H',
        border: 2, 
    });

    return Buffer.from(svg, 'utf-8');
}