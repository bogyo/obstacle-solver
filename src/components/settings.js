import React from 'react';
import {
	START,
	END,
	BOULDER,
	GRAVEL,
	WORMHOLE_ENTRANCE,
	WORMHOLE_EXIT
} from '../utils/constants.js';

import '../style/settings.css';

const Settings = () => {

	const onDragStart = (action, ev) => {
		ev.dataTransfer.setData('action', action);
	}

	return (
		<div className="settings">
			<div>
				<div
					className="action"
					draggable="true"
					onDragStart={onDragStart.bind(this, BOULDER)}>boulder</div>
				<div
					className="action"
					draggable="true"
					onDragStart={onDragStart.bind(this, GRAVEL)}>gravel</div>
				<div
					className="action"
					draggable="true"
					onDragStart={onDragStart.bind(this, WORMHOLE_ENTRANCE)}>wormhole entrance</div>
				<div
					className="action"
					draggable="true"
					onDragStart={onDragStart.bind(this, WORMHOLE_EXIT)}>wormhole exit</div>
			</div>
			<div>
				<div
					className="action primary"
					draggable="true"
					onDragStart={onDragStart.bind(this, START)}>start</div>
				<div
					className="action primary"
					draggable="true"
					onDragStart={onDragStart.bind(this, END)}>target</div>
			</div>
		</div>
	);
};

export default Settings;
