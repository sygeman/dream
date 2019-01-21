import * as React from 'react';
import Author from './Author';
import Bottom from './Bottom';
import CommentsButton from './CommentsButton';
import LikeButton from './LikeButton';
import Menu from './Menu';
import ShareButton from './ShareButton';

export default class extends React.Component {
  public static Bottom = Bottom;
  public static LikeButton = LikeButton;
  public static CommentsButton = CommentsButton;
  public static ShareButton = ShareButton;
  public static Author = Author;
  public static Menu = Menu;

  public render() {
    return null;
  }
}
