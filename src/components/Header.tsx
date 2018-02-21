import * as React from 'react';
import * as styles from './Header.less';
import SearchBar from 'components/SearchBar';
import MenuButton from 'components/MenuButton';

interface IHeaderProps extends React.ClassAttributes<Header> {

}

class Header extends React.PureComponent<IHeaderProps, any> {
  public render() {
    return (
      <section className={ styles.header }>
        <MenuButton selected={ false } />
        <SearchBar />
      </section>
    )
  }
}

export default Header;