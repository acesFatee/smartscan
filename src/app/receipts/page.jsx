import { DateFilter } from "@/components/DateFilter";
import { Search } from "@/components/Search";
import { ReceiptTable } from "@/components/ReceiptTable";

export default function page() {

  return (
    <>
      <div className="container mx-auto pt-32 px-5">
        <section className="filters mx-auto max-w-5xl space-x-5 flex">
          <Search />
          <DateFilter className="flex" />
        </section>

        <section className="receipt-table max-w-5xl mx-auto mt-5">
          <ReceiptTable />
        </section>

        <section className="pagination"></section>
      </div>
    </>
  );
}
