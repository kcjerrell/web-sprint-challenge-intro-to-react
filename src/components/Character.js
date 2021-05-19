import React, { useState } from 'react';
import styled from 'styled-components';
import ObjectDetails from './ObjectDetails';

// This is a list of keys we are interested in displaying
// This also specifies the list order
const detailKeys =
	[
		"species",
		"gender",
		"birth_year",
		"homeworld",
		"height",
		"mass",
		"hair_color",
		"skin_color",
		"eye_color",
		"films",
		"vehicles",
		"starships"
	];

// Styled component
const CharacterStyled = styled.div`
	margin: 5px;
	padding: 5px;
	border: black 1px solid;
  border-radius: 3px;
  font-size: large;
  background-color: ${props => props.isExpanded ? "#d2d2d2dd" : "#ccccccbb"};
  color: #111111;

  &:hover {
    background-color: #dddddddd;
  }
`;

// Creates a Character component
const Character = (props) => {
	const { name } = props.data;

	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<CharacterStyled isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
			<h3>{name}</h3>
			{isExpanded &&
				<ObjectDetails data={props.data} keys={detailKeys} />}
		</CharacterStyled>
	);
};

export default Character;
