export const useSendMessage = () => {
    const btnSendMessage = document.getElementById('send-message-btn');
    const inputMessage = document.getElementById('message-text') as HTMLInputElement;
    if (btnSendMessage) {
        btnSendMessage.addEventListener('click', () => {
            console.log({
                message: inputMessage?.value.trim()
            })
        })
    }
    if (inputMessage) {
        inputMessage.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log({
                    message: inputMessage?.value.trim()
                })
            }
        })
    }
}