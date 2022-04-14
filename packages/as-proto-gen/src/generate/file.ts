import { generateMessage } from "./message";
import { FileDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
import { FileContext } from "../file-context";
import { generateEnum } from "./enum";
import * as assert from "assert";

export function generateFile(
  fileDescriptor: FileDescriptorProto,
  fileContext: FileContext
): string {
  const fileName = fileDescriptor.getName();
  assert.ok(fileName);

  const filePackage = fileDescriptor.getPackage();

  const types: string[] = [];
  for (const messageDescriptor of fileDescriptor.getMessageTypeList()) {
    types.push(generateMessage(messageDescriptor, fileContext));
  }
  for (const enumDescriptor of fileDescriptor.getEnumTypeList()) {
    types.push(generateEnum(enumDescriptor, fileContext));
  }

  return `
    ${fileContext.getImportsCode()}
    
    ${types.join("\n\n")}
  `;
}
