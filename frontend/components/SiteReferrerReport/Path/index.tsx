import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useSiteReferrerPathReport } from "../../../hooks";
import { FavIcon } from "../../FavIcon";
import { Modal } from "./Modal";

type Data = Array<HydratedSiteReferrerPathDatum>;

export function Path() {
  const router = useRouter();
  const { data: rawData } = useSiteReferrerPathReport();

  const data = useMemo<Data | null>(() => {
    if (rawData === undefined) {
      return null;
    }

    return rawData[0].data.slice(0, 5);
  }, [rawData]);

  return data === null ? null : (
    <>
      <Table borderless className="fs-sm table-layout-fixed" responsive size="sm">
        <thead>
          <tr>
            <th>Page</th>
            <th />

            <th className="text-end w-4rem">Visitors</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr className="parent-d" key={d.referrerPath}>
              <td colSpan={2}>
                <div className="align-items-center d-flex flex-grow-1 flex-row min-w-0 pe-1">
                  <Link
                    className="align-items-center d-flex flex-row min-w-0 text-body text-decoration-none text-decoration-underline-hover"
                    href={{ pathname: router.pathname, query: { ...router.query, referrer: d.referrer } }}
                    scroll={false}
                    title={d.referrer}
                  >
                    <FavIcon alt={d.domain} className="d-block flex-shrink-0 me-1" domain={d.domain} size={16} />

                    <span className="text-truncate">{d.referrer}</span>
                  </Link>

                  <a
                    className="parent-d-block flex-grow-0 flex-shrink-0 lh-1 ms-2 text-black text-primary-hover"
                    href={d.referrer}
                    rel="noreferrer"
                    target="_blank"
                    title="Go to the page"
                  >
                    <i className="bi-box-arrow-up-right h-1rem" />
                  </a>
                </div>
              </td>

              <td className="text-end w-4rem">
                <span className="fw-medium" title={`${d.visitorCount.toString()} visitors`}>{d.visitorCountDisplay}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Link
        className="bg-light-hover border-1 border-top d-block fw-semibold mb-n3 mt-auto mx-n3 p-2 rounded-bottom text-center text-decoration-none"
        href={{ pathname: router.pathname, query: { ...router.query, detail: "referrer-path" } }}
        scroll={false}
      >
        See more
      </Link>

      <Modal />
    </>
  );
}
