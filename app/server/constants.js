// file contains some constans that will be used elsewhere

import path from 'path';

// export const SOURCE_PATH = path.resolve('src');
export default path.resolve('app/server');

export const PUBLIC_PATH = path.resolve('client');
export const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;
