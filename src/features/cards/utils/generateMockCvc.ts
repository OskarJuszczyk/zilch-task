const CVC_LENGTH = 3;
const CVC_MAX = 10 ** CVC_LENGTH - 1;

export function generateMockCvc(): string {
    const raw = Math.floor(Math.random() * (CVC_MAX + 1));
    return String(raw).padStart(CVC_LENGTH, '0');
}
