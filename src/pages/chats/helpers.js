"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataToChats = exports.getAvatar = exports.getTime = void 0;
const baseUrl = 'https://ya-praktikum.tech/api/v2/resources';
const getDate = (date) => {
    if (!date)
        return '';
    const currentDate = new Date();
    const newDate = new Date(date);
    if (newDate.getDate() === currentDate.getDate()) {
        return `${newDate.getHours()}:${newDate.getMinutes()}`;
    }
    if (currentDate.getDate() - newDate.getDate() === 1) {
        return 'Yesterday';
    }
    else {
        return newDate.getDate() + '.' + newDate.getMonth() + '.' + newDate.getFullYear();
    }
};
const getTime = (date) => {
    if (!date)
        return '';
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
};
exports.getTime = getTime;
const getAvatar = (src) => {
    return src ? `${baseUrl}/${src}` : 'https://cdn-icons-png.flaticon.com/512/18/18601.png';
};
exports.getAvatar = getAvatar;
const getDataToChats = (data) => {
    return data.map((chat) => ({
        ...chat,
        time: getDate(chat?.last_message?.time),
        avatar: (0, exports.getAvatar)(chat?.avatar ?? ''),
    }));
};
exports.getDataToChats = getDataToChats;
//# sourceMappingURL=helpers.js.map