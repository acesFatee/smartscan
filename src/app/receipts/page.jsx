import { DateFilter } from "@/components/DateFilter";
import { Search } from "@/components/Search";
import { ReceiptTable } from "@/components/ReceiptTable";
import Pagination from "@/components/Pagination";
import Export from "@/components/Export";
export default function page() {

  return (
    <>
      <div className="container mx-auto pt-32 px-5">
        <section className="filters mx-auto max-w-5xl flex flex-wrap gap-5">
          <Search />
          <DateFilter className="flex" />
          <Export />
        </section>

        <section className="receipt-table max-w-5xl mx-auto mt-5">
          <ReceiptTable />
        </section>

        <section className="pagination mx-auto max-w-5xl flex justify-center">
          <Pagination />
        </section>
      </div>
    </>
  );
}
