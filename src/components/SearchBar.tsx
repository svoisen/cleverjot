import * as React from 'react';
import * as styles from './SearchBar.less';

interface ISearchBarProps extends React.ClassAttributes<SearchBar> {

}

class SearchBar extends React.PureComponent<ISearchBarProps, any> {
  public render() {
    return (
      <div className={ styles.searchBar }>
      </div>
    )
  }
}

export default SearchBar;