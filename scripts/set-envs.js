const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/env/enviroment.ts';

const envFileContent = `
const env = {
    url_api: "${process.env['URL_API']}",
    grant_type: "${process.env['GRANT_TYPE']}",
    client_id: "${process.env['CLIENT_ID']}",
    client_secret: "${process.env['CLIENT_SECRET']}",
};

export const enviroment = env;
`;


mkdirSync('./src/env', { recursive: true });
writeFileSync(targetPath, envFileContent);
