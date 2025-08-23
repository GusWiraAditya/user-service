const INTERNAL_SECRET = process.env.INTERNAL_SECRET_KEY;

if (!INTERNAL_SECRET) {
    throw new Error('FATAL ERROR: INTERNAL_SECRET_KEY is not defined in this service.');
}

export const verifyInternalRequest = (req, res, next) => {
    const requestSecret = req.headers['x-internal-secret'];

    if (!requestSecret) {
        console.warn(`[SECURITY] Permintaan ditolak: Header 'X-Internal-Secret' tidak ada. Asal: ${req.ip}`);
        return res.status(403).json({ message: 'Forbidden: Access denied.' });
    }

    if (requestSecret !== INTERNAL_SECRET) {
        console.warn(`[SECURITY] Permintaan ditolak: Kunci rahasia tidak valid. Asal: ${req.ip}`);
        return res.status(403).json({ message: 'Forbidden: Access denied.' });
    }
    if (req.headers['x-user-info']) {
        try {
            req.userInfo = JSON.parse(req.headers['x-user-info']);
        } catch (error) {
            console.error('[SECURITY] Gagal mem-parsing header X-User-Info.');
        }
    }


    next();
};