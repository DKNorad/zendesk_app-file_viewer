export function formatDate(date: string): string {
    const cdate = new Date(date)
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: false,
    } as const
    date = cdate.toLocaleDateString("en-us", options)
    return date
}

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = [
        "Bytes",
        "KiB",
        "MiB",
        "GiB",
        "TiB",
        "PiB",
        "EiB",
        "ZiB",
        "YiB",
    ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// TODO:
// export async function getMimeTypeFromUrl(url: string): Promise<string> {
//     try {
//         const response = await fetch(url)
//         if (!response.ok) {
//             throw new Error(
//                 `Network response was not ok: ${response.statusText}`,
//             )
//         }

//         const buffer = await response.arrayBuffer()
//         const arr = new Uint8Array(buffer).subarray(0, 4)
//         let header = ""
//         for (let i = 0; i < arr.length; i++) {
//             header += arr[i].toString(16)
//         }

//         let riffType: Uint8Array | undefined
//         let riffHeader = ""

//         switch (header) {
//             case "89504e47": // PNG
//                 return "image/png"
//             case "47494638": // GIF
//                 return "image/gif"
//             case "ffd8ffe0": // JPEG
//             case "ffd8ffe1":
//             case "ffd8ffe2":
//                 return "image/jpeg"
//             case "424d": // BMP
//                 return "image/bmp"
//             case "49492a00": // TIFF (Little Endian)
//             case "4d4d002a": // TIFF (Big Endian)
//                 return "image/tiff"
//             case "52494646": // WebP and others that start with RIFF
//                 riffType = new Uint8Array(buffer).subarray(8, 12)
//                 riffHeader = ""
//                 for (let i = 0; i < riffType.length; i++) {
//                     riffHeader += String.fromCharCode(riffType[i])
//                 }
//                 if (riffHeader === "WEBP") {
//                     return "image/webp"
//                 }
//                 break
//             case "3c3f786d": // SVG (SVG images are text files that start with '<?xml')
//                 return "image/svg+xml"
//             default:
//                 return "unknown"
//         }

//         // Additional check for SVG as it might start with other characters
//         const text = new TextDecoder().decode(buffer)
//         if (text.startsWith("<?xml") || text.startsWith("<svg")) {
//             return "image/svg+xml"
//         }

//         return "unknown"
//     } catch (error) {
//         console.error("Failed to fetch or read the file:", error)
//         return "unknown"
//     }
// }