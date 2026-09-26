import { Fragment } from "react";
import { doctor } from "@/lib/site";

/** CRMs (e RQE, quando houver) — cada registro nunca quebra no meio; a linha quebra entre eles. */
export function Credentials({ className = "" }: { className?: string }) {
  const items = [...doctor.registrations, ...(doctor.rqe ? [doctor.rqe] : [])];
  return (
    <span className={className}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className="whitespace-nowrap">
            {item}
            {i < items.length - 1 ? " ·" : null}
          </span>
          {i < items.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
