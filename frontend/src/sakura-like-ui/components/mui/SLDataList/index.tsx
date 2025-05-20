// Generated from SakuraLikeUI v0.1.2 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLDataList)

/* eslint-disable no-restricted-imports */
import { Box } from '@mui/material';

import { useRef } from 'react';
import { PER_PAGE_OPTIONS } from '../../../constants/common';
import { SLDataTable } from '../SLDataTable';
import type { SLDataTableProps } from '../SLDataTable';
import { SLPagination } from '../SLPagination';
import type { SLPaginationProps } from '../SLPagination';

export const SLDataList = <T,>(props: SLDataTableProps<T> & SLPaginationProps) => {
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box ref={tableRef}>
        <SLDataTable
          columns={props.columns}
          data={props.data}
          defaultSortDirection={props.defaultSortDirection}
          defaultSortField={props.defaultSortField}
          emptyMessage={props.emptyMessage}
          isLoading={props.isLoading}
          keyExtractor={props.keyExtractor}
          rowsPerPageOptions={props.rowsPerPageOptions ?? PER_PAGE_OPTIONS}
          totalCount={props.totalCount}
          onSort={props.onSort}
        />
      </Box>
      <SLPagination
        page={props.page}
        rowsPerPage={props.rowsPerPage}
        rowsPerPageOptions={props.rowsPerPageOptions}
        totalCount={props.totalCount}
      />
    </Box>
  );
};
