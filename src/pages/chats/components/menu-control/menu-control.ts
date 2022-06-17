import MenuControl from './MenuControl.hbs';
import Block from '../../../../utils/block/block';

type MenuProps = {
    events?: { [key: string]: () => void },
}

export default class menuControl extends Block<MenuProps> {

    constructor(props: MenuProps) {
        super(props);
    }


    render() {
        return this.compile(MenuControl, this.props);
    }
}
