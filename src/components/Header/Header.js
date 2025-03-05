import Search from '../Input';

function Header({ query, onSubmit, onChange }) {
  return (
    <header>
      <Search query={query} onSubmit={onSubmit} onChange={onChange} />
    </header>
  );
}

export default Header;
