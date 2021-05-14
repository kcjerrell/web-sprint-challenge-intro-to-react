import React from 'react';
import styled from 'styled-components';
import Character from './Character';

const StyledCharacters = styled.div`
width: 500px;
`;

const Characters = (props) => {
	const { data } = props;

	return (
		<StyledCharacters>
			<h1 className="Header">Characters</h1>
			{data.map(char => (
				<Character data={char} key={char.url} />
			))}
		</StyledCharacters>
	);
};

export default Characters;