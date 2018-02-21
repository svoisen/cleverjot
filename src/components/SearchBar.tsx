import * as React from 'react';
import * as styles from './SearchBar.less';

const faSearch = require('@fortawesome/fontawesome-free-solid/faSearch');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome');

interface ISearchBarProps extends React.ClassAttributes<SearchBar> {

}

class SearchBar extends React.PureComponent<ISearchBarProps, any> {
  public render() {
    return (
      <div className={ styles.searchBar }>
        <FontAwesomeIcon className={ styles.searchBarIcon } icon={ faSearch } />
        <input className={ styles.searchBarInput } type="text" placeholder="Search or create note" />
      </div>
    )
  }
}

export default SearchBar;