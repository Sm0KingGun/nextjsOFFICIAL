import fs from "fs";
import path from "path";

// Fonction pour retourner une API:
export default function handler(req, res) {
    if (req.method === "GET") {
        // Le chemin vers mon API:
        const filePath = path.join(process.cwd(), "data", "articles.json");
        // Lire mon API:
        const fileData = fs.readFileSync(filePath);
        // Transformation des données de mon API en JavaScript:
        const data = JSON.parse(fileData);
        // Message:
        res.status(200).json(data);
    } else if (req.method === "POST") {
        const userId = req.body.userId;
        // const id = data.+1;
        const id = req.body.id;
        const image = req.body.image;
        const title = req.body.title;
        const body = req.body.body;

        const filePath = path.join(process.cwd(), "data", "articles.json");
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData);
        const nbObjt = data.length;

        const newArticle = {
            userId: userId,
            id: nbObjt + 1,
            image: image,
            title: title,
            body: body,
        };
        data.push(newArticle);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({ message: "Succès!" });
    }
}