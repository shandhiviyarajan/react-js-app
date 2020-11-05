const TableRow = ({ selected, id, name, handleSelect }) => {
    console.log(`render TableRow :: ${id} :: ${name}`);
    return (
      <tr>
        <td>
          <input 
            name={id} 
            type="checkbox" 
            checked={selected} 
            onChange={handleSelect} 
          />
        </td>
        <td>{id}</td>
        <td>{name}</td>
      </tr>
    );
  }
  
  TableRow.defaultProps = {
    selected: false
  }
  