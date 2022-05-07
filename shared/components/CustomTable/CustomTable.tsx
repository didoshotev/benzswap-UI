import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classes from "./custom-table.module.scss";
import { Box } from '@mui/material';

import { ChainId, Token } from '@uniswap/sdk'


function createData(
	name: string,
	price: number,
	priceChange: number,
	volume: number,
	TVL: number,
) {
	return { name, price, priceChange, volume, TVL };
}

const rows = [
	createData('Ether', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const CustomTable = () => {
	
	const handleRowClick = () => {
		console.log('clicked');
	}

	React.useEffect(() => { 
		const chainId = ChainId.MAINNET;
		console.log('chainId: ', chainId);
	}, [])
	
	return (
		<TableContainer
			sx={{
				borderRadius: '24px',
				backgroundColor: "transparent",
			}}
			component={Paper}
		>
			<Table sx={{ minWidth: 650, backgroundColor: "#2C2D3A" }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className={classes["column-cell"]}>
							<Box display="inline" mr={2}>#</Box>
							Name
						</TableCell>
						<TableCell className={classes["column-cell"]} align="center">Price</TableCell>
						<TableCell className={classes["column-cell"]} align="center">Price Change</TableCell>
						<TableCell className={classes["column-cell"]} align="center">Volume 24&nbsp;H</TableCell>
						<TableCell className={classes["column-cell"]} align="center">TVL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow

							key={row.name}
							onClick={handleRowClick}
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
								'&:hover': { backgroundColor: '#323748'},
								cursor: "pointer"
							}}
						>
							<TableCell className={classes.cell} sx={{ color: "#cfd2de", fontSize: "17px", fontWeight: "700" }} component="th" scope="row">
								<Box display="inline" pr={2}>
									{index+1}.
								</Box>
								{row.name}
							</TableCell>
							<TableCell className={classes.cell} sx={{ color: "#b7bbcd", fontSize: "17px", fontWeight: "500" }} align="center">{row.price}</TableCell>
							<TableCell className={classes.cell} sx={{ color: "#b7bbcd", fontSize: "17px", fontWeight: "500" }} align="center">{row.priceChange}</TableCell>
							<TableCell className={classes.cell} sx={{ color: "#b7bbcd", fontSize: "17px", fontWeight: "500" }} align="center">{row.volume}</TableCell>
							<TableCell className={classes.cell} sx={{ color: "#b7bbcd", fontSize: "17px", fontWeight: "500" }} align="center">{row.TVL}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
