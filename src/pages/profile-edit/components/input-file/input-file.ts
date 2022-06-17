import inputFile from './InputFile.hbs';
import Block from "../../../../utils/block/block";
import { userSettingsAPI } from "../../../../api/user/user";


export default class InputFile extends Block {
    controller: userSettingsAPI;

    constructor() {
        super({
            events: {
                change: () => {
                    const myUserForm = document.getElementById('myUserForm') as HTMLFormElement;
                    const form = new FormData(myUserForm);
                    console.log(form)
                    this.controller.updateProfileAvatar(form).then(() => {
                        alert('Avatar changed')
                    });
                }
            }
        });
        this.controller = new userSettingsAPI();
    }

    render() {
        return this.compile(inputFile, { ...this.props });
    }

}
