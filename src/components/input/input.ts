import input from './Input.hbs';
import './input.scss';
import Block from "../../utils/block/block";
import errorValidation from "../error-validation/errorValidation";


type InputProps = {
    label: string,
    placeholder: string,
    name: string,
    type: string,
    className?: string,
    value?: string,
    validation?: { regex: RegExp, messageError: string }
    events?: { [key: string]: () => void },
}

export default class Input extends Block {

    constructor(props: InputProps) {

        super({
            ...props,
            className: '',
            error: new errorValidation({
                textError: props?.validation?.messageError
            }),
            events: {
                focusout: (event: any) => {
                    if (!event.target.value.match(props.validation?.regex)) {
                        this.addClassName('error')
                    } else {
                        this.removeClassName('error')
                    }
                }
            }
        });

    }

    addClassName(className: string) {
        this.getContent()?.classList.add(className);
        this.children.error.getContent()?.classList.add(className);
    }

    removeClassName(className: string) {
        this.getContent()?.classList.remove(className);
        this.children.error.getContent()?.classList.remove(className);
    }

    render() {
        return this.compile(input, { ...this.props });
    }

}
