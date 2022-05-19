export const useRegistration = () => {
    const btnRegistration = document.getElementById('btn-registration');
    const formReg = document.getElementById('form-registration') as HTMLFormElement;
    if (btnRegistration) {
        btnRegistration.addEventListener('click', () => {
            const data = new FormData(formReg);
            const result = {
                email: data.get('email'),
                login: data.get('login'),
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                telephone: data.get('telephone'),
                password: data.get('password'),
                passwordRepeat: data.get('passwordRepeat'),
            }
            console.log(result);
        })
    }
}