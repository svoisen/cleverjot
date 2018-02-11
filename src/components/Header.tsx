import * as React from 'react';
import * as styles from './Header.less';

interface IHeaderProps extends React.ClassAttributes<Header> {

}

class Header extends React.PureComponent<IHeaderProps, any> {
  public render() {
    return (
      <section className={ styles.header }>
      </section>
    )
  }
}

export default Header;