export type ChatType = {
    "id": number,
    "title": string,
    "avatar": string | null,
    "unread_count": number,
    created_by: number,
    "last_message": {
        "user": {
            "first_name": string,
            "second_name": string,
            "avatar": string,
            "email": string,
            "login": string,
            "phone": string,
        },
        "time": string,
        "content": string,
    } | null
}

export type ChatsType = {
    buttonSend: {
        id: string,
    },
    activeChat: any,
    chats: ChatType[] // change type
}