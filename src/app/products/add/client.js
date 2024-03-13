import Compressor from "compressorjs";
export async function compress(f, quality) {
    try {
        let file = f;
        const parts = file.name.split('.');
        let extension;
        if (parts.length > 1)
            extension = parts[parts.length - 1];
        else
            return { "error": "File type must be jpg jpeg png" }

        const qval = quality === "sm" ? 0.2 : (quality === "md" ? 0.4 : (quality === "lg" ? 0.7 : 1));

        const compressedFile = await new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: qval,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject({ error: err.message });
                },
            });
        });

        return compressedFile;
    } catch (error) {
        console.error('Error uploading image:', error.message);
        return { error: 'Error uploading image' };
    }
}

export function getId() {
    let userid = new Date().getTime() - 1707805802621 + Math.floor(Math.random() * 100)
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    let result = '';
    do {
        result = alphabet[userid % 64] + result;
        userid = Math.floor(userid / 64);
    } while (userid > 0);
    return result;
}