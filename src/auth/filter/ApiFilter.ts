export function ApiFilter(req, res, next) {
    console.log('In Api Filter: Requesting URL: ', req.url, ': ', req.method);
    next();
};