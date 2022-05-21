import error from './Error.hbs';
import './error.scss'
import Block from "../../utils/block/block";
import Link from "../../components/link/link";

const errorData = {
    link: {
        text: `Come back`,
        href: '/authorization',
        icon: '->',
    }
}

type ErrorProps = {
    statusError: string;
    messageError: string;
}

export default class ErrorPage extends Block {
    constructor(props: ErrorProps) {
        super({ ...props, link: new Link(errorData.link), });
    }

    render() {
        return this.compile(error, { ...this.props });
    }
}
