import React, {PureComponent} from 'react';
import {
	CELLSIZE,
	CELLNUMBER,
	CELLNUMBERVERTICAL,
	START,
	END,
	BOULDER,
	GRAVEL,
	WORMHOLE_ENTRANCE,
	WORMHOLE_EXIT,
	HIGHLIGHT
} from '../utils/constants.js';
import '../style/grid.css';

class Grid extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
		this.grid = Array.from(
			new Array(CELLNUMBER * CELLNUMBERVERTICAL),
			(val, index) => 'k' + index
		);
	}

	allowDrop(e) {
		e.preventDefault();
	}

	onDrop(e) {
		const {id} = e.target;

		this.props.sendSettings(
			{action: e.dataTransfer.getData("action"), id, oldId: this.state.selected}
		);
		return this.setState({selected: null});
	}

	onDragStart(action, ev) {
		ev.dataTransfer.setData("action", action);
		this.setState({selected: null});
	}

	onDragStartObstacles(action, ev) {
		const id = ev.target.id;

		ev.dataTransfer.setData("action", action)
		this.setState({selected: id});
	}

	cellTemplate(type, id, cb) {
		const className = `${type} special`;

		return (
			<div
				className={className}
				id={id}
				draggable="true"
				onDragStart={cb.bind(this, type)}></div>
		)
	};

	isSpecialCell(special, node) {
		if (special.indexOf(node) !== -1) {
			return true;
		}
		return false;
	}

	renderCell(node) {
		const {start, end, boulder, gravel, wormhole} = this.props;

		if (node === start) {
			return this.cellTemplate(START, node, this.onDragStart);
		}

		if (node === end) {
			return this.cellTemplate(END, node, this.onDragStart);
		}

		if (this.isSpecialCell(boulder, node)) {
			return this.cellTemplate(BOULDER, node, this.onDragStartObstacles);
		}

		if (this.isSpecialCell(gravel, node)) {
			return this.cellTemplate(GRAVEL, node, this.onDragStartObstacles);
		}

		if (this.isSpecialCell(wormhole.entrance, node)) {
			return this.cellTemplate(WORMHOLE_ENTRANCE, node, this.onDragStartObstacles);
		}

		if (this.isSpecialCell(wormhole.exit, node)) {
			return this.cellTemplate(WORMHOLE_EXIT, node, this.onDragStartObstacles);
		}
	}

	render() {
		const gridStyle = {
			width: CELLNUMBER * CELLSIZE + CELLNUMBER * 2,
			height: CELLNUMBERVERTICAL * CELLSIZE + CELLNUMBERVERTICAL * 2
		};

		const cellStyle = {
			width: CELLSIZE,
			height: CELLSIZE
		};
		return (
			<div className="grid" style={gridStyle}>
				{
					this.grid.map((node, index) => {
						const highlight = this.props.highlight;
						const cellClass = this.isSpecialCell(highlight, node)
							? `${HIGHLIGHT} cell`
							: 'cell';

						return <div
							key={index}
							id={node}
							className={cellClass}
							style={cellStyle}
							onDragOver={this.allowDrop}
							onDrop={this.onDrop.bind(this)}>
							{this.renderCell(node)}
						</div>
					})
				}
			</div>
		);
	}
}

export default Grid;
