import { PipeTransform, Injectable } from '@nestjs/common';
import { GraphQLResolveInfo, FieldNode } from 'graphql';

@Injectable()
export class PaginatedExtractionPipe implements PipeTransform {
  transform(info: GraphQLResolveInfo): string[] {
    return this.extractFieldsFromItems(info);
  }

  private extractFieldsFromItems(info: GraphQLResolveInfo): string[] {
    const fields = new Set<string>();

    const fieldNode = info.fieldNodes[0];

    if (fieldNode.selectionSet) {
      fieldNode.selectionSet.selections.forEach((selection) => {
        if (selection.kind === 'Field' && selection.name.value === 'items') {
          this.extractSubfields(selection, fields);
        }
      });
    }

    return Array.from(fields);
  }

  private extractSubfields(node: FieldNode, fields: Set<string>) {
    if (node.selectionSet) {
      node.selectionSet.selections.forEach((subSelection) => {
        if (subSelection.kind === 'Field') {
          fields.add(subSelection.name.value);
        }
      });
    }
  }
}
