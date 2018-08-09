import state from './state';
import { BASENAME_HAS_BEEN_SET } from './message';

const Basename = {
    set(basename) {
        if (this.get())
            console.error(new Error(BASENAME_HAS_BEEN_SET));

        if (basename && !basename.startsWith('/'))
            basename = '/' + basename;

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
