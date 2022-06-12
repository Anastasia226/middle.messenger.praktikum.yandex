import link from './Link.hbs';
import Block from "../../utils/block/block";

type LinkProps = {
    text: string;
    icon?: string;
    events?: { [key: string]: () => void };
}

export default class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return this.compile(link, { ...this.props });
    }
}
