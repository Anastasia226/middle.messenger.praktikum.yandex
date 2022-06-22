import inputFile from './InputFile.hbs';
import Block from '../../utils/block/block';
import { userSettingsAPI } from '../../api/user/user';

type FileInputProps = {
    events?: { [key: string]: () => void },
}

export default class InputFile extends Block {
  controller: userSettingsAPI;

  constructor(props: FileInputProps) {
    super(props);
    this.controller = new userSettingsAPI();
  }

  render() {
    return this.compile(inputFile, { ...this.props });
  }
}
