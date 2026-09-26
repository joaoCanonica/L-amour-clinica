import { doctor } from "@/lib/site";

/** CRMs (e RQE, quando houver) — cada registro nunca quebra no meio. */
export function Credentials({ className = "" }: { className?: string }) {
  const items = [...doctor.registrations, ...(doctor.rqe ? [doctor.rqe] : [])];
  return (
    <span className={className}>
      {items.map((item, i) => (
        <span key={item} className="whitespace-nowrap">
          {item}
          {i < items.length - 1 ? <span aria-hidden> · </span> : null}
          {i < items.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
