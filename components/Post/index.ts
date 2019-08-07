import * as React from 'react';
import Author from './Author';
import Bottom from './Bottom';
import Menu from './Menu';
import ShareButton from './ShareButton';

export default class extends React.Component {
  public static Bottom = Bottom;
  public static ShareButton = ShareButton;
  public static Author = Author;
  public static Menu = Menu;

  public render() {
    return null;
  }
}
