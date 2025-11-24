const app = require('../server/index');
const fs = require('fs');
const path = require('path');

// Vercel Serverless Function logic to handle SQLite
const dbPath = path.join(__dirname, '../server/prisma/dev.db');
const tmpDbPath = '/tmp/dev.db';

if (fs.existsSync(dbPath)) {
    if (!fs.existsSync(tmpDbPath)) {
        fs.copyFileSync(dbPath, tmpDbPath);
        console.log('Database copied to /tmp/dev.db');
    }
}

// Override DATABASE_URL to point to /tmp
process.env.DATABASE_URL = `file:${tmpDbPath}`;

module.exports = app;
