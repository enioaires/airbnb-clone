"use client";
import { FC } from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import { Button } from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates = [],
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">R$ {price}</div>
        <div className="font-light text-neutral-600">dia</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabedDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} onClick={onSubmit}>
          Reservar
        </Button>
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>R$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
