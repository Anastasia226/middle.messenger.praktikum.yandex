import { LoginAPI } from "@/api/user/user-login";

interface LoginFormModel {
    email: string;
    password: string;
}

// controllers/user-login.ts

const loginApi = new LoginAPI();

// const userLoginValidator = validateLoginFields(validateRules);

export class UserLoginController {
    public async login(data: LoginFormModel) {
        try {
            // Запускаем крутилку

            // const validateData = userLoginValidator(data);
            //
            // if (!validateData.isCorrect) {
            //     throw new Error(validateData);
            // }

            const userID = loginApi.request(data);

            //  RouteManagement.go('/chats');

            // Останавливаем крутилку
        } catch (error) {
            // Логика обработки ошибок
        }
    }
}