import input from './Input.hbs';
import './input.scss';
import Block from "../../services/block";


type InputProps = {
    label: string,
    placeholder: string,
    name: string,
    type: string,
    value?: string,
    events?: { [key: string]: () => void },
}

export default class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(input, { ...this.props });
    }
}
