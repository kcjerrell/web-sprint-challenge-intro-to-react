import React from 'react';
import styled from 'styled-components';

// Write your Character component here

const StyledComp = styled.div`

`;

const Character = (props) => {
	const { name } = props.data;

	return (
		<StyledComp>
			{name}
	</StyledComp>
);
};

export default Character;