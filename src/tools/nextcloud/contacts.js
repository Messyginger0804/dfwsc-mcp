import { randomUUID } from "crypto";
import { carddav } from "./client.js";

const userId = () => encodeURIComponent(process.env.NEXTCLOUD_USER || "");

const defaultAddressBook = () => `/addressbooks/users/${userId()}/contacts/`;

const addressBookPath = (addressBookUri) => {
  if (!addressBookUri || addressBookUri === "contacts") return defaultAddressBook();
  const clean = addressBookUri.replace(/^\/+|\/+$/g, "");
  return `/addressbooks/users/${userId()}/${clean}/`;
};

const propfindXml = `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:cs="http://calendarserver.org/ns/" xmlns:card="urn:ietf:params:xml:ns:carddav">
  <d:prop>
    <d:displayname />
    <cs:getctag />
    <card:addressbook-description />
    <d:resourcetype />
    <d:getetag />
  </d:prop>
</d:propfind>`;

export const contactTools = [
  {
    name: "nextcloud_contacts_addressbooks_list",
    description: "List CardDAV address books for the current user",
    schema: {},
    handler: () =>
      carddav(
        `/addressbooks/users/${userId()}/`,
        "PROPFIND",
        propfindXml,
        { Depth: "1" }
      ),
  },
  {
    name: "nextcloud_contacts_list",
    description: "List contacts (vCard resources) in an address book",
    schema: {
      addressBookUri: { type: "string", description: "Optional addressbook URI (default: contacts)" },
    },
    handler: ({ addressBookUri }) =>
      carddav(addressBookPath(addressBookUri), "PROPFIND", propfindXml, { Depth: "1" }),
  },
  {
    name: "nextcloud_contact_get",
    description: "Get a specific contact vCard by URI",
    schema: {
      contactUri: { type: "string", description: "Contact file URI, e.g. john-doe.vcf" },
      addressBookUri: { type: "string", description: "Optional addressbook URI (default: contacts)" },
    },
    handler: ({ contactUri, addressBookUri }) =>
      carddav(`${addressBookPath(addressBookUri)}${encodeURIComponent(contactUri)}`, "GET"),
  },
  {
    name: "nextcloud_contact_create",
    description: "Create a new contact vCard in an address book",
    schema: {
      fullName: { type: "string", description: "Contact full name" },
      email: { type: "string", description: "Optional email" },
      phone: { type: "string", description: "Optional phone" },
      organization: { type: "string", description: "Optional organization" },
      title: { type: "string", description: "Optional job title" },
      addressBookUri: { type: "string", description: "Optional addressbook URI (default: contacts)" },
      contactUri: { type: "string", description: "Optional contact file URI, e.g. jane.vcf" },
    },
    handler: ({ fullName, email, phone, organization, title, addressBookUri, contactUri }) => {
      const uid = randomUUID();
      const uri = contactUri || `${uid}.vcf`;
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `UID:${uid}`,
        `FN:${fullName}`,
        ...(email ? [`EMAIL;TYPE=INTERNET:${email}`] : []),
        ...(phone ? [`TEL;TYPE=CELL:${phone}`] : []),
        ...(organization ? [`ORG:${organization}`] : []),
        ...(title ? [`TITLE:${title}`] : []),
        "END:VCARD",
        "",
      ];
      return carddav(`${addressBookPath(addressBookUri)}${encodeURIComponent(uri)}`, "PUT", lines.join("\r\n"), {
        "Content-Type": "text/vcard; charset=utf-8",
      });
    },
  },
  {
    name: "nextcloud_contact_update",
    description: "Replace an existing contact vCard by URI",
    schema: {
      contactUri: { type: "string", description: "Contact file URI, e.g. john-doe.vcf" },
      vcard: { type: "string", description: "Full vCard content" },
      addressBookUri: { type: "string", description: "Optional addressbook URI (default: contacts)" },
      etag: { type: "string", description: "Optional ETag for optimistic concurrency" },
    },
    handler: ({ contactUri, vcard, addressBookUri, etag }) =>
      carddav(`${addressBookPath(addressBookUri)}${encodeURIComponent(contactUri)}`, "PUT", vcard, {
        "Content-Type": "text/vcard; charset=utf-8",
        ...(etag ? { "If-Match": etag } : {}),
      }),
  },
  {
    name: "nextcloud_contact_delete",
    description: "Delete a contact by URI",
    schema: {
      contactUri: { type: "string", description: "Contact file URI, e.g. john-doe.vcf" },
      addressBookUri: { type: "string", description: "Optional addressbook URI (default: contacts)" },
    },
    handler: ({ contactUri, addressBookUri }) =>
      carddav(`${addressBookPath(addressBookUri)}${encodeURIComponent(contactUri)}`, "DELETE"),
  },
];
