import { useState, useEffect, useMemo, Fragment } from "react";
import { DataGrid, GridColDef, GridColumnMenuProps, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import { Box, Button, Switch, Typography } from "@mui/material";
import styles from "./styles.module.scss";

interface DataTableProps {
	data: any[];
	columns: GridColDef[];
	paginationModel?: any;
	setPaginationModel?: (paginationModel: any) => void;
	sortingModel?: any;
	setSortingModel?: (sortingModel: any) => void;
	header?: string | JSX.Element;
	handleRefresh?: () => void;
	showSearch?: boolean;
	onSearch?: () => void;
	checkOnlyMe?: boolean;
	handleOnlyMe?: () => void;
	searchString?: string;
	searchSelectedKey?: string;
	loading?: boolean;
	minHeight?: number | string;
	maxHeight?: number | string;
	maxWidth?: number | string;
	pageSize?: number;
	disableRowSelectionOnClick?: boolean;
	rowId?: string;
	className?: string;
	height?: number | string;
	hideToolbar?: boolean;
	hideFooter?: boolean;
	children?: any;
	[key: string]: any;
}

/**
 * DataTable component
 * @description - Component to display data in a table
 * @param data - Data to be displayed in the table
 * @param columns - Columns to be displayed in the table
 * @param paginationModel - Pagination model of the table
 * @param setPaginationModel - Function to set pagination model of the table
 * @param sortingModel - Sorting model of the table
 * @param setSortingModel - Function to set sorting model of the table
 * @param header - Header of the table
 * @param handleRefresh - Function to handle refresh button click
 * @param loading - Loading state of the table
 * @param minHeight - Minimum height of the table
 * @param maxHeight - Maximum height of the table
 * @param maxWidth - Maximum width of the table
 * @param pageSize - Page size of the table
 * @param disableRowSelectionOnClick - Disable row selection on click
 * @param rowId - Specify unique field name for indexing rows
 * @param className - Class name of the table holder
 * @param height - hieght of the table
 * @param hideToolbar - Hide toolbar of the table
 * @param children - Children of the component
 */
export default function DataTable({
	data,
	columns,
	loading,
	header,
	handleRefresh,
	paginationModel,
	setPaginationModel,
	sortingModel,
	setSortingModel,
	showSearch = false,
	onSearch,
	checkOnlyMe = false,
	handleOnlyMe,
	showOnlyMeFilter = false,
	searchString,
	searchSelectedKey,
	filters,
	setFilters,
	pageSize = 25,
	minHeight = 300,
	maxHeight,
	maxWidth,
	rowId = "id",
	disableRowSelectionOnClick,
	className,
	height,
	hideToolbar,
	children,
	hideFooter,
	...rest
}: DataTableProps) {
	const [windowHeight, setWindowHeight] = useState<number>(0);


	// Adjust height of DataGrid when window is resized
	useEffect(() => {
		const onResize = () => {
			setWindowHeight(window.innerHeight);
		};

		onResize();

		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("orientationchange", onResize);
		};
	}, []);

	// Adjust height of DataGrid when window is resized
	const dataGridHeight = useMemo(() => {
		return height || windowHeight - 200;
	}, [windowHeight, height]);

	// if not pagination/setPagination are not provided, it'll use default uncontrollable pagination (means the pagination will be controlled inside the MUI DATA Grid Component Without Us)
	const onPaginationModelChange = useMemo(() => {
		if (!setPaginationModel || !paginationModel) return;

		const handlePaginationModelChange = (newPaginationModel: any) => {
			const eventType = newPaginationModel.page !== paginationModel.page ? "changedPageValuationsTablePage" : "changedPageSizeValuationsTablePage";


			setPaginationModel((prevPaginationModel: any) => ({
				...prevPaginationModel,
				...newPaginationModel,
				page: newPaginationModel.page ?? prevPaginationModel.page
			}));
		};

		return handlePaginationModelChange;
	}, [paginationModel, setPaginationModel]);

	// if sort/setSort are not provided, it'll use default uncontrollable sorting (means the sorting will be controlled inside the MUI DATA Grid Component Without Us)
	const onSortModelChange = useMemo(() => {
		if (!setSortingModel) return;

		const handleSortModelChange = (newSortingModel: any) => {
			const firstSort = newSortingModel?.[0];

			setSortingModel(firstSort?.field ? firstSort : { field: "id", sort: "asc" });
		};

		return handleSortModelChange;
	}, [setSortingModel]);

	const renderedHeader = useMemo(() => {
		if (!header) return;

		switch (typeof header) {
			case "string":
				return <Typography variant="h4">{header}</Typography>;
			default:
				return header;
		}
	}, [header]);

	const getRowId = (row: any) => row.id || row.key || row.title; 

	return (
		<Fragment>
			<div className={className}>
				{renderedHeader  && (
					<div className={styles.headerRefreshHolder}>
						{renderedHeader}
						
					</div>
				)}

				<Box sx={{ height: dataGridHeight, width: "100%", minHeight, maxHeight, maxWidth }}>
					<DataGrid
						rows={data}
						columns={columns}
						getRowId={getRowId}
						initialState={{
							pagination: { paginationModel: { pageSize } }
						}}
						pageSizeOptions={[pageSize, pageSize * 2, pageSize * 4]}
						onPaginationModelChange={onPaginationModelChange}
						onSortModelChange={onSortModelChange}
						paginationMode="server"
						sortingMode="server"
						sortModel={sortingModel ? [sortingModel] : undefined}
						rowCount={paginationModel?.totalResult || data.length}
						disableColumnFilter // Disable column filter because we are using custom filters
						loading={loading}
						disableRowSelectionOnClick={disableRowSelectionOnClick}
						hideFooter={hideFooter}
						{...rest}
					/>
				</Box>
			</div>
		</Fragment>
	);
}
