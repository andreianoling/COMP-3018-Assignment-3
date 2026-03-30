import helmet from "helmet";

export const helmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = {
        contentSecurityPolicy: true,
        hidePoweredBy: true, // Always hide server info
    };

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    });
};