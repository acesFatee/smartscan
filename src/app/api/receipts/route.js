import algolia from "@/config/algolia";
import { decodeToken } from "@/helpers/decodeToken";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { sub: user, error } = await decodeToken(req);

    if (error) {
      return NextResponse.json({ error: "Not a valid token" }, { status: 401 });
    }


    const { searchParams } = new URL(req.url);
    const pageSize = 20
    const searchQuery = searchParams.get("searchQuery") || "";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let algoliaFilters = `user:${user}`;

    if (from && to) {
      algoliaFilters += ` AND dateTime >= ${from} AND dateTime <= ${to}`;
    }

    const { results } = await algolia.search({
      requests: [
        {
          indexName: "my_index",
          query: searchQuery,
          filters: algoliaFilters,
          hitsPerPage: pageSize,
        },
      ],
    });

    const data = results[0]?.hits || [];

    return NextResponse.json({
      data,
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
