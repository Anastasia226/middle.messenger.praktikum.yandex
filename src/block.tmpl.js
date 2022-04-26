// block.tmpl.js

window.blockTemplate = (function() {
    return `
<!-- Можно {{}} с пробелами, можно без-->
<div class="{{ className }}">
    <span onClick="{{ handleClick }}">{{text}}</span>
    <span>{{ user.info.firstName }}</span>
</div>
`;
})();

const obj = {
    data: {
        first: 'Vladislav',
        second: true,
    },
};

function get(obj, path) {
    const keys = path.split('.');
    return keys.reduce((result, key) => result[key], obj);
};

get(obj, 'data.first'); // 'Vladislav'
get(obj, 'data.third'); // undefined
get(obj, 'data.third', 'defaultValue'); // 'defaultValue'

