import buttonCircle from './ButtonCircle.hbs';
import Block from '../../../utils/block/block';
import './button-circle.scss';

type ButtonProps = {
    id: string,
    events?: { [key: string]: () => void },
}

export default class ButtonCircle extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(buttonCircle, { ...this.props });
  }
}
