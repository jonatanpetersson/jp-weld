import { FileFormat } from './enums';

export interface Component {
  [key: string]: string;
}

export interface Components {
  [FileFormat.Html]: Component;
  [FileFormat.Css]: Component;
  [FileFormat.Js]: Component;
}

export interface Config {
  input?: string;
  output?: string;
  netlify: {
    _redirects?: boolean;
  };
}
