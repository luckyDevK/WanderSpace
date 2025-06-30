import type { ICellRendererParams } from 'ag-grid-community';

export default function PlaceImgRenderer(params: ICellRendererParams) {
  const imgSrc = params.value;

  return (
    <div className="flex justify-center items-center p-2">
      <img
        src={imgSrc}
        alt="place"
        className="w-24 h-24 object-cover rounded-md shadow-md"
      />
    </div>
  );
}
