import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import apiCache from '../apiCache';

// Styled component
const DetailsStyled = styled.div`

`;

// Styled object detail item container
const Item = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #22222211;
	margin: 2px 0;
	padding: 2px;
`;

// Styled detail key element
const Key = styled.div`
	width: 20%;
	text-align: right;
	font-weight: bold;
	margin: 0 5px;
	font-size: smaller;
`;

// Styled detail value element
const Value = styled.div`
	flex-grow: 1;
	margin: 0 5px;
	text-align: left;
`;

// Creates an ObjectDetails component which formats and presents specified object properties
// Could be expanded to cover different objects
// Could implement recursion to display deeply nested objects
const ObjectDetails = (props) => {
	const { data, keys } = props;

	return (
		<DetailsStyled>
			{extract(data, keys).map(({ k, v }) => (
				<ObjectDetail name={k} value={v} />
			))
			}
		</DetailsStyled>
	);
};

// Creates a single detail component for displaying a specific object property
// Probably ony works for strings, numbers, and simple arrays. Be careful using it on anything else
// If the value for the specified property represents another API call, a blank element will be returned
// while more useful information is resolved
const ObjectDetail = (props) => {
	const { name, value } = props;

	// Returns a div with each array item if value is an array
	if (Array.isArray(value)) {
		return (
			<Item>
				<Key>{name}:</Key>
				<div>
					{value.map((v, i) => {
						return v.slice(0, 7) === 'http://'
							? <UnresolvedValue url={v} key={i} />
							: <Value key={i}>{titleCased(v)}</Value>
					})}
				</div>
			</Item>
		);
	}

	// returns value as a single div
	else {
		return (
			<Item>
				<Key>{name}:</Key>
				{value.slice(0, 7) === 'http://'
					? (<UnresolvedValue url={value} />)
					: <Value>{titleCased(value)}</Value>
				}
			</Item>
		);
	}
};

// Creates an empty detail value component
// The value will be updated and displayed once the provided API request is ready
const UnresolvedValue = (props) => {
	const { url } = props;
	const [value, setValue] = useState('...');

	useEffect(() => {
		apiCache.get(url).then(response => {
			// For the star wars characters, details that return a url instead of a readable
			// value include: species, vehicles, ships, homeworld, and films. The API request is made
			// and this component will display either the 'name' property or 'title' property.
			if (response.data.name)
				setValue(response.data.name);
			else if (response.data.title)
				setValue(response.data.title);
		}, reason => console.log(reason));
	}, [url])

	return (
		<Value>{value}</Value>
	);
};

export default ObjectDetails;

// helper function gathers the desired properties from the given object
// returns an array of { k, v } objects, formatted for display
function extract(data, keys) {
	const kv = [];

	for (const key of keys) {
		if (Object.hasOwnProperty.call(data, key)) {
			if (data[key].length > 0)
				kv.push({ k: formatKey(key), v: data[key] });
		}
	}

	return kv;
}

// helper function for preparing keys and values for display
// replaces underscores with spaces and title cases every word
function formatKey(key) {
	return titleCased(key.replace('_', ' '));
}

// helper function for title casing all words in a string
function titleCased(text) {
	return text.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}