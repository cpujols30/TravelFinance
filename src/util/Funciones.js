export const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        // Elimina etiquetas HTML inseguras
        return input.replace(/<[^>]*>?/gm, '').trim();
    }
    return input;
};

export const sanitizeServicesArray = (services) => {
    return services.map(service => {
        const sanitizedService = {};
        for (const key in service) {
            sanitizedService[key] = sanitizeInput(service[key]);
        }
        return sanitizedService;
    });
};
export const sanitizeObject = (obj) => {
    // Itera sobre todas las propiedades del objeto
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            // Sanitiza las cadenas
            obj[key] = sanitizeInput(obj[key]);
        } else if (Array.isArray(obj[key])) {
            // Procesa recursivamente cada objeto en el array si la propiedad es un array
            obj[key] = obj[key].map(sanitizeObject);
        }
    }
    return obj;
};