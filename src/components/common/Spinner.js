import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <tbody>
    <tr>
    	<td>
    	</td>
    	<td>
    	</td>
      <img
        src={spinner}
        style={{ width: '200px', paddingTop:'10px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
      </tr>
    </tbody>
  );
};
