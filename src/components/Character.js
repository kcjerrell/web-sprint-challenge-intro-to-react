import React, { useState } from 'react';
import styled from 'styled-components';
import ObjectDetails from './ObjectDetails';

// Write your Character component here

const StyledComp = styled.div`
	background-color: #dddddddd;
	color: black;
	margin: 5px;
	padding: 5px;
	border: black 1px solid;
`;

const Character = (props) => {
	console.log(`Character called`);
	const { name } = props.data;
	const keys =
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

	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<StyledComp onClick={()=>setIsExpanded(!isExpanded)}>
			<h3>{name}</h3>
			{isExpanded &&
				<ObjectDetails data={props.data} keys={keys} />}
		</StyledComp>
	);
};

export default Character;