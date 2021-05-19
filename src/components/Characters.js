import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Character from './Character';
import { API_ENDPOINT } from '../constants'
import apiCache from '../apiCache';

// Styled component
const StyledCharacters = styled.div`
	width: 500px;
`;

// Creates a single column list of characters bound to one page of
// the api results
const Characters = (props) => {
	const { pageNumber } = props;
	const [characters, setCharacters] = useState([]);

	// Requests the specified page on first render, and whenever pageNumber changes
	useEffect(() => {

		// async helper function to fetch the characters from a specified page
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

// forms the proper URL for fetching a specific page from the API
function getPageUrl(pageNumber) {
	return `${API_ENDPOINT}/?page=${pageNumber}`;
}
