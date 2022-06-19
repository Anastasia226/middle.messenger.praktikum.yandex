import error from './Error.hbs';
import './error.scss'
import Block from "../../utils/block/block";
import Link from "../../components/link/link";
import { Router } from "../../utils/router/router";

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
    router: Router;

    constructor(props: ErrorProps) {
        super({
            ...props, link: new Link({
                ...errorData.link, events: {
                    click: () => {
                        this.router.back();
                    },
                }
            }),
        });
        this.router = new Router();
    }

    render() {
        return this.compile(error, { ...this.props });
    }
}
