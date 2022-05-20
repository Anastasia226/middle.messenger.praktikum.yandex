import button from './Button.hbs';
import Block from "../../services/block";

type ButtonProps = {
    id: string,
    value: string,
    events?: { [key: string]: () => void },
}

export default class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(button, { ...this.props });
    }
}
