export const useEditProfile = () => {
    const btnEditProfile = document.getElementById('btn-edit-profile');
    const formEdit = document.getElementById('form-edit-profile') as HTMLFormElement;
    if (btnEditProfile) {
        btnEditProfile.addEventListener('click', () => {
            const data = new FormData(formEdit);
            const result = {
                email: data.get('email'),
                login: data.get('login'),
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                telephone: data.get('telephone'),
            }
            console.log(result);
        })
    }
}