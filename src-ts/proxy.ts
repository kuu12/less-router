import { Router } from './router';

const proxy: { router?: Router } = {};

window.addEventListener('popstate', () => {
    const { router } = proxy;
    if (router) router.update(
        router.location,
        router.queue.pop(),
    );
});

export default proxy;
