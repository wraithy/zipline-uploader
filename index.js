import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import mime from "mime";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: process.argv[3] + "/.env" });

const filePath = process.argv[2];
const fileSize = fs.statSync(filePath).size;

if (fileSize > 95 * 1024 * 1024) {
    const chunkSize = env.process.CHUNK_SIZE_IN_MB * 1024 * 1024;
    const numChunks = Math.ceil(fileSize / chunkSize);

    function generateRandomString() {
        return Math.random().toString(36).substring(2, 6);
    }

    const identifier = generateRandomString();

    for (let i = numChunks - 1; i >= 0; i--) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, fileSize);
        const chunk = fs.createReadStream(filePath, { start, end });
        const formData = new FormData();
        formData.append("file", chunk, {
            filename: path.basename(filePath),
            contentType: mime.getType(filePath),
            knownLength: end - start,
        });
        axios
            .post(`${process.env.DOMAIN}/api/upload`, formData, {
                headers: {
                    Authorization: process.env.TOKEN,
                    "Content-Type": "multipart/form-data",
                    "Content-Range": `bytes ${start}-${end - 1}/${fileSize}`,
                    "X-Zipline-Partial-Filename": path.basename(filePath),
                    "X-Zipline-Partial-Lastchunk": i === 0 ? "true" : "false",
                    "X-Zipline-Partial-Identifier": identifier,
                    "X-Zipline-Partial-Mimetype": mime.getType(filePath),
                },
            })
            .then((response) => {
                if (response.data.files) {
                    console.log(response.data.files[0]);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
} else {
    const file = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append("file", file, {
        filename: path.basename(filePath),
        contentType: mime.getType(filePath),
        knownLength: fileSize,
    });
    axios
        .post(`${process.env.DOMAIN}/api/upload`, formData, {
            headers: {
                Authorization: process.env.TOKEN,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            if (response.data.files) {
                console.log(response.data.files[0]);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
