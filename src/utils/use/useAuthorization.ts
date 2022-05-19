export const useAuthorization = () => {
    const btnAuthorization = document.getElementById('btn-authorization');
    const formAuth = document.getElementById('form-authorization') as HTMLFormElement;
    if (btnAuthorization) {
        btnAuthorization.addEventListener('click', () => {
            const data = new FormData(formAuth);
            const result = {
                login: data.get('login'),
                password: data.get('password'),
            }
            console.log(result);
        })
    }
}