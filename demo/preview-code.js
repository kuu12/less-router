const preview = code => {
    {
        const pre = document.getElementById('code');
        if (pre) pre.remove();
    }
    if (code) {
        const pre = document.createElement('pre');
        pre.id = 'code';
        pre.className = 'prettyprint';
        pre.innerText = code;
        document.body.appendChild(pre);
        if (window.PR) window.PR.prettyPrint();
    }
};

export default preview;
