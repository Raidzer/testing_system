import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";


export default function AdminTableBody(props) {
    const {
        rows,
        headCells,
        isSelected,
        handleClick
    } = props

    return (
        <TableBody
            sx={{
                width: "100%",
            }}
        >
            {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                        </TableCell>
                        {headCells.map((cell) => {
                            const value = row[cell.id]
                            return (
                                <TableCell
                                    key={cell.id}
                                    align="center"
                                >
                                    {value}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    )
}