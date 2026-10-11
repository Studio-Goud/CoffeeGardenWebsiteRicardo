import { permanentRedirect } from "next/navigation";

/** De cadeaus staan sinds de samenvoeging definitief op de webshoppagina. */
export default function CadeausRedirect() {
  permanentRedirect("/assortiment#cadeaus");
}
