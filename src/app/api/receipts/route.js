import algolia from "@/config/algolia";
import { decodeToken } from "@/helpers/decodeToken";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { sub: user, error } = await decodeToken(req);

    if (error) {
      return NextResponse.json({ error: "Not a valid token" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize")) || 15;
    const page = parseInt(searchParams.get("page")) || 0
    const algoliaPage = page - 1;
    const searchQuery = searchParams.get("searchQuery") || "";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let algoliaFilters = `user:${user}`;

    const buildDateFilter = (from, to) => {
      const filters = [];
      
      if (!isNaN(from) && !isNaN(to)) {
        filters.push(`dateTime >= ${startOfDay(new Date(parseInt(from))).getTime()}`, `dateTime <= ${endOfDay(new Date(parseInt(to))).getTime()}`);
      } else if (!isNaN(from)) {
        filters.push(`dateTime >= ${startOfDay(new Date(parseInt(from))).getTime()}`, `dateTime <= ${endOfDay(new Date(parseInt(from))).getTime()}`);
      } else if (!isNaN(to)) {
        filters.push(`dateTime >= ${startOfDay(new Date(parseInt(to))).getTime()}`, `dateTime <= ${endOfDay(new Date(parseInt(to))).getTime()}`);
      }
      
      return filters.length ? filters.join(' AND ') : '';
    };

    const dateFilter = buildDateFilter(from, to);
    algoliaFilters += dateFilter ? ` AND ${dateFilter}` : '';

    const { results } = await algolia.search({
      requests: [
        {
          indexName: "my_index",
          query: searchQuery,
          filters: algoliaFilters,
          hitsPerPage: pageSize,
          page: algoliaPage
        },
      ],
    });

    const { hits, nbPages, page: returnedPage, nbHits } = results[0];

    return NextResponse.json({
      data: hits || [],
      pagination: {
        currentPage: returnedPage + 1,
        totalPages: nbPages,
        totalReceipts: nbHits,
      },
      message: "Data fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching receipts:", error);
    return NextResponse.json(
      { error: "Failed to fetch receipts." },
      { status: 500 }
    );
  }
};
