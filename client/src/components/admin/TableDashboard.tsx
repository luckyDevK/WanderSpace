import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
import { memo } from 'react';
import { DateTime } from 'luxon';

import Spinner from '../customized/spinner/spinner-08';
import { useAdmin } from '@/hooks/useAdmin';
import PlaceImgRenderer from './PlaceImgRenderer';
import ActionsRenderer from './ActionsRenderer';

import type { RowData } from '@/types/ImageType';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TableDashboard() {
  const { userPlaces, isLoading } = useAdmin();

  const rowData: RowData[] = useMemo(
    () => (userPlaces ?? []).map((place, idx) => ({ ...place, no: idx + 1 })),
    [userPlaces],
  );

  const colDefs = useMemo<ColDef<RowData>[]>(
    () => [
      { field: 'no', flex: 1, minWidth: 75 },
      { field: 'title', flex: 1, minWidth: 120, filter: true },
      {
        field: 'description',
        flex: 2,
        minWidth: 200,
        wrapText: true,
        autoHeight: true,
      },
      {
        field: 'imageUrl',
        flex: 1,
        autoHeight: true,
        minWidth: 150,
        cellRenderer: memo(PlaceImgRenderer),
      },
      {
        field: 'createdAt',
        flex: 1,
        valueFormatter: (params) =>
          DateTime.fromISO(params.value).toLocaleString(DateTime.DATETIME_MED),
        minWidth: 250,
      },
      { field: 'location', flex: 1, minWidth: 150 },
      { field: 'category', flex: 1, minWidth: 100, filter: true },
      {
        field: 'actions',
        cellRenderer: memo(ActionsRenderer),
        flex: 1,
        minWidth: 120,
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-150 mt-10 mb-50">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination
        paginationPageSize={10}
        domLayout="autoHeight"
        suppressCellFocus
        animateRows
      />
    </div>
  );
}
