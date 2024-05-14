import cors from 'cors'
import express from 'express'
import { obj as userData } from './download.js';
const app = express();
const PORT = 3009;



// Middleware for CORS
app.use(cors());

// Endpoint for fetching users with pagination
app.get('/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const paginatedUsers = userData.results.slice(startIndex, endIndex);

    res.json({
        page,
        perPage,
        totalUsers: userData.info.results,
        totalPages: Math.ceil(userData.info.results / perPage),
        users: paginatedUsers
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
