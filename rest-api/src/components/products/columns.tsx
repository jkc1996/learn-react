import React from 'react';
import { createColumnHelper, Row } from '@tanstack/react-table';
import { Product } from '../../models/product';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper<Product>();

export interface TableMeta {
  handleDelete: (id: number) => void;
  toggleRow: (row: Row<Product>) => void; // ✅ New function definition
}

const IconChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
  
const IconChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);
  
const IconDot = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
    </svg>
);

export const defaultColumns = [
  // --- 1. EXPANDER COLUMN (Must be first!) ---
  columnHelper.display({
    id: 'expander',
    header: () => null, // Empty header
    cell: ({ row, table }) => {
    
    const meta = table.options.meta as TableMeta;
    
      // Only show button if row can expand
      return row.getCanExpand() ? (
        <button
        //Call our custom 'toggleRow' instead of the default handler
          onClick={() => meta?.toggleRow(row)}
          style={{
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
          }}
        >
          {row.getIsExpanded() ? <IconChevronDown /> : <IconChevronRight />}
        </button>
      ) : (
        <div style={{ padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <IconDot /> 
        </div>
      )
    },
    // Force this column to be small
    size: 50, 
  }),

  // --- 2. NAME ---
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: info => <strong>{info.getValue()}</strong>,
  }),

  // --- 3. CATEGORY ---
  columnHelper.accessor('catagory', {
    header: 'Category',
    cell: info => (
      <span style={{ 
        backgroundColor: '#e0e7ff', color: '#3730a3', 
        padding: '4px 8px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 600
      }}>
        {info.getValue()}
      </span>
    ),
  }),

  // --- 4. BRAND ---
  columnHelper.accessor('brand', {
    header: 'Brand',
  }),

  // --- 5. PRICE ---
  columnHelper.accessor('price', {
    header: 'Price',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),

  // --- 6. STATUS ---
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: info => (
        <span style={{ 
            color: info.getValue() ? '#16a34a' : '#dc2626', // Green or Red
            fontWeight: 'bold'
        }}>
            {info.getValue() ? 'Active' : 'Inactive'}
        </span>
    )
  }),

  // --- 7. ACTIONS ---
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta;
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/product/edit/${row.original.id}`}>
            <button style={{ 
              cursor: 'pointer', padding: '6px 12px', backgroundColor: '#3b82f6', 
              color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.85rem'
            }}>
              Edit
            </button>
          </Link>

          <button 
            onClick={() => meta?.handleDelete(row.original.id)}
            style={{ 
              cursor: 'pointer', padding: '6px 12px', backgroundColor: '#ef4444', 
              color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.85rem'
            }}
          >
            Delete
          </button>
        </div>
      );
    },
  }),
];