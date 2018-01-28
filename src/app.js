import React, {PureComponent} from 'react';
import {
	CELLNUMBER,
	CELLNUMBERVERTICAL,
	START,
	END,
	BOULDER,
	GRAVEL,
	WORMHOLE_ENTRANCE,
	WORMHOLE_EXIT
} from './utils/constants.js';
import Settings from './components/settings';
import Message from './components/message';
import Grid from './components/grid';
import './style/app.css';

const Graph = require('node-dijkstra');

const initialSettings = {
	start: null,
	end: null,
	highlight: [],
	boulder: [],
	gravel: [],
	wormhole: {
		entrance: [],
		exit: []
	}
};

export default class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			route: new Graph(),
			message: 'default',
			...initialSettings
		}
	};

	componentDidMount() {
		this.createGraph();
	}

	isSpecialCell(special, node) {
		if (special.indexOf(node) !== -1) {
			return true;
		}
		return false;
	}

	obstacleChecker(item) {
		const {boulder, gravel} = this.state;

		if (boulder.indexOf(item) === -1 && gravel.indexOf(item) === -1) {
			return true;
		}
		return false;
	}

	wormholeExists() {
		const {entrance, exit} = this.state.wormhole;
		if (entrance.length > 0 && exit.length > 0) {
			return true;
		}
		return false;
	}

	wormholeEdges() {
		const exit = this.state.wormhole.exit;
		let edges = {};

		for (let i = 0; i < exit.length; i++) {
			let edge = exit[i];
			edges[edge] = 1;
		}
		return edges;
	}

	examineEdges(neighbougrs) {
		const gravel = this.state.gravel;
		let edges = {};

		for (let i = 0; i < neighbougrs.length; i++) {
			const edge = 'k' + neighbougrs[i];

			// if edge is not obstacle
			if (this.obstacleChecker(edge)) {
				edges[edge] = 1;
			} else {
				// if edge is a gravel
				if (this.isSpecialCell(gravel, edge)) {
					edges[edge] = 2;
				}
				// if edge is boulder do nothing
			}
		}
		return edges;
	}

	collectEdges(item, neighbougrs) {
		const {boulder, gravel, wormhole} = this.state;
		const wormholePresent = this.wormholeExists();
		const node = {};

		node.id = item;

		// if item is not obstacle
		if (this.obstacleChecker(item)) {
			node.edges = this.examineEdges(neighbougrs);
		}

		// if item is a boulder
		if (this.isSpecialCell(boulder, item)) {
			node.edges = {};
		}

		// if item is a gravel
		if (this.isSpecialCell(gravel, item)) {
			let edges = {};

			for (let i = 0; i < neighbougrs.length; i++) {
				const edge = 'k' + neighbougrs[i];

				// if edge is not a boulder add double cost
				if (!this.isSpecialCell(boulder, edge)) {
					edges[edge] = 2;
				}
			}
			node.edges = edges;
		}
		// if item is a wormhole entrance
		if (wormholePresent && this.isSpecialCell(wormhole.entrance, item)) {
			const edges = this.examineEdges(neighbougrs);

			const wormholeEdges = this.wormholeEdges();
			const newEdges = {
				...edges,
				...wormholeEdges
			};

			node.edges = newEdges;
		}
		return node;
	}

	createGraph() {
		const defaultGridSize = CELLNUMBER * CELLNUMBERVERTICAL;

		for (let i = 0; i < defaultGridSize; i++) {
			const item = 'k' + i;
			const directions = {};
			// left neighbour if not edge
			if (i % CELLNUMBER !== 0) {
				directions.left = i - 1;
			}
			// right neighbour if not edge
			if (i % CELLNUMBER !== (CELLNUMBER - 1)) {
				directions.right = i + 1;
			}
			// up,down neighbour anyway
			directions.up = i - CELLNUMBER;
			directions.down = i + CELLNUMBER;

			// ONLY inside the grid
			const neighbougrs = Object.values(directions).filter((direction, index) => {
				if (direction >= 0 && direction < defaultGridSize) {
					return true;
				}
				return false;
			});
			//who are the neighbougrs of this node
			const node = this.collectEdges(item, neighbougrs);
			const newGraph = this.state.route.addNode(node.id, node.edges)

			this.setState({route: newGraph});
		}
	}

	setObstracleSettings(action, value, oldId) {
		const {boulder, gravel} = this.state;
		let newObstacle = action === BOULDER
			? boulder
			: gravel;
		// if exists -> update
		if (oldId) {
			const index = newObstacle.indexOf(oldId);
			newObstacle[index] = value;
			// not exists -> create
		} else {
			newObstacle = newObstacle.concat(value);
		}

		return newObstacle;
	}

	setWormholeSettings(action, value, oldId) {
		const {entrance, exit} = this.state.wormhole;
		const newObstacleValue = action === WORMHOLE_ENTRANCE
			? entrance
			: exit;
		let newWormhole = {};

		if (oldId) {
			const index = newObstacleValue.indexOf(oldId);
			newObstacleValue[index] = value;
			newWormhole[action] = newObstacleValue;
		} else {
			newWormhole[action] = newObstacleValue.concat(value);
		}

		return newWormhole;
	}

	defineSettings = (e) => {
		const action = e.action;
		const value = e.id;
		const oldValue = e.oldId;
		let newSettings = {};

		if (action === START || action === END) {
			//create always
			newSettings[action] = value;
		}
		// obstacles
		if (action === BOULDER || action === GRAVEL) {
			newSettings[action] = this.setObstracleSettings(action, value, oldValue);
		}
		// wormholes
		if (action === WORMHOLE_ENTRANCE || action === WORMHOLE_EXIT) {
			let newWormhole = this.setWormholeSettings(action, value, oldValue);

			newSettings = {
				...this.state,
				wormhole: {
					...this.state.wormhole,
					...newWormhole
				}
			}
		}

		this.setState(newSettings, () => {
			console.log('NEWSTATE', this.state);
			this.createGraph()
		});
	}

	getTheShortestRoute = () => {
		const {route, start, end} = this.state;

		if (start && end) {
			const highlight = route.path(start, end);

			if (highlight) {
				return this.setState({highlight, message: 'result'});
			}
			return this.setState({message: 'noroute'});
		}
		return this.setState({message: 'required'});
	}

	clearGrid = () => {
		this.setState({
			...initialSettings,
			message: 'default'
		});
	}

	render() {
		const {
			message,
			start,
			end,
			highlight,
			boulder,
			gravel,
			wormhole
		} = this.state;

		return (
			<div className="App">
				<header className="App-controll">
					<Message message={message}/>
					<button className="btn-cta primary" onClick={this.getTheShortestRoute}>Show the shortest route</button>
					<button className="btn-cta" onClick={this.clearGrid}>Clear the grid</button>
					<Settings/>
				</header>
				<section className="App-content">
					<Grid
						grid={this.state.route}
						start={start}
						end={end}
						highlight={highlight}
						boulder={boulder}
						gravel={gravel}
						wormhole={wormhole}
						sendSettings={this.defineSettings}/>
				</section>
			</div>
		);
	}
};
