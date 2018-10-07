const proxy = {};

window.addEventListener('popstate', () => {
    const { router } = proxy;
    if (router) router.update(
        router.location,
        router.queue.pop(),
    );
});

export default proxy;
