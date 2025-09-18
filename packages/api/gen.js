import { generateApi } from 'swagger-typescript-api';
import path from 'path';

generateApi({
    output: path.resolve(process.cwd(), './src'),
    url: "http://localhost:3000/api-docs-json",
    name: 'index',
    httpClientType: 'axios',
    modular: false,
    templates: path.resolve(process.cwd(), './templates')
});