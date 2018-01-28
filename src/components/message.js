import React from 'react';
import '../style/message.css';

const Message = ({message}) => {
	const messages = {
		default: 'drop 1 start and 1 target elements at least to the grid, drop any number of ob' +
				'stacle, click to button to show the fastest route',
		required: 'start and target elements are required',
		noroute: 'no route to your target :(',
		result: 'here is your fastest route'
	}

	return (
		<div className="message">
			<div className={message}>
				{messages[message]}
			</div>
		</div>
	);
};

export default Message;
