
"use client";
import { use, useEffect, useState } from "react";
import PageLayout from "@/app/components/PageLayout";
import searchBooks from "@/app/helpers/service/searchBooks";
import Input from "@/app/components/Input";
import { Select, Typography } from "@mui/material";
import { Button, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "@/app/components/DataTable";
import styles from './styles.module.scss'
import { GridColDef } from "@mui/x-data-grid"
import Link from "next/link";

const PAGE_SIZE = 25;

const DEFAULT_PAGINATION_MODEL = {
  page: 0,
  pageSize: PAGE_SIZE
};

const DEFAULT_SORTING_MODEL = {
  field: "first_publish_year",
  sort: "desc"
};

const renderStringCell = (params: any) => {
  let cellContents: string = params.row[params.field];
  const jsonStringifiedItem = JSON.stringify(params.row);
  console.log(params.row);
  return (
    <Link className={styles.link} href={{pathname: `/book`,query:{item: jsonStringifiedItem}}} >
      <Typography className="elipsis" variant="caption">
        {cellContents}
      </Typography>
    </Link>
  );
};

const BooksGridColumns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    flex: 2,
    renderCell: renderStringCell,
    sortable: false,
  },
  {
    field: "author_name",
    headerName: "Author",
    flex: 1,
    renderCell: renderStringCell,
    sortable: false,
  },
  {
    field: "first_publish_year",
    headerName: "First Publish Year",
    flex: 1,
    renderCell: renderStringCell,
    sortable: false,
  }
]


export default function Home() {
  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('q');
  const [paginationModel, setPaginationModel] = useState<any>(DEFAULT_PAGINATION_MODEL);
  const [sortingModel, setSortingModel] = useState<any>(DEFAULT_SORTING_MODEL);
  const [loading, setLoading] = useState(true);


  async function fetchData() {
    if (searchQuery === '') {
      toast.error('Search query cannot be empty, unless you want millions of books returned.');
      return;
    }
    try {
      const res = await searchBooks(setData, searchCategory, searchQuery);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  }
  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <PageLayout noPaddingMobile>
      <div>
        <h1>Book Discovery</h1>
        <p>Search for books by title, author, or ISBN</p>
        <p>If you do not select a search category a general search will be carried out.</p>

        <div className={styles.searchContainer}>
          <Select className={styles.selectField}
            id='search-by'
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value as string)} disabled={false}>
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"author"}>Author</MenuItem>
            <MenuItem value={"isbn"}>ISBN</MenuItem>
            <MenuItem value={"q"}>General Search</MenuItem>
          </Select>

          <Input
            id='search-query'
            placeholder='Search Query'
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value) }}
            disabled={false}
            className={styles.inputField}
          />


          <Button className={styles.searchButton} variant="contained" onClick={fetchData}>
            Search
          </Button>
        </div>
        {
          (<DataTable
            data={data}
            columns={BooksGridColumns}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            sortingModel={sortingModel}
            setSortingModel={setSortingModel}
            loading={loading}
            pageSize={PAGE_SIZE}
          >
          </DataTable>)}

      </div>
    </PageLayout>
  );
}
