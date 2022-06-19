export type PayloadSend = {
    content: string
    type: string
}

export type SocketMessageResponse = {
    chat_id: number
    content: string
    file: null
    id: number
    is_read: boolean
    time: string
    type: string
    user_id: number
    timeHuman?: string
}