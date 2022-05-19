export const useEditPassword = () => {
    const btnEditPassword = document.getElementById('btn-edit-password');
    const formEdit = document.getElementById('form-edit-password') as HTMLFormElement;
    if (btnEditPassword) {
        btnEditPassword.addEventListener('click', () => {
            const data = new FormData(formEdit);
            const result = {
                oldPassword: data.get('old_password'),
                newPassword: data.get('new_password'),
            }
            console.log(result);
        })
    }
}