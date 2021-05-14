import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Character from './Character';
import { API_ENDPOINT } from '../constants'
import apiCache from '../apiCache';

const StyledCharacters = styled.div`
width: 500px;
`;

const Characters = (props) => {
	console.log(`Characters called`);

	const { pageNumber } = props;
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		console.log(`Characters useEffect called`);
		const fetchChars = async (pn) => {
			try {
				const response = await apiCache.get(getPageUrl(pn));
				setCharacters(response.data.results);
			} catch (error) {
				console.log(error);
				return [];
			}
		}

		fetchChars(pageNumber);
	}, [pageNumber]);

	return (
		<StyledCharacters>
			{characters.map(char => (
				<Character data={char} key={char.url} />
			))}
		</StyledCharacters>
	);
};

export default Characters;

function getPageUrl(pageNumber) {
	return `${API_ENDPOINT}/?page=${pageNumber}`;
}