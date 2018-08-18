import state from './state';
import { addHeadRemoveTail } from './path';
import { BASENAME } from './message';

const Basename = {
    set(basename) {
        if (this.get())
            console.error(new Error(BASENAME));

        basename = basename && addHeadRemoveTail(basename);

        if ('pushState' in history)
            state.basename = basename;
        else
            sessionStorage.setItem('routerBasename', basename);
    },
    get: () => 'pushState' in history
        ? state.basename
        : sessionStorage.getItem('routerBasename'),
};

export default Basename;
