import { ChatType } from "@/pages/chats/types";

const baseUrl = 'https://ya-praktikum.tech/api/v2/resources'


const getDate = (date: string | undefined) => {
    if (!date) return ''
    const currentDate = new Date();
    const newDate = new Date(date);
    if (newDate.getDate() === currentDate.getDate()) {
        return `${newDate.getHours()}:${newDate.getMinutes()}`;
    }
    if (currentDate.getDate() - newDate.getDate() === 1) {
        return 'Yesterday'
    } else {
        return newDate.getDate() + '.' + newDate.getMonth() + '.' + newDate.getFullYear();
    }
}

export const getTime = (date: string | undefined) => {
    if (!date) return ''
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
}

export const getAvatar = (src: string): string => {
    return src ? `${baseUrl}/${src}` : 'https://cdn-icons-png.flaticon.com/512/18/18601.png'
}

export const getDataToChats = (data: ChatType[]): ChatType[] => {
    return data.map((chat) => ({
        ...chat,
        time: getDate(chat?.last_message?.time),
        avatar: getAvatar(chat?.avatar ?? ''),
    }))
}