import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import apiCache from '../apiCache';

const StyledComp = styled.div`

`;

const Item = styled.div`
	display: flex;
	flex-direction: row;
`;

const Key = styled.div`
	width: 20%;
	text-align: right;
	font-weight: bold;
	margin: 2px;
`;

const Value = styled.div`
	flex-grow: 1;
	margin: 2px;
	text-align: left;
`;

const ObjectDetails = (props) => {
	console.log(`ObjectDetails called`);
	const { data, keys } = props;
	return (
		<StyledComp>

			{extract(data, keys).map(({ k, v }) => (
				<ObjectDetail name={k} value={v} />
			))
			}

		</StyledComp>
	);
};

const ObjectDetail = (props) => {
	console.log(`ObjectDetail called`);
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

const UnresolvedValue = (props) => {
	console.log(`UnresolvedValue called`);
	const { url } = props;
	const [value, setValue] = useState('...');

	useEffect(() => {
	console.log(`UnresolvedValue useEffect called`);
		apiCache.get(url).then(response => {
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

function formatKey(key) {
	return titleCased(key.replace('_', ' '));
}

function titleCased(text) {
	return text.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}