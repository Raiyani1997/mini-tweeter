require('./utils/auth');

app.all('*', (request, response, next) => {
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(404).json({ message: 'Unauthorized request' });
    }
});
