const INTERNAL_SECRETS = [
  process.env.INTERNAL_SECRET_KEY,
  process.env.LAYANAN_SECRET_KEY,
].filter(Boolean);

if (!INTERNAL_SECRETS) {
  throw new Error(
    "FATAL ERROR: INTERNAL_SECRET_KEY is not defined in this service."
  );
}

export const verifyInternalRequest = (req, res, next) => {
  const requestSecret = req.headers["x-internal-secret"];

  if (!requestSecret) {
    console.warn(
      `[SECURITY] Permintaan ditolak: Header 'X-Internal-Secret' tidak ada. Asal: ${req.ip}`
    );
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }

  if (!INTERNAL_SECRETS.includes(requestSecret)) {
    console.warn(
      `[SECURITY] Permintaan ditolak: Kunci rahasia tidak valid. Asal: ${req.ip}`
    );
    return res.status(403).json({ message: "Forbidden: Access denied." });
  }

  if (req.headers["x-user-info"]) {
    try {
      req.userInfo = JSON.parse(req.headers["x-user-info"]);
    } catch (error) {
      console.error("[SECURITY] Gagal mem-parsing header X-User-Info.");
    }
  }
  console.log("👉 Header diterima:", req.headers["x-internal-secret"]);
  console.log(
    "👉 INTERNAL_SECRET_KEY (env user service):",
    process.env.INTERNAL_SECRET_KEY
  );

  next();
};
