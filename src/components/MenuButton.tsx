import * as React from 'react';
import * as styles from './MenuButton.less';

const faBars = require('@fortawesome/fontawesome-free-solid/faBars');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome');

interface IMenuButtonProps {
  selected: boolean;
}

const MenuButton: React.SFC<IMenuButtonProps> = (props: IMenuButtonProps) => {
  const classNames = [styles.menuButton];
  if (props.selected) {
    classNames.push(styles.menuButton__selected);
  }

  return (
    <div className={ classNames.join(' ') }>
      <FontAwesomeIcon icon={ faBars } size="lg" />
    </div>
  );
};

export default MenuButton;