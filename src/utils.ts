
export const formatPredictionResult = (prediction: string) => {
    const CLASS_NAMES = ["Acne", "Actinic_Keratosis", "Benign_tumors", "Bullous", "Candidiasis",
        "DrugEruption", "Eczema", "Infestations_Bites", "Lichen", "Lupus",
        "Moles", "Psoriasis", "Rosacea", "Seborrh_Keratoses", "SkinCancer",
        "Sun_Sunlight_Damage", "Tinea", "Unknown_Normal", "Vascular_Tumors",
        "Vasculitis", "Vitiligo", "Warts"];
    
    const format = (name: string) =>
        name
            .replace(/_/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');

    if (!prediction) return '';

    const matched = CLASS_NAMES.find(c => c.toLowerCase() === prediction.toLowerCase());
    return format(matched ?? prediction);
};