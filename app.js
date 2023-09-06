import http from "node:http";
import fs from "fs/promises"; // Importer fs fra "fs/promises"

const app = http.createServer(async (request, response) => {
    // ROUTE: "/" - GET
    if (request.url === "/" && request.method === "GET") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        // Send en besked som response
        response.end("Working with HTTP Module and routing");
    }
    // ROUTE: "/users" - GET
    else if (request.url === "/users" && request.method === "GET") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        
            // Læs data fra data/posts.json ved hjælp af fs.readFile
            const json = await fs.readFile("data/users.json");
            // Send data fra filen som response
            response.end(json);
    }
    // ROUTE: "/posts" - GET
    else if (request.url === "/posts" && request.method === "GET") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");

            // Læs data fra data/posts.json ved hjælp af fs.readFile
            const json = await fs.readFile("data/posts.json");
            // Send data fra filen som response
            response.end(json);

    }
    // ROUTE: "/users" - POST
    else if (request.url === "/users" && request.method === "POST") {
        // Læse body fra request
        const requestBody = await getRequestData(request);
        // Parse til Javascript
        const user = JSON.parse(requestBody);
        // Tilføj dummy id
        user.id = new Date().getTime();
        // Læs alle users fra JSON
        const json = await fs.readFile("data/users.json");
        console.log(json);
        // Parse alle users til javascript
        const users = JSON.parse(json);
        console.log(users);
        // Tilføj "user" til "users"
        users.push(user);
        // Konverter users til JSON igen
        const usersJSON = JSON.stringify(users);
        // Skriv til JSON-fil
        await fs.writeFile("data/users.json", usersJSON);
        // Sæt statuskode og header
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        // Send users
        response.end(usersJSON);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Serveren kører på http://localhost:${port}`);
});

async function getRequestData(request) {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", chunk => (body += chunk));
        request.on("end", () => resolve(body));
        request.on("error", reject);
    });
}