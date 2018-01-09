import base from './base';
import dev from './dev';
import prod from './production';

// Very simple config management. Will be updated.
const env = process.env.NODE_ENV || 'development';
const envConfig = env === 'development' ? dev : prod;
const config = Object.assign({}, base, envConfig);

export default config;
