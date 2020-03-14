import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
    console.info(`Express server started on port ${PORT}`);
});
