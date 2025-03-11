import { Input } from 'antd';
import './Input.css';

function Search({ query, onSubmit, onChange }) {
  return (
    <form className="search" onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <Input placeholder="movie name" value={query} onChange={onChange} />
    </form>
  );
}

export default Search;
