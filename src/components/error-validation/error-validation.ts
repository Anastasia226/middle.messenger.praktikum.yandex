import errorValidation from './ErrorValidation.hbs';
import Block from '../../utils/block/block';
import './error-validation.scss';

type ErrorValidationProps = {
    textError?: string,
}

export default class ErrorValidation extends Block {
  constructor(props: ErrorValidationProps) {
    super(props);
  }

  render() {
    return this.compile(errorValidation, { ...this.props });
  }
}
