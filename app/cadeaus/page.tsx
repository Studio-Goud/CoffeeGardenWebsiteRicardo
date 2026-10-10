import { redirect } from "next/navigation";

/** De cadeaus staan sinds de samenvoeging op de webshoppagina. */
export default function CadeausRedirect() {
  redirect("/assortiment#cadeaus");
}
