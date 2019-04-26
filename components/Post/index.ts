import * as React from 'react';
import Author from './Author';
import Bottom from './Bottom';
import Menu from './Menu';
import ReactionButton from './ReactionButton';
import ShareButton from './ShareButton';

export default class extends React.Component {
  public static Bottom = Bottom;
  public static ReactionButton = ReactionButton;
  public static ShareButton = ShareButton;
  public static Author = Author;
  public static Menu = Menu;

  public render() {
    return null;
  }
}
