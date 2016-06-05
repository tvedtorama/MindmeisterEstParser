// This file was an attempt to match up x2js, based on a partial definition on the web.

// The use of "module" and "new" allows some useful mappings to javascript.

// Turns out the x2js I was using is not the same this file is made for, so it all broke.

declare module "x2js" {

  interface IX2JS {
    new (config?: IX2JSOption): IX2JS;

    getVersion(): string;

    xml2json<T>(dom: Node): T;
    json2xml<T>(json: T): Node;
    xml_str2json<T>(xml: string): T;
    json2xml_str<T>(json: T): string;
    parseXmlString(xml: string): Node;

    asArray(prop: any): any[];
    asDateTime(key: string): string;
    asXmlDateTime(date: Date): string;
    asXmlDateTime(date: number): string;
  }

  interface IX2JSOption {
    escapeMode?: boolean;
    attributePrefix?: string;
    arrayAccessForm?: string;
    emptyNodeForm?: string;
    enableToStringFunc?: boolean;
    arrayAccessFormPaths?: any[];
    skipEmptyTextNodesForObj?: boolean;
    stripWhitespaces?: boolean;
    datetimeAccessFormPaths?: any[];
  }

  // var X2JS: (config?) => void;
  let X2JS: IX2JS
  export = X2JS;
}

