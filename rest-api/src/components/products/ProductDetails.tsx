import React, { useMemo, useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState
} from '@tanstack/react-table';

import { useApi } from '../../hooks/useAPI';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../models/product';
import { defaultColumns } from './columns'; // Import our columns
import { Link } from 'react-router-dom';
import './ProductList.css'; // We will create this next

// Import the delete Modal
import { DeleteModal } from '../common/DeleteModal';

export default function ProductList() {
  // Fetch Data
  const { data: products, loading, error, refetch } = useApi<Product[]>(ProductService.fetchProducts);
  
  // Table State
  const [globalFilter, setGlobalFilter] = useState(''); // Search Bar
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // Dropdowns
  const [sorting, setSorting] = useState<SortingState>([]); // Sorting
  const [expanded, setExpanded] = useState({}); // Row Expansion
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 }); // Pagination

  // Add State to track the delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  // Update the function triggered by the button
  // BEFORE: It deleted immediately
  // NOW: It just sets the ID and opens the modal
  // This is passed to the columns via "meta")

  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setDeleteModalOpen(true);
  };

  // The actual delete logic (called only when user clicks "Delete" in modal)
  const executeDelete = async () => {
    if (idToDelete !== null) {
      await ProductService.DeleteProduct(idToDelete);
      setDeleteModalOpen(false);
      setIdToDelete(null);
      refetch(); // Or refetch data(this will cause trigger from 0 -> 1, causing the useEffect to run again in our useAPI hooks.)
    }
  };
  
  // Initialize the Table Engine
  const table = useReactTable({
    data: products || [],
    columns: defaultColumns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      expanded,
      pagination
    },
    // We pass our delete function to the columns here
    meta: {
      handleDelete: confirmDelete
    },
    getRowCanExpand: () => true, // Allow all rows to be expandable
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    
    // Pipelines
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="table-container">
      
      <div className="table-header-row">
        <h2 style={{ margin: 0 }}>Product Inventory</h2>
        <Link to="/product/add">
            <button className="btn-primary"> + Add New Product</button>
        </Link>
      </div>

      {/* --- FILTERS SECTION --- */}
      <div className="filters-bar">
        {/* Global Search */}
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="🔍 Search all columns..."
          className="search-input"
        />

        {/* Category Dropdown Filter */}
        <select
          value={(table.getColumn('catagory')?.getFilterValue() as string) ?? ''}
          onChange={e => table.getColumn('catagory')?.setFilterValue(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      {/* --- TABLE SECTION --- */}
      <table className="tanstack-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {/* Sort Indicator */}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <React.Fragment key={row.id}>
              {/* MAIN ROW */}
              <tr className={row.getIsExpanded() ? 'row-expanded' : ''}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {/* EXPANDED PANEL ROW */}
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length} className="expanded-panel">
                    <div className="panel-content">
                        <img 
                            src={row.original.imageUrl || 'https://via.placeholder.com/150'} 
                            alt={row.original.name} 
                            className="product-image"
                        />
                        <div className="product-details">
                          {/* Row 1: Description */}
                          <div className="detail-row">
                              <strong>Description:</strong>
                              <span>{row.original.description}</span>
                          </div>
                          
                          {/* Row 2: Stock Level */}
                          <div className="detail-row">
                              <strong>Stock Level:</strong> 
                              <span>
                                  {row.original.stock} units 
                                  {/* Use a class instead of inline style for the warning */}
                                  {row.original.stock < 10 && <span className="low-stock-warning"> (Low Stock!)</span>}
                              </span>
                          </div>
                        </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* --- PAGINATION CONTROLS --- */}
      <div className="pagination-bar">
        <button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
        >
            Previous
        </button>
        <span>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
        </span>
        <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
        >
            Next
        </button>
      </div>

      {/* 5. Render the delete Modal at the bottom */}
      <DeleteModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={executeDelete}
        title="Delete Product?"
        message={`Are you sure you want to delete product #${idToDelete}? This cannot be undone.`}
      />
    </div>
  );
}